/* eslint-disable no-mixed-spaces-and-tabs */
import { useQuery } from "react-query";
import { HotelSearchResponse } from "../../../api/shared/types";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard";
import { useState } from "react";
import Pagination from "../components/Pagination";
import FacilitiesFilter from "../components/FacilitiesFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);
	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string>([]);
	const [selectedFacilities, setselectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
	const [sortOption, setSortOption] = useState<string>("");

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption,
	};

	const hotelQuery = useQuery<HotelSearchResponse>(
		["searchHotels", searchParams],
		() => apiClient.searchHotels(searchParams),
	);

	const hotelData = hotelQuery.data;

	const handlePageChange = (pageNumber: number) => {
		setPage(pageNumber);
	};

	const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value;

		setSelectedStars((prevStars) =>
			event.target.checked
				? [...prevStars, starRating]
				: prevStars.filter((star) => star !== starRating),
		);
	};
	return (
		<main className='flex flex-col md:grid md:grid-cols-5 gap-6 font-lato my-6'>
			<div className='md:col-span-1 rounded-lg p-5 h-fit md:sticky top-28 border'>
				<div className='space-y-5 '>
					<h3 className='text-lg f pb-5'>Filter by:</h3>
					<StarRatingFilter />
					<HotelTypesFilter />
					<FacilitiesFilter />
					<PriceFilter />
				</div>
			</div>

			{/* Search results card */}
			<div className='flex flex-col gap-4 md:col-span-4 '>
				<span className='flex justify-between items-center'>
					<p className='text-h4 font-bold'>
						{hotelData?.pagination.total !== undefined
							? `${hotelData?.pagination.total} Hotels found${
									search.destination ? ` in ${search.destination}` : ""
							  }`
							: "Searching..."}
						{search.destination ? `in ${search.destination}` : ""}
					</p>

					<select
						value={sortOption}
						onChange={(event) => setSortOption(event.target.value)}
						className='border rounded-lg text-h5 focus:outline-none p-1 text-center'>
						<option value='' className=''>
							Sort by:
						</option>
						<option value='starRating'>Star Rating</option>
						<option value='pricePerNightAsc'>
							Price Per Night (low to high)
						</option>
						<option value='pricePerNightDesc'>
							Price Per Night(high to low)
						</option>
					</select>
				</span>

				{hotelData?.data.map((hotel) => (
					<SearchResultsCard hotel={hotel} />
				))}

				{/* PAGINATION */}
				{!hotelQuery.isLoading && (
					<Pagination
						page={hotelData?.pagination.page || 1}
						pages={hotelData?.pagination.pages || 1}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</main>
	);
};

export default Search;
