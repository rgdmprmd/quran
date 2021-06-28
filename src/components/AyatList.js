import { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Alert, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";

import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import db from "../utils/firebase";

const AyatList = ({ usersData }) => {
	const { ayat, lastread } = useParams();
	const [ayah, setAyah] = useState("");
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [ayatPlaying, setAyatPlaying] = useState(0);

	const audioRef = useRef(new Audio(""));
	const intervalRef = useRef();

	const { duration } = audioRef.current;
	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				// do something when audio ended
				setIsPlaying(false);
			} else {
				// do something when audio play
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	};

	const handlePlay = (number, type) => {
		if (type === "ayat") {
			audioRef.current = new Audio(`https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${number}`);
			setIsPlaying(true);
			setAyatPlaying(number);
		} else {
			audioRef.current = new Audio(`https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${("00" + number).slice(-3)}.mp3`);
			setIsPlaying(true);
		}
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	const handleLastread = async (numberAyat, numberSurah) => {
		if (usersData?.uid) {
			usersData.lastRead = numberSurah + "/" + numberAyat;
			await db
				.collection("users")
				.doc(usersData.uid)
				.set({
					...usersData,
					lastRead: numberSurah + "/" + numberAyat,
				})
				.then((res) => window.location.reload());
		} else {
			alert(`Silahkan signin untuk menandai bacaan terakhir`);
		}
	};

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
							<div className="text-center mt-2">
								{ayat > 1 && (
									<Link to={"./" + (parseInt(ayat) - 1)} className="btn btn-sm btn-outline-light">
										<Icon.ArrowLeft />
									</Link>
								)}
								{isPlaying ? <Icon.Pause className="iconCustom ml-3" onClick={() => handlePause()} /> : <Icon.CaretRight className="iconCustom ml-3" onClick={() => handlePlay(ayat, "surah")} />}
								{ayat < 114 && (
									<Link to={"./" + (parseInt(ayat) + 1)} className="btn btn-sm btn-outline-light ml-3">
										<Icon.ArrowRight className="" />
									</Link>
								)}
							</div>
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
										{isPlaying && ayatPlaying === doc.number.inQuran ? (
											<Icon.Pause className={`iconCustom ml-3 text-info`} key={doc.number.inQuran} onClick={() => handlePause(doc.number.inQuran, "ayat")} />
										) : (
											<Icon.CaretRight className={`iconCustom ml-3 text-info`} key={doc.number.inQuran} onClick={() => handlePlay(doc.number.inQuran, "ayat")} />
										)}

										{usersData?.lastRead === ayat + "/" + doc.number.inSurah ? (
											<Icon.BookmarkFill className="iconCustom ml-3 text-info" onClick={() => handleLastread(doc.number.inSurah, ayat)} />
										) : (
											<Icon.Bookmark className="iconCustom ml-3 text-info" onClick={() => handleLastread(doc.number.inSurah, ayat)} />
										)}
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
