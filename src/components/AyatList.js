import { useEffect, useState } from "react";
import { Row, Col, Card, Alert, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import ReactAudioPlayer from "react-audio-player";

import axios from "axios";
import * as Icon from "react-bootstrap-icons";

const AyatList = () => {
	const { ayat, lastread } = useParams();
	const [ayah, setAyah] = useState("");
	const [audio, setAudio] = useState("");

	const ayatget = async (a, b) => {
		try {
			const surahRes = await axios.get(API_URL + "surah/" + a);
			surahRes && setAyah(surahRes.data.data);

			if (b) {
				let verse = document.getElementById(`verse${b}`);
				verse && verse.scrollIntoView({ behavior: "smooth" });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handlePlay = (number) => {
		setAudio(`https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${("00" + number).slice(-3)}.mp3`);
	};

	useEffect(() => {
		ayatget(ayat, lastread);
	}, [ayat, lastread]);

	return (
		<Col md={12} mt={2}>
			<Row>
				<Col md={12}>
					<Card className="card-background mb-3">
						<Card.Body className="text-center text-white">
							<h3 className="font-weight-bold">{ayah.name?.transliteration?.id.toUpperCase()}</h3>
							<p>{ayah.name?.translation?.id}</p>
							<hr />
							<small>
								{ayah.revelation?.id.toUpperCase()} - {ayah.numberOfVerses} AYAT
							</small>

							<ReactAudioPlayer src={audio} autoPlay />
						</Card.Body>
					</Card>
				</Col>
				{ayah.verses &&
					ayah.verses.map((doc) => (
						<Col md={12} key={doc.number.inSurah} id={`verse${doc.number.inSurah}`}>
							<Alert className="alertCustom" variant="success">
								<Row>
									<Col className="align-self-center">
										<Badge pill variant="info" className="px-2 py-1">
											{doc.number.inSurah}
										</Badge>
									</Col>
									<Col className="align-self-center text-right">
										<Icon.Play className="iconCustom ml-3 text-info" onClick={() => handlePlay(doc.number.inSurah)} />
										<Icon.Star className="iconCustom ml-3 text-info" />
										<Icon.Bookmark className="iconCustom ml-3 text-info" />
									</Col>
								</Row>
							</Alert>

							<h2 className="text-right">{doc.text.arab}</h2>
							<p className="text-right small">
								<i>{doc.text.transliteration.en}</i>
							</p>
							<p className="text-right small">{doc.translation.id}</p>
							<hr />
						</Col>
					))}
			</Row>
		</Col>
	);
};

export default AyatList;
