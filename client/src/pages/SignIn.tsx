import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const location = useLocation();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<main className='p-6 md:w-[50%] mx-auto my-6 text-secText border-x shadow-md'>
			<h2 className='text-h1 font-rubik font-bold text-center my-6'>Sign In</h2>
			<form className='flex flex-col font-lato text-h2 gap-y-2 md:gap-y-4'>
				{/* EMAIL */}
				<label className='register-label'>
					Email
					<input type='email' className='register-input' />
				</label>

				{/* PASSWORD */}
				<label className='register-label'>
					Password
					<input type='password' className='register-input' />
				</label>

				{/* OPTIONAL REGISTER */}
				<div className='mx-auto'>
					<span className='flex space-x-2 text-h4 items-center'>
						<p>Not Registered? </p>
						<Link to='/register' className='underline'>
							Create an account here{" "}
						</Link>
					</span>
				</div>

				{/* SUBMIT */}
				<div className='mx-auto '>
					<button type='submit' className='button'>
						Submit
					</button>
				</div>
			</form>
		</main>
	);
};

export default SignIn;
