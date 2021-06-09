import axios from "axios";
import { useEffect, useState } from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { API_URL } from "../utils/constants";

const ListSurah = () => {
	const [listSurah, setListSurah] = useState([]);
	const [surah, setSurah] = useState([]);

	const surahClick = (nomor) => {
		axios
			.get(API_URL + `surah/${nomor}`)
			.then(function (response) {
				// handle success
				console.log(response.data);
				setSurah(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(API_URL + "surah")
			.then(function (response) {
				// handle success
				// console.log(response.data);
				setListSurah(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	return (
		<Col md={12} mt={2}>
			<Tab.Container id="list-group-tabs-example">
				<Row>
					<Col sm={4}>
						<ListGroup>
							{listSurah.data &&
								listSurah.data.map((doc) => (
									<ListGroup.Item key={doc.number} onClick={() => surahClick(doc.number)} className={surah.data && doc.number === surah.data.number && "active"}>
										{doc.number}. {doc.name.transliteration.id} ({doc.name.translation.id})
									</ListGroup.Item>
								))}
						</ListGroup>
					</Col>
					<Col sm={8}>
						<ListGroup>
							{surah.data &&
								surah.data.verses.map((doc) => (
									<ListGroup.Item key={doc.number.inQuran} className="text-right">
										<h3>{doc.text.arab}</h3>
										<small>
											<i>{doc.text.transliteration.en}</i>
										</small>
										<br />
										<br />
										<small>
											{doc.number.inSurah}. {doc.translation.id}
										</small>
									</ListGroup.Item>
								))}
						</ListGroup>
					</Col>
				</Row>
			</Tab.Container>
		</Col>
	);
};

export default ListSurah;
