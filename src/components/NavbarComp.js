import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
				};

				db.collection("users").doc(res.user.uid).set(usr);
				localStorage.setItem("state-user", JSON.stringify(usr));
				window.location.reload();
			})
			.catch((err) => alert(err.message));
	};

	const handleSignout = (e) => {
		e.preventDefault();

		localStorage.removeItem("state-user");
		handleAuth(false);
	};

	console.log(isAuthenthicated);

	return (
		<Navbar bg="" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<strong>Al-Quran</strong>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/surah">Surah</Nav.Link>
						{!isAuthenthicated ? (
							<Nav.Link href="/" onClick={handleSignin}>
								Signin with Google
							</Nav.Link>
						) : (
							<NavDropdown title={usersData.displayName} id="basic-nav-dropdown">
								<NavDropdown.Item href="/surah/2/18">Last Read</NavDropdown.Item>
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
