import { SpinnerCircular } from "spinners-react";

const Loading = () => {
	return (
		<div className='flex justify-center items-center h-fit'>
			<SpinnerCircular color='#003B95' thickness={60} />
		</div>
	);
};

export default Loading;
