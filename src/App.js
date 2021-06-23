import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah, Home, AyatList } from "./components";

function App() {
	return (
		<div>
			<NavbarComp />
			<div className="mt-5">
				<Router>
					<Container>
						<Row mt={3}>
							<Switch>
								<Route exact path="/" render={(props) => <Home {...props} />} />
								<Route exact path="/surah" render={(props) => <ListSurah {...props} />} />
								<Route exact path="/surah/:ayat" render={(props) => <AyatList {...props} />} />
							</Switch>
						</Row>
					</Container>
				</Router>
			</div>
		</div>
	);
}

export default App;
