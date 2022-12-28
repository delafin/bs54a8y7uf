import logo from '../../public/logo/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

function Header({ children }: Children) {
	return (
		<>
			<header>
				<div className='container'>
					<nav className='flex items-center justify-between gap-3 pt-[13px] pb-[13px]'>
						<Link
							href={`/`}
							className='flex-none'
						>
							<Image
								src={logo}
								alt='logo'
								// fill
								width={104}
								height={26}
							/>
						</Link>
						<ul className='flex flex-grow-0 space-x-2.5'>
							<li className='cursor-pointer rounded-[80px] bg-yellow px-[22px]  pt-1 pb-1 leading-[26px] transition-colors hover:bg-lightyellow'>
								Users
							</li>
							<li className='cursor-pointer rounded-[80px] bg-yellow px-[22px] pt-1 pb-1 transition-colors hover:bg-lightyellow'>
								Sign up
							</li>
						</ul>
					</nav>
				</div>
			</header>
			{children}
		</>
	);
}

export default Header;
