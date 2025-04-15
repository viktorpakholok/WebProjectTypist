import { useEffect } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function LineChart(props) {
    useEffect(() => {
        return () => {
            Object.keys(ChartJs.instances).forEach((key) => {
                ChartJs.instances[key].destroy();
            });
        };
    }, []);

    const arr = props.timeSteps;

    console.log('inside mychart');
    console.log(arr);

    const xValues = []
    const objArr = []
    const colors = ['red', 'green', 'blue']

    const stepLen = arr[0].length-1;

    for (let i = 0; i < stepLen; i++) {
        objArr.push({data: [], fill: false, borderColor: colors[i%colors.length]});
    }

    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        xValues.push(elem[0]);
        elem = elem.filter((_, idx) => idx !== 0);

        for (let j = 0; j < stepLen; j++) {
            objArr[j]['data'].push(elem[j]);
        }
    }

    console.log('here');
    console.log(objArr);
    console.log(xValues);

    const options = {
        legend: { display: false },
    };

    const data = {
        labels: xValues,
        datasets: objArr,
    };

    return <Line options={options} data={data} />;
};
export default LineChart;
