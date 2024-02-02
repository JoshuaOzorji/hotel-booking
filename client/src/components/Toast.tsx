import { useEffect } from "react";

type ToastProps = {
	message: string;
	type: "SUCCESS" | "ERROR";
	onClose: () => void;
};
const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	const styles =
		type === "SUCCESS"
			? "fixed top-14 right-4 z-50 p-2 rounded-md bg-green-600 text-white max-w-[20%]"
			: "fixed top-20 right-4 z-50 p-2 rounded-md bg-red-600 text-white max-w-[40%] text-sm";
	return (
		<main className={styles}>
			<div className='flex justify-center items-center'>
				<span className='text-xs md:text-sm'>{message}</span>
			</div>
		</main>
	);
};

export default Toast;
