import Header from "../../components/Header/Header";

import { useState, useEffect } from "react";

import { Bar } from 'react-chartjs-2';

import axios from "axios";


import "../../main.css"

function AboutUs() {

    const [arr, setArr] = useState(null)

    useEffect(() => {
        async function fetchArr() {
            const res = await axios.get(`http://localhost:3001/statsExample/`);
            setArr(res.data)
        }

        fetchArr()
    }, []);

    console.log(arr)

    if (arr === null) return <div>Loading...</div>

    let res = {}

    for (let account of arr) {
        console.log(account)

        if (!("dates" in account)) {
            continue
        }

        for (let date of account["dates"]) {

            date = date.split(" ")[1];

            if (date in res) {
                res[date] += 1
            } else {
                res[date] = 1
            }
        }
    }

    let data = { labels: Object.keys(res), datasets: [{ data: Object.values(res) }] }

    const options = {
        scales: {
            y: { ticks: { stepSize: 1 } }
        },
        plugins: {
            title: {
                display: true,
                text: "Saved games by days"
            },
            legend: { display: false }
        },

    }

    return (
        <div>
            <Header></Header>
            {/* <TypingElement></TypingElement> */}
            <section className="main-part">
                <h1>About Us</h1>

                <div className="bar hor-center">
                    <Bar data={data} options={options}></Bar>
                </div>

                <p>ProjectTypist is student project from Web course. Our team consists of 3 people: Lev, Viktor and Bohdan.</p>
                <p>Our main goal was to try to make some typing trainer and for that we heavily took inspiration from <a href="https://monkeytype.com/">MonkeyType</a>.</p>
                <p>We decided to select this project to increase our knowledge about React in applied sphere and to have some interesting thing to show.</p>

            </section>

        </div>
    );
}

export default AboutUs;