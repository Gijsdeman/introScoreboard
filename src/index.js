import React, {useState, useEffect} from 'react'
import {render} from "react-dom"
import axios from "axios"
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './index.css'

export default function App() {

    const [state, setState] = useState({topGroups: []})

    const [scoreSorted, setScoreSorted] = useState([false,false]);
    const [groupSorted, setGroupSorted] = useState([false,false]);
    const [indexSorted, setIndexSorted] = useState([false,false]);

    const [scores, setScores] = useState([])

    useEffect(() => {
        axios.get('https://gewis.nl/~intro20/scoreboard/score.json')
            .then(({data}) => {
                data.sort((a, b) => b.score - a.score);
                setState({topGroups: data});

                const scores = data.map((group) => group.score);
                const uniqScores = Array.from(new Set(scores));
                setScores(uniqScores);
            })
    }, [])

    const sortOnScore = () => {
        setScoreSorted([!scoreSorted[0], true])
        setGroupSorted([false,false])
        setIndexSorted([false,false])
        const sortedData = state.topGroups.sort((a, b) => {
            return scoreSorted[0] ? a.score - b.score : b.score - a.score;
        });
        setState({topGroups: sortedData});
    }

    const sortOnIndex = () => {
        setIndexSorted([!indexSorted[0], true])
        setGroupSorted([false,false])
        setScoreSorted([false,false])
        const sortedData = state.topGroups.sort((a, b) => {
            return indexSorted[0] ? b.number - a.number : a.number - b.number;
        });
        setState({topGroups: sortedData});
    }

    const sortOnGroupname = () => {
        setGroupSorted([!groupSorted[0], true])
        setScoreSorted([false,false])
        setIndexSorted([false,false])
        const sortedData = state.topGroups.sort((a, b) => {
            if(a.groupName.toLowerCase() < b.groupName.toLowerCase()) return groupSorted[0] ? 1 : -1;
            if(a.groupName.toLowerCase() > b.groupName.toLowerCase()) return groupSorted[0] ? -1 : 1;
            return 0;
        })
        setState({topGroups: sortedData});
    }

    const goldMedal = String.fromCodePoint(0x1f947) + " ";
    const silverMedal = String.fromCodePoint(0x1F948) + " ";
    const bronzeMedal = String.fromCodePoint(0x1F949) + " ";

    const dropdownIndex = () => indexSorted[1] ? indexSorted[0] ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;
    const dropdownGroup = () => groupSorted[1] ? groupSorted[0] ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;
    const dropdownScore = () => scoreSorted[1] ? scoreSorted[0] ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 100, min: 100 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
    };

    const images = [
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_01_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_02_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_03_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_04_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_05_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_06_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_07_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_08_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_09_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_10_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_11_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_12_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_13_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_14_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_15_resize.jpg",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_16_resize.jpg",
    ]

    return (
        <div>
            <div id={"backdrop"}>
                    <Carousel
                        responsive={responsive}
                        autoPlay={true}
                        autoPlaySpeed={10000}
                    >
                        {images.map(image => {
                            return (
                                <Image key={image}
                                    draggable={false}
                                    style={{ width: "100%" }}
                                    src={image}
                                />
                            );
                        })}
                    </Carousel>
            </div>
            <Image
                src={'https://gewis.nl/~intro20/scoreboard/intro20.png'}
                id={"image"}
            />
            <Table id={"table"}
                striped
                npbordered
                hover
                size="sm"
                variant={"flat"}
            >
                <thead style={{
                    textAlign: "center"
                }}>
                    <tr>
                        <th
                            onClick={() => sortOnIndex()}
                            style={{
                                width: '100px',
                            }}
                        ># {dropdownIndex()}</th>
                        <th
                            onClick={() => sortOnGroupname()}
                        >Group Name {dropdownGroup()}</th>
                        <th
                            onClick={() => sortOnScore()}
                            style={{
                                width: '100px',
                            }}
                        >Score {dropdownScore()}</th>
                    </tr>
                </thead>
                <tbody>
                    {state.topGroups.map(
                        (row) => (
                            <tr
                                key={row.number}
                            >

                                <td style={{
                                    textAlign: "center"
                                }}>{row.number}</td>

                                <td>
                                    {scores[0] === row.score ? goldMedal : scores[1] === row.score ? silverMedal : scores[2] === row.score ? bronzeMedal : ""}
                                    {row.groupName}
                                </td>

                                <td style={{
                                    textAlign: "center"
                                }}>{row.score}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    )
}

render(<App />, document.getElementById('root'));