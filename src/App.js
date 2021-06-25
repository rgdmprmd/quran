import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah, Home, AyatList } from "./components";
import * as Icon from "react-bootstrap-icons";

function App() {
	const [showScroll, setShowScroll] = useState(false);
	const [isAuthenthicated, setIsAuthenticated] = useState(false);
	const [usersData, setUsersData] = useState({});

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 200) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 200) {
			setShowScroll(false);
		}
	};

	window.addEventListener("scroll", checkScrollTop);

	const handleAuth = (boolean) => {
		setIsAuthenticated(boolean);
		boolean === false && setUsersData({});
	};

	const verifyAuth = async () => {
		try {
			const token = JSON.parse(localStorage.getItem("state-user"));
			if (token) {
				setUsersData(token);
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		verifyAuth();
	}, []);

	return (
		<div>
			<NavbarComp isAuthenthicated={isAuthenthicated} usersData={usersData} handleAuth={handleAuth} />
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
								<Route exact path="/surah/:ayat/:lastread" render={(props) => <AyatList {...props} />} />
							</Switch>
						</Row>
					</Container>
				</Router>
			</div>
		</div>
	);
}

export default App;
