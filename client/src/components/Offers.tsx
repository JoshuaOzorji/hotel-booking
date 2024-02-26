import { Link } from "react-router-dom";
import image from "../../public/CTA.jpg";

const Offers = () => {
	return (
		<main className='border rounded-lg flex flex-col md:flex-row items-center shadow-md'>
			<img
				src={image}
				alt='offers'
				className='md:h-[75vh] object-contain object-center'
			/>
			<div className='p-6 font-lato flex flex-col'>
				<h2 className='font-rubik text-h1 font-bold'>
					Take your longest vacation yet
				</h2>
				<p className='font-light text-h3'>
					Browse properties offering long-term stays, many at reduced monthly
					rates.
				</p>
				<span className='mt-2'>
					<Link to='/search' className='button3 '>
						Find a stay
					</Link>
				</span>
			</div>
		</main>
	);
};

export default Offers;
