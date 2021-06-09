import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah } from "./components";

function App() {
	return (
		<div>
			<NavbarComp />
			<div className="mt-5">
				<Container>
					<Row mt={3}>
						<ListSurah />
						{/* <Surah /> */}
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default App;
