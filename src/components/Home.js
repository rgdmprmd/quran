import { Link } from "react-router-dom";
import logo from "../img/reads.png";

const Home = () => {
	return (
		<div className="home container">
			<div className="d-none d-md-block">
				<div className="row mt-5">
					<div className="col-md-6">
						<div className="d-flex h-100">
							<div className="justify-content-center align-self-center">
								<h2>
									<strong>Learn and Recite Quran </strong> <br /> Once Everyday.
								</h2>
								<p>Gain your weight, with satisfaction.</p>
								<Link className="btn btn-info" to="/surah">
									Get Started
								</Link>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<img src={logo} alt="Illustrasi" width="100%" />
					</div>
				</div>
			</div>
			<div className="d-sm-block d-md-none">
				<div className="row mt-3">
					<div className="col-md-6 mb-4 text-center">
						<img src={logo} alt="Illustrasi" width="80%" />
					</div>
					<div className="col-md-6">
						<div className="d-flex h-100">
							<div className="justify-content-center align-self-center">
								<h2>
									<strong>Learn and Recite Quran </strong> <br /> Once Everyday.
								</h2>
								<p>Gain your weight, with satisfaction.</p>
								<Link className="btn btn-info" to="/surah">
									Get Started
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
