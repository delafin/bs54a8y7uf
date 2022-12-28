import { useContext, useEffect } from "react";
import { boolean } from "zod";
import { dataContext } from "../store";
import { useHttp } from '../hooks/useHttp';
import Image from 'next/image';
import { useFetch } from "../hooks/useFetch";
import {type GetServerSideProps } from "next";
import Preloader from "./preloader";
// eslint-disable-next-line
const UserList = ({ fetchedUsers }: { fetchedUsers: Users[] }) => {
    
	const { store, dispatchStore } = useContext(dataContext);
    
	useEffect(() => {
		dispatchStore({ type: 'LOADED', payload: fetchedUsers });
	}, []);


	const {request} = useHttp();

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

    const list = () => {
        store.users.map((item: Users) => {
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

        }
        )
        
    }
    return (
        <>
            {!fetchedUsers ? <Preloader w='200px' h='200px'/> :
            <>{list}
            <button onClick={onMore}
                    className={store.condition === 'idle' && store.counter < 8 ? `mx-auto mt-[50px] block cursor-pointer rounded-[80px] bg-yellow  px-[22px] pt-1 pb-1   transition-colors hover:bg-lightyellow` : `mx-auto mt-[50px] text-white block cursor-pointer rounded-[80px] bg-darkgrey  px-[22px] pt-1 pb-1   transition-colors hover:bg-darkgrey` }
                    disabled={store.condition === 'idle' && store.counter < 8 ? false : true}>
                Show more
            </button></>}
        </>
    );
   
}

	
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

export default UserList;