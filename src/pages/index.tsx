import { type NextPage } from 'next';
import Image from 'next/image';
import { type GetServerSideProps } from 'next';
import { useHttp } from '../hooks/useHttp';
import { useFetch } from '../hooks/useFetch';
import { useEffect, useContext,useState,useRef } from 'react';
import { dataContext } from '../store';
import autoAnimate from '@formkit/auto-animate'
import ContactForm from '../components/form';

const Home = ({ fetchedUsers }: { fetchedUsers: Users[] }) => {
	const { store, dispatchStore } = useContext(dataContext);
	const {request} = useHttp();
	const parent = useRef(null)

	useEffect(() => {
	  parent.current && autoAnimate(parent.current)
	}, [parent])
  
	useEffect(() => {
		dispatchStore({ type: 'LOADED', payload: fetchedUsers });
	}, []);

	const onMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (store.counter < 8) {
			request(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${5 * store.counter}`, 'GET').then((result) => {
				dispatchStore({type:'LOADED',payload:result.users})
			}).catch((err) => {
				console.log(err);
			})
			dispatchStore({ type: 'INC'});
		}
	};
	return (
		<>
			<section className='w-full bg-hero bg-cover bg-center bg-no-repeat object-cover object-center pt-10 pb-[71px] sm:pt-[90px] sm:pb-[88px]  md:pt-[164px] md:pb-[164px] '>
				<div className='container'>
					<div className='mx-auto flex max-w-sm flex-col justify-center gap-[21px]'>
						<h1 className='text-center text-[40px] leading-10 text-white'>Test assignment for front-end developer</h1>
						<p className='text-center    text-white'>
							What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
							understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in
							mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
						</p>
						<button className='mx-auto cursor-pointer rounded-[80px] bg-yellow px-[29px] pt-1 pb-1 transition-colors hover:bg-lightyellow'>
							Sign up
						</button>
					</div>
				</div>
			</section>
			<section className='bg-grey'>
				<div className='container'>
					<h2 className='pt-[140px] text-center text-[40px] leading-10 text-black'>Working with GET request</h2>
					<div className='mt-[50px] grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-3' ref={parent}>
						{store.users.map((item: Users) => {
							return (
								<div
									key={item.id}
									className='flex flex-col items-center justify-center rounded-[10px] bg-white p-5 text-center  '
								>
									<Image src={item.photo} alt={item.name} width={70} height={70} className='rounded-full' />
									<p className='pt-5 '>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</p>
									<p className='pt-5  '>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</p>
									<a href={`mailto:${item.email}`} className='group relative '>
										{item.email.length > 20 ? `${item.email.slice(0, 20)}...` : item.email}
										<div className='absolute -bottom-[40px] left-0 hidden  rounded bg-black  py-[3px] px-4 text-white group-hover:block'>
											{item.email}
										</div>
									</a>
									<a href={`tel:${item.phone}`} className='group relative'>
										{item.phone}
										<div className='absolute -bottom-[40px] left-0 hidden rounded bg-black py-[3px]  px-4 text-white group-hover:block'>
											{item.phone}
										</div>
									</a>
								</div>
							);
						})}
					</div>
					<button
						onClick={onMore}
							className={store.condition === 'idle' && store.counter < 8 ? `mx-auto mt-[50px] block cursor-pointer rounded-[80px] bg-yellow  px-[22px] pt-1 pb-1   transition-colors hover:bg-lightyellow` : `mx-auto mt-[50px] text-white block cursor-pointer rounded-[80px] bg-darkgrey  px-[22px] pt-1 pb-1   transition-colors hover:bg-darkgrey` }
						disabled={store.condition === 'idle' && store.counter < 8 ? false : true}
					>
						Show more
					</button>
				</div>
			</section>
			<section>
				<div className='container'>
					<h2 className='pt-[140px] text-center text-[40px]  leading-10'>Working with POST request</h2>
						<ContactForm/>
					{/* <button onClick={((e:React.MouseEventHandler<HTMLButtonElement>) => { */}
				</div>
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	// eslint-disable-next-line
	const { request } = useFetch();

	const fetchedUsers = await request(
		'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5')
		.then((data) => data.users)
		.catch((e: Error) => console.log(e));

	return {
		props: {
			// ...params,
			fetchedUsers
		}
		// notFound: true,
		// redirect: {
		// 	destination: '/',
		// 	permanent: false
		// }
	};
};

export default Home;
