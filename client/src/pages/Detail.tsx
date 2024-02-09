// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import * as apiClient from "../api-client";

// const Detail = () => {
// 	const { hotelId } = useParams();

// 	const { data: hotel } = useQuery(
// 		"fetchHotelById",
// 		() => apiClient.fetchHotelById(hotelId as string),
// 		{ enabled: !!hotelId },
// 	);
// 	if (!hotel) {
// 		return <></>;
// 	}
// 	return <main></main>;
// };

// export default Detail;
