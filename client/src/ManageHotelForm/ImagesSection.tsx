import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		// watch,
		// setValue,
	} = useFormContext<HotelFormData>();
	return (
		<main className='text-h3'>
			<h2>Images</h2>
			<div className=''>
				<label>
					<input
						type='file'
						multiple
						accept='image/*'
						{...register("imageFiles", {
							validate: (imageFiles) => {
								const totalLength = imageFiles.length;

								if (totalLength === 0) {
									return "Minimum of 1 image file";
								}

								if (totalLength > 6) {
									return "Maximum of 6 image files";
								}

								return true;
							},
						})}
					/>
				</label>
			</div>
			{errors.imageFiles && (
				<span className='required-class'>{errors.imageFiles.message}</span>
			)}
		</main>
	);
};

export default ImagesSection;
