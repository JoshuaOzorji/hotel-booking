import { CiSearch } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

import { MdTravelExplore } from "react-icons/md";

const SearchBar = () => {
	return (
		<form className='-mt-8 w-full flex flex-col lg:grid lg:grid-cols-8 p-4 bg-sec rounded-lg lg:gap-x-2 gap-y-2 lg:gap-y-0 text-h3 shadow-xl'>
			<div className='col-span-2 flex items-center bg-white p-2 space-x-3'>
				<MdTravelExplore className='hero-icon' />
				<input
					placeholder='Where are you going?'
					type='text'
					className='text-center w-full form-focus'
				/>
			</div>

			{/* adults and children */}
			<div className='flex flex-col lg:flex-row  col-span-2 bg-white p-2 gap-x-2 gap-y-2'>
				<label className='flex justify-between  items-center'>
					<p className='w-[60%]'>Adults:</p>
					<input
						type='number'
						className='w-[40%] text-center form-focus1 rounded-md'
					/>
				</label>

				<label className='flex justify-between  items-center'>
					<p className='w-[60%]'>Children:</p>
					<input
						type='number'
						className='w-[40%] text-center form-focus form-focus1 rounded-md'
					/>
				</label>
			</div>

			{/* CheckIn & CheckOut */}
			<div className='col-span-3 flex justify-between bg-white items-center p-2'>
				<div className='lg:w-[50%]'>CheckIn</div>
				<div className='lg:w-[50%]'>CheckOut</div>
			</div>

			{/* search and clear */}
			<div className='col-span-1 gap-x-2 flex justify-center  '>
				<button className='w-[50%] bg-accent p-2 flex items-center justify-center hover:bg-primary hover:text-accent animate'>
					<CiSearch size={26} />
				</button>
				<button className='w-[50%] bg-accent p-2 mx-auto flex items-center justify-center hover:bg-red-600 hover:text-accent animate'>
					<TiDeleteOutline size={26} />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
