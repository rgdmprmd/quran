import { useEffect, useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";

const ListSurah = () => {
	const [list, setList] = useState([]);

	const getter = async () => {
		try {
			const surahRes = await axios.get(API_URL + "surah");
			setList(surahRes.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getter();
	}, []);

	return (
		<Col md={12} mt={2}>
			<Accordion>
				{list &&
					list.map((doc) => (
						<Card key={doc.number}>
							<Accordion.Toggle as={Card.Header} eventKey={doc.number} className="cardheader">
								<Row>
									<Col xs={2} className="align-self-center">
										<span className="small">{doc.number}</span>
									</Col>
									<Col xs={7} className="align-self-center">
										<span className="font-weight-bold">{doc.name.transliteration.id}</span>
										<br />
										<small>
											{doc.revelation.id.toUpperCase()} - {doc.numberOfVerses} AYAT
										</small>
									</Col>
									<Col className=" align-self-center text-right">
										<Link className="btn btn-sm btn-outline-info" to={`/surah/${doc.number}`}>
											<Icon.Book />
										</Link>
									</Col>
								</Row>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={doc.number}>
								<Card.Body>
									<p>
										{doc.revelation.id} - {doc.numberOfVerses} Ayat
									</p>
									<p className="text-justify">{doc.tafsir.id}</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
			</Accordion>
		</Col>
	);
};

export default ListSurah;
