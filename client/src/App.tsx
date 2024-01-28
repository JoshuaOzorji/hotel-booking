import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./components/Homepage";

const App = () => {
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
			</Routes>
		</Router>
	);
};

export default App;
