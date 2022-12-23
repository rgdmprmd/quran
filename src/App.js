import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah, Home, AyatList } from "./components";
import * as Icon from "react-bootstrap-icons";
import db from "./utils/firebase";

function App() {
	const [showScroll, setShowScroll] = useState(false); // Back to top toggle
	const [isAuthenthicated, setIsAuthenticated] = useState(false); // Authentication user
	const [usersData, setUsersData] = useState({}); // User information

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
			const token = JSON.parse(localStorage.getItem("state-user")); // Get user in localstorage
			if (token) {
				setIsAuthenticated(true); // If found user, set as authenticated

				const usersGet = await db.collection("users").doc(token.uid).get();
				usersGet && setUsersData(usersGet.data()); // Fill in the user information
			} else {
				setIsAuthenticated(false); // If empty, set as un-authenticate
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
			<div className="scrollTopWrapper" onClick={scrollTop} style={{ display: showScroll ? "flex" : "none" }}>
				<Icon.ArrowUp className="scrollTop" />
			</div>

			<div className="mt-5">
				<Router>
					<NavbarComp isAuthenthicated={isAuthenthicated} usersData={usersData} handleAuth={handleAuth} />

					<Container>
						<Row mt={3}>
							<Switch>
								<Route exact path="/" render={(props) => <Home {...props} />} />
								<Route exact path="/surah" render={(props) => <ListSurah {...props} usersData={usersData} />} />
								<Route exact path="/surah/:ayat" render={(props) => <AyatList {...props} usersData={usersData} />} />
								<Route exact path="/surah/:ayat/:lastread" render={(props) => <AyatList {...props} usersData={usersData} />} />
							</Switch>
						</Row>
					</Container>
				</Router>
			</div>
		</div>
	);
}

export default App;
