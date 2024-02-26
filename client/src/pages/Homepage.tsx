import { useEffect } from "react";
import FeaturedHotels from "../components/FeaturedHotels";
import Offers from "../components/Offers";
import Contact from "../components/Contact";

const Homepage = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<main className='my-4 flex flex-col gap-6'>
			<Offers />
			<FeaturedHotels />
			<Contact />
		</main>
	);
};

export default Homepage;
