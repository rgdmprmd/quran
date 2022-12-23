import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import db, { auth, provider } from "../utils/firebase";

const NavbarComp = ({ isAuthenthicated, handleAuth, usersData }) => {
	const handleSignin = (e) => {
		e.preventDefault();

		auth.signInWithPopup(provider)
			.then((res) => {
				const usr = {
					uid: res.user.uid,
					displayName: res.user.displayName,
					email: res.user.email,
					photoURL: res.user.photoURL,
					isActive: true,
					lastRead: "1/1",
				};

				db.collection("users")
					.doc(res.user.uid)
					.get()
					.then((res) => {
						if (res.exists) {
							localStorage.setItem("state-user", JSON.stringify(res.data()));
							window.location.reload();
						} else {
							db.collection("users")
								.doc(usr.uid)
								.set(usr)
								.then((res) => {
									localStorage.setItem("state-user", JSON.stringify(usr));
									window.location.reload();
								});
						}
					});
			})
			.catch((err) => alert(err.message));
	};

	const handleSignout = (e) => {
		e.preventDefault();

		localStorage.removeItem("state-user");
		handleAuth(false);
		window.location.reload();
	};

	return (
		<Navbar bg="" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<strong>Al-Quran</strong>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/surah">
							Surah
						</Nav.Link>
						{!isAuthenthicated ? (
							<Nav.Link href="/" onClick={handleSignin}>
								Signin with Google
							</Nav.Link>
						) : (
							<NavDropdown title={usersData?.displayName} id="basic-nav-dropdown">
								<NavDropdown.Item href={`surah/${usersData?.lastRead}`}>Last Read</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/" onClick={handleSignout}>
									Signout
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComp;
