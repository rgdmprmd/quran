import { useEffect, useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
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
							<Accordion.Toggle as={Card.Header} eventKey={doc.number}>
								<Row>
									<Col md={8}>
										{doc.number}. {doc.name.transliteration.id} ({doc.name.translation.id})
									</Col>
									<Col md={4} className="text-right">
										<Link className="btn btn-sm btn-primary" to={`/surah/${doc.number}`}>
											Baca
										</Link>
									</Col>
								</Row>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={doc.number}>
								<Card.Body>
									<p>
										{doc.revelation.id} - {doc.numberOfVerses} Ayat
									</p>
									<p>{doc.tafsir.id}</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
			</Accordion>
		</Col>
	);
};

export default ListSurah;
