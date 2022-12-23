import { useEffect, useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
// import { getAllSurah, setAllSurahToCache } from "../utils/cacheQuran";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";

import SearchBox from "./SearchBox";

const ListSurah = ({ usersData }) => {
	const [list, setList] = useState([]);
	const [lastSurah, setLastSurah] = useState([]);
	const [searchField, setSearchField] = useState("");
	const [filteredSurahs, setFilteredSurahs] = useState(list);

	const getter = async (users) => {
		try {
			if (users) {
				const lastReader = await axios.get(API_URL + "surah/" + users.lastRead);
				lastReader && setLastSurah(lastReader);
			} else {
				setLastSurah([]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getListSurah = async () => {
		try {
			const surahRes = await axios.get(API_URL + "surah");
			setList(surahRes.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		usersData?.lastRead && getter(usersData);
	}, [usersData]);

	useEffect(() => {
		getListSurah();
	}, []);

	const searchHandler = (e) => {
		const searchString = e.target.value.toLocaleLowerCase();
		setSearchField(searchString);
	};

	useEffect(() => {
		const newFilteredSurah = list.filter((surahEach) => surahEach.name.transliteration.id.toLowerCase().includes(searchField.toLowerCase()));

		setFilteredSurahs(newFilteredSurah);
	}, [list, searchField]);

	return (
		<Col md={12} mt={2}>
			<Row>
				<Col md={12}>
					<Card className="card-background mb-3">
						<Card.Body className="text-white">
							<p>
								<Icon.BookFill className="mr-2" /> Last Read
							</p>
							{lastSurah.data ? (
								<>
									<span>
										<strong>{lastSurah.data.data.surah.name.transliteration.id} </strong>({lastSurah.data.data.surah.name.translation.id})
									</span>
									<br />
									<span className="font-weight-light small">
										AYAT {lastSurah.data.data.number.inSurah} - JUZ {lastSurah.data.data.meta.juz}
									</span>
									<br />
									<Link to={`surah/${usersData.lastRead}`} className="mt-3 btn btn-outline-light px-5">
										Read now
									</Link>
								</>
							) : (
								<>
									<span>Silahkan signin supaya bisa menandai bacaan terakhir.</span>
								</>
							)}
						</Card.Body>
					</Card>
				</Col>
				<Col md={12}>
					<SearchBox onChangeHandler={searchHandler} className="form-control mb-3" placeholder="Search any Surah" />
				</Col>
				<Col md={12}>
					<Accordion>
						{filteredSurahs &&
							filteredSurahs.map((doc) => (
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
			</Row>
		</Col>
	);
};

export default ListSurah;
