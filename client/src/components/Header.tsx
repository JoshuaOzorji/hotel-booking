import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const Header = () => {
	return (
		<main className='bg-primary py-2 md:py-4 font-rubik border-b border-accent sticky top-0'>
			<div className='bucket mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-x-0'>
				<span className='text-h1 text-white font-bold tracking-tight'>
					<Link to='/'>
						<span className='text-accent'>Reserva</span>
						<span className='text-sec font-black font-lato'>.</span>
					</Link>
				</span>

				<span className='flex space-x-2 md:space-x-4 text-accent text-h4'>
					<Link to='/' className='underline-class'>
						My Bookings
					</Link>
					<Link to='/' className='underline-class'>
						My Hotels
					</Link>
					<span className='underline-class'>
						<SignOutButton />
					</span>
				</span>
			</div>
		</main>
	);
};

export default Header;
