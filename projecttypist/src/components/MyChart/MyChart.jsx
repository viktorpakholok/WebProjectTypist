import { useEffect } from "react";
import { Chart as ChartJs, plugins } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./MyChart.css";

function LineChart(props) {
    useEffect(() => {
        return () => {
            Object.keys(ChartJs.instances).forEach((key) => {
                ChartJs.instances[key].destroy();
            });
        };
    }, []);

    const arr = props.timeSteps;

    // console.log("inside mychart");
    // console.log(arr);

    const xValues = [];
    const objArr = [];
    const colors = ["red", "green", "blue"];
    const labels = ["wpm", "raw wpm"];

    const stepLen = arr[0].length - 1;

    for (let i = 0; i < stepLen; i++) {
        objArr.push({
            data: [],
            fill: false,
            borderColor: colors[i % colors.length],
            label: labels[i % 2],
        });
    }

    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        xValues.push(elem[0]);
        elem = elem.filter((_, idx) => idx !== 0);

        for (let j = 0; j < stepLen; j++) {
            objArr[j]["data"].push(elem[j]);
        }
    }

    // console.log("here");
    // console.log(objArr);
    // console.log(xValues);

    let style = getComputedStyle(document.body);
    let fontColor = style.getPropertyValue('--ft-color');

    const options = {
        legend: { display: false },
        plugins: {
            customCanvasBackgroundColor: {
                // color: "lightGreen",
            },
            legend: {
                labels: {
                    font: {
                        fontColor: fontColor,
                    },
                },
            },
            title: {
                display: true,
                text: "WPM by time",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time"
                }
            }
        }
    };

    const data = {
        labels: xValues,
        datasets: objArr,
    };

    ChartJs.defaults.color = fontColor;
    ChartJs.defaults.borderColor = "#36A2EB";

    return <Line options={options} data={data} />;
}
export default LineChart;
