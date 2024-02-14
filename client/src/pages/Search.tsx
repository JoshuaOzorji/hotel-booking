import { useQuery } from "react-query";
import { HotelSearchResponse } from "../../../api/shared/types";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

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
		() => apiClient.searchHotels(searchHotels),
	);

	const hotelData = hotelQuery.data;

	return (
		<main className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
			<div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
				<div className='space-y-5'>
					<h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
						Filter by:
					</h3>
					<StarRatingFilter />
					<HotelTypesFilter />
					<FacilitiesFilter />
					<PriceFilter />
				</div>
			</div>

			<div className='flex flex-col gap-5'>
				<div></div>
			</div>
		</main>
	);
};

export default Search;
