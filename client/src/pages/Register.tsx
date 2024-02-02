import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { showToast } = useAppContext();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: "Registration successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			setTimeout(() => {
				navigate("/");
			}, 3000);
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className='p-6 md:w-[50%] mx-auto my-6 text-secText border-x shadow-md'>
			<h2 className='text-h1 font-rubik font-bold text-center my-6'>
				Create an Account
			</h2>
			<form
				className='flex flex-col font-lato text-h2 gap-y-2 md:gap-y-4'
				onSubmit={onSubmit}>
				{/* first name*/}
				<label className='register-label'>
					First Name{" "}
					<input
						type='text'
						className='register-input'
						{...register("firstName", { required: "This field is required" })}
					/>
					{errors.firstName && (
						<span className='register-required'>
							{errors.firstName.message}
						</span>
					)}
				</label>

				{/* last name */}
				<label className='register-label'>
					Last Name{" "}
					<input
						type='text'
						className='register-input'
						{...register("lastName", { required: "This field is required" })}
					/>
					{errors.lastName && (
						<span className='register-required'>{errors.lastName.message}</span>
					)}
				</label>

				{/* email */}
				<label className='register-label'>
					Email
					<input
						type='email'
						className='register-input'
						{...register("email", {
							required: "This field is required",
						})}
					/>
					{errors.email && (
						<span className='register-required'>{errors.email.message}</span>
					)}
				</label>

				{/* password */}
				<label className='register-label'>
					Password
					<input
						type='password'
						className='register-input'
						{...register("password", {
							required: "This field is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
					/>
					{errors.password && (
						<span className='register-required'>{errors.password.message}</span>
					)}
				</label>

				{/* confirm password */}
				<label className='register-label'>
					Confirm Password
					<input
						type='password'
						className='register-input'
						{...register("confirmPassword", {
							validate: (val) => {
								if (!val) {
									return "This field is required";
								} else if (watch("password") !== val) {
									return "Passwords do not match";
								}
							},
						})}
					/>
					{errors.confirmPassword && (
						<span className='register-required'>
							{errors.confirmPassword.message}
						</span>
					)}
				</label>

				{/* submit */}
				<span className='mx-auto'>
					<button type='submit' className='button'>
						Submit
					</button>
				</span>
			</form>
		</main>
	);
};

export default Register;
