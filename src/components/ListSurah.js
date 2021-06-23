import { useEffect, useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import axios from "axios";
import ReactPlayer from "react-player";
import { API_URL } from "../utils/constants";

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
										<ReactPlayer width="1%" height="1%" url={`https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${("00" + doc.number).slice(-3)}.mp3`} />
										<button>Play</button>
									</Col>
								</Row>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey={doc.number}>
								<Card.Body>
									<p>
										{doc.revelation.id} - {doc.numberOfVerses}
									</p>
									<p>{doc.tafsir.id}</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
			</Accordion>
			{/* <Accordion>
				{list &&
					list.map((doc) => (
						<Accordion.Item eventKey={doc.number} key={doc.number}>
							<Accordion.Header>
								{doc.number}. {doc.name.transliteration.id} {doc.name.translation.id}
							</Accordion.Header>
							<Accordion.Body>{doc.tafsir.id}</Accordion.Body>
						</Accordion.Item>
					))}
			</Accordion> */}
		</Col>
	);
};

export default ListSurah;
