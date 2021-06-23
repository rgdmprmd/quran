import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavbarComp = () => {
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
						<NavDropdown title="Action" id="basic-nav-dropdown">
							<NavDropdown.Item href="/login">Login</NavDropdown.Item>
							<NavDropdown.Item href="/register">Register</NavDropdown.Item>
							{/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComp;
