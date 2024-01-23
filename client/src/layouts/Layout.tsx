import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<main>
			<Header />
			<Hero />

			<div>
				<SearchBar />
			</div>

			<div className=''>{children}</div>

			<Footer />
		</main>
	);
};

export default Layout;
