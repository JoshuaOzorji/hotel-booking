import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	facilities: string[];
	imageFiles: FileList;
	imageUrls: string[];
	adultCount: number;
	childCount: number;
};
const ManageHotelForm = () => {
	const formMethods = useForm<HotelFormData>();
	return (
		<FormProvider {...formMethods}>
			<form className='p-6 md:w-[50%] mx-auto my-6 text-secText border-x shadow-md'>
				<h2 className='text-h1 font-rubik font-bold text-center my-6'>
					Add Hotel
				</h2>
				<div className='flex flex-col gap-2 font-lato'>
					<DetailsSection />
					<TypeSection />
					<FacilitiesSection />
					<GuestsSection />
					<ImagesSection />
				</div>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
