import { useEffect, useState, useRef } from "react";
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
	const [hiding, setHiding] = useState("");

	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const audioRef = useRef(new Audio(audio));
	const intervalRef = useRef();
	const isReady = useRef(false);

	const { duration } = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				// do something when audio ended
				// toNextTrack();
			} else {
				// do something when audio play
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	};

	const onScrub = (value) => {
		// Clear any timers already running
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

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
		setAudio(`https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${number}`);
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
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

							<ReactAudioPlayer src={audio} />
						</Card.Body>
					</Card>
				</Col>
				{ayah.verses &&
					ayah.verses.map((doc) => (
<<<<<<< HEAD
						<Col id={`ayah${doc.number.inSurah}`} md={12} key={doc.number.inSurah}>
=======
						<Col md={12} key={doc.number.inSurah} id={`verse${doc.number.inSurah}`}>
>>>>>>> 414f51ca59725d9381a173063c350a0143406a6c
							<Alert className="alertCustom" variant="success">
								<Row>
									<Col className="align-self-center">
										<Badge pill variant="info" className="px-2 py-1">
											{doc.number.inSurah}
										</Badge>
									</Col>
									<Col className="align-self-center text-right">
										{isPlaying ? (
											<Icon.Pause className={`iconCustom ml-3 text-info`} onClick={() => handlePause(doc.number.inQuran)} />
										) : (
											<Icon.Play className={`iconCustom ml-3 text-info`} onClick={() => handlePlay(doc.number.inQuran)} />
										)}
										<Icon.Star className={`iconCustom ml-3 text-info`} />
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
