import { useQuery } from "react-query";
import { HotelSearchResponse } from "../../../api/shared/types";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard";
// import StarRatingFilter from "../components/StarRatingFilter";
// import HotelTypesFilter from "../components/HotelTypesFilter";
// import FacilitiesFilter from "../components/FacilitiesFilter";
// import PriceFilter from "../components/PriceFilter";

const Search = () => {
	const search = useSearchContext();

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		// page: page.toString(),
		// stars: selectedStars,
		// types: selectedHotelTypes,
		// facilities: selectedFacilities,
		// maxPrice: selectedPrice?.toString(),
		// sortOption,
	};

	const hotelQuery = useQuery<HotelSearchResponse>(
		["searchHotels", searchParams],
		() => apiClient.searchHotels(searchParams),
	);

	const hotelData = hotelQuery.data;

	return (
		<main className='flex flex-col md:grid md:grid-cols-5 gap-6 font-lato my-6'>
			<div className='md:col-span-1 rounded-lg p-5 h-fit md:sticky top-28 border'>
				<div className='space-y-5 '>
					<h3 className='text-lg f pb-5'>Filter by:</h3>
					{/* <StarRatingFilter />
					<HotelTypesFilter />
					<FacilitiesFilter />
					<PriceFilter /> */}
				</div>
			</div>

			{/* Search results card */}
			<div className='flex flex-col gap-3 md:col-span-4 '>
				<span className='flex justify-between items-center '>
					<p className='text-h4 font-bold'>
						{hotelData?.pagination.total} Hotels found
						{search.destination ? `in ${search.destination}` : ""}
					</p>
				</span>

				{hotelData?.data.map((hotel) => (
					<SearchResultsCard hotel={hotel} />
				))}
			</div>
		</main>
	);
};

export default Search;
