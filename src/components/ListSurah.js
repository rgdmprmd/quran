import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { API_URL } from "../utils/constants";

const ListSurah = () => {
	const [listSurah, setListSurah] = useState([]);

	useEffect(() => {
		axios
			.get(API_URL + "data")
			.then(function (response) {
				// handle success
				console.log(response);
				setListSurah(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	return (
		<Col md={4} mt={2}>
			{listSurah &&
				listSurah.map((doc) => (
					<p>
						{doc.nomor}. {doc.nama} ({doc.arti})
					</p>
				))}
		</Col>
	);
};

export default ListSurah;
