import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah, Home, AyatList } from "./components";
import * as Icon from "react-bootstrap-icons";

function App() {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 200) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 200) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	window.addEventListener("scroll", checkScrollTop);

	return (
		<div>
			<NavbarComp />
			<div className="scrollTopWrapper" onClick={scrollTop} style={{ display: showScroll ? "flex" : "none" }}>
				<Icon.ArrowUp className="scrollTop" />
			</div>

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
