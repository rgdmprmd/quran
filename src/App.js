import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { NavbarComp, ListSurah, Surah } from "./components";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			surahList: [],
		};
	}

	componentDidMount() {
		axios
			.get(API_URL + "data")
			.then(function (response) {
				// handle success
				console.log(response);
				const surahList = response.data;
				this.setState({ surahList });
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}

	render() {
		const { surahList } = this.state;

		return (
			<div>
				<NavbarComp />
				<div className="mt-5">
					<Container>
						<Row mt={3}>
							<ListSurah />
							<Surah />
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

// function App() {
// 	return (
// 		<div className="app">

// 		</div>
// 	);
// }

// export default App;
