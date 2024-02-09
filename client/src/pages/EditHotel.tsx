import { useParams } from "react-router-dom";
import ManageHotelForm from "../ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";

const EditHotel = () => {
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery(
		"fetchHotelById",
		() => apiClient.fetchMyHotelById(hotelId || ""),
		{ enabled: !!hotelId },
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			showToast({ message: "Hotel updated", type: "SUCCESS" });
		},
		onError: () => {
			showToast({ message: "Error saving Hotel", type: "ERROR" });
		},
	});

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};
	return (
		<div>
			<ManageHotelForm
				hotel={hotel}
				onSave={handleSave}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default EditHotel;
