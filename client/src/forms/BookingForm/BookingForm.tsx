import { useForm } from "react-hook-form";
import { UserType } from "../../../../api/shared/types";

type Props = {
	currentUser: UserType;
};

type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
};
const BookingForm = ({ currentUser }: Props) => {
	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
		},
	});
	return (
		<form className='flex flex-col border border-slate-300 p-4 gap-4 font-lato'>
			<h2 className='text-h2 font-bold'>Confirm Your Details</h2>

			<div className='flex flex-col md:grid grid-cols-2 gap-x-3 gap-y-2'>
				<label className='flex form-label'>
					<p>First Name: </p>
					<input
						type='text'
						readOnly
						disabled
						{...register("firstName")}
						className='booking-form-input'
					/>
				</label>

				<label className='form-label'>
					<p>Last Name: </p>
					<input
						type='text'
						readOnly
						disabled
						{...register("lastName")}
						className='booking-form-input'
					/>
				</label>

				<label className='form-label'>
					<p>Email:</p>
					<input
						type='text'
						readOnly
						disabled
						{...register("email")}
						className='booking-form-input'
					/>
				</label>
			</div>
		</form>
	);
};

export default BookingForm;
