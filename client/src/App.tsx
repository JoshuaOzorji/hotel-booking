import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./components/Homepage";
import Register from "./pages/Register";
import Layout2 from "./layouts/Layout2";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./components/MyHotels";

const App = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<Layout>
							<Homepage />
						</Layout>
					}
				/>

				<Route
					path='/register'
					element={
						<Layout2>
							<Register />
						</Layout2>
					}
				/>

				<Route
					path='/sign-in'
					element={
						<Layout2>
							<SignIn />
						</Layout2>
					}
				/>
				{isLoggedIn && (
					<>
						<Route
							path='/add-hotel'
							element={
								<Layout2>
									<AddHotel />
								</Layout2>
							}
						/>

						<Route
							path='/my-hotels'
							element={
								<Layout2>
									<MyHotels />
								</Layout2>
							}
						/>
					</>
				)}
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	);
};

export default App;
