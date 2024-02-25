import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../../api/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";

type Props = {
	currentUser: UserType;
	paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
	adultCount: number;
	childCount: number;
	checkIn: string;
	checkOut: string;
	hotelId: string;
	paymentIntentId: string;
	totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
	const stripe = useStripe();
	const elements = useElements();
	const search = useSearchContext();
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { mutate: bookRoom, isLoading } = useMutation(
		apiClient.createRoomBooking,
		{
			onSuccess: () => {
				showToast({ message: "Booking Saved", type: "SUCCESS" });
			},
			onError: () => {
				showToast({ message: "Booking Failed", type: "ERROR" });
			},
		},
	);

	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			adultCount: search.adultCount,
			childCount: search.childCount,
			checkIn: search.checkIn.toISOString(),
			checkOut: search.checkOut.toISOString(),
			hotelId: hotelId,
			totalCost: paymentIntent.totalCost,
			paymentIntentId: paymentIntent.paymentIntentId,
		},
	});

	const onSubmit = async (formData: BookingFormData) => {
		if (!stripe || !elements) {
			return;
		}
		const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement) as StripeCardElement,
			},
		});

		if (result.paymentIntent?.status === "succeeded") {
			//book the room
			bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col border border-slate-300 p-4 gap-4 font-lato'>
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

			<div>
				<h2>Your Price Summary</h2>

				<div>
					<span>Total Cost: £{paymentIntent.totalCost.toFixed(2)}</span>

					<span>Includes taxes and charges</span>
				</div>
			</div>

			<div>
				<h3>Payment Details</h3>

				<CardElement id='payment-element' className='' />
			</div>

			<div>
				<button
					disabled={isLoading}
					type='submit'
					className='disabled:bg-gray-500'>
					{isLoading ? "Saving..." : "Confirm Booking"}
				</button>
			</div>
		</form>
	);
};

export default BookingForm;
