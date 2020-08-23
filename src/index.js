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

    const [groups, setGroups] = useState({topGroups: []})
    const [scoreSorted, setScoreSorted] = useState(false);
    const [groupSorted, setGroupSorted] = useState(false);
    const [indexSorted, setIndexSorted] = useState(false);
    const [ascending, setAscending] = useState(false)
    const [scores, setScores] = useState([])
    const [uniqScores, setUniqScores] = useState([])

    useEffect(() => {
        axios.get('https://gewis.nl/~intro20/scoreboard/score.json')
            .then(({data}) => {
                data.sort((a, b) => b.score - a.score);
                setGroups({topGroups: data});

                const scores = data.map((group) => group.score);
                const uniqScores = Array.from(new Set(scores));
                setScores(scores);
                setUniqScores(uniqScores);
            })
        setScoreSorted(false);
    }, [])

    const sortOnScore = () => {
        // Set all variables to distinguish different sorting methods
        if (groupSorted || setIndexSorted) setAscending(true);
        setScoreSorted(true); setAscending(!ascending);
        setGroupSorted(false); setIndexSorted(false);

        // Actually sort the data
        const sortedData = groups.topGroups.sort((a, b) => {
            return ascending ? a.score - b.score : b.score - a.score;
        });
        setGroups({topGroups: sortedData});
    }

    const sortOnGroupname = () => {
        // Set all variables to distinguish different sorting methods
        if (scoreSorted || indexSorted) setAscending(true);
        setGroupSorted(true); setAscending(!ascending);
        setScoreSorted(false); setIndexSorted(false);

        // Actually sort the data
        const sortedData = groups.topGroups.sort((a, b) => {
            if(a.groupName.toLowerCase() < b.groupName.toLowerCase()) return ascending ? 1 : -1;
            if(a.groupName.toLowerCase() > b.groupName.toLowerCase()) return ascending ? -1 : 1;
            return 0;
        })
        setGroups({topGroups: sortedData});
    }

    // Medal codes
    const goldMedal = String.fromCodePoint(0x1f947) + " ";
    const silverMedal = String.fromCodePoint(0x1F948) + " ";
    const bronzeMedal = String.fromCodePoint(0x1F949) + " ";

    // Dropdown arrows
    const dropdownGroup = () => groupSorted ? ascending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;
    const dropdownScore = () => scoreSorted ? !ascending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;
    const dropdownRank = () => scoreSorted ? ascending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : <ArrowLeftIcon />;

    // Response for carousel
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slideToSlide: 3
        },
    };

    // Images used for carousel
    const images = [
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_01_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_02_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_03_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_04_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_05_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_06_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_07_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_08_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_09_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_10_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_11_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_12_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_13_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_14_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_15_resize.jpg", "",
        "https://gewis.nl/~intro20/scoreboard/Strip_Page_16_resize.jpg", "",
    ]

    // Actual render
    return (
        <div>
            {/*Carousel settings*/}
            <Carousel
                infinite
                swipeable={false}
                draggable={false}
                showDots={false}
                keyBoardControl={true}
                containerClass="stick"
                itemClass="backdrop"
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={10000}
                slidesToSlide={2}
            >
                {/*Display all settings*/}
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
            {/*Link to the challenges page*/}
            <div id={"link"}> Challenges can be found <a href={"https://gewis.nl/~intro20/challenges"}>here</a>!</div>
            {/*Image of the intro20 logo*/}
            <Image
                src={'https://gewis.nl/~intro20/scoreboard/intro20.png'}
                id={"image"}
            />
            {/*Table that shows all the information and settings*/}
            <Table id={"table"}
                striped
                bordered
                hover
                size="sm"
                variant={"flat"}
            >
                {/*Table head, align everything center*/}
                <thead style={{
                    textAlign: "center"
                }}>
                    {/*Table row*/}
                    <tr>
                        {/*Table head, rank with dropdown arrow*/}
                        <th
                            onClick={() => sortOnScore()}
                            style={{
                                width: '100px',
                            }}
                        >
                            Rank {dropdownRank()}
                        </th>

                        {/*Table head, groups with dropdown arrow*/}
                        <th
                            onClick={() => sortOnGroupname()}
                        >
                            Group Name {dropdownGroup()}
                        </th>

                        {/*Table head, score with dropdown arrow*/}
                        <th
                            onClick={() => sortOnScore()}
                            style={{
                                width: '100px',
                            }}
                        >
                            Score {dropdownScore()}
                        </th>
                    </tr>
                </thead>
                {/*Body of the table*/}
                <tbody>
                    {groups.topGroups.map((row) => (
                        <tr key={row.number}>
                            {/*Body, get rank number*/}
                            <td style={{
                                textAlign: "center"
                            }}>
                                {scores.indexOf(row.score)}
                            </td>

                            {/*Body, get group name and possible medal*/}
                            <td>
                                {uniqScores[0] === row.score ? goldMedal : uniqScores[1] === row.score ? silverMedal : uniqScores[2] === row.score ? bronzeMedal : ""}
                                {row.groupName}
                            </td>

                            {/*Body, get group score*/}
                            <td style={{
                                textAlign: "center"
                            }}>
                                {row.score}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

render(<App />, document.getElementById('root'));