import { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import './App.css';
//0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1 slime 
//0xc1edcc306e6faab9da629efca48670be4678779d mgd
function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  const [data, setData] = useState(null)
  const [axes, setAxes] = useState([
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ])
  function median(values) {
    if (values.length === 0) return 0;

    values.sort(function (a, b) {
      return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
      return values[half];

    return (values[half - 1] + values[half]) / 2.0;
  }
  useEffect(() => {
    setTimeout(() => {
      fetch('http://54.254.93.168:1111/viewDataPointByContract?contract=0xc1edcc306e6faab9da629efca48670be4678779d')
        .then(res => res.json())
        .then((newData) => {
          console.log(newData)
          // const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
          let dataPointArr = []
          newData.map((dataValue) => {
            dataPointArr.push(dataValue['Point'])
          })
          console.log(median(dataPointArr))
          const medianPoint = median(dataPointArr)
          let tempData = []
          let arrData = []
          newData.map((dataValue, idx) => {
            if (idx < 40) {
              if ((Math.abs(dataValue['Point'] - medianPoint) / medianPoint) > 0.2) {
                arrData.push({
                  x: 40 - idx,
                  y: medianPoint
                })
              } else {
                arrData.push({
                  x: 40 - idx,
                  y: dataValue['Point']
                })
              }

            }
          })
          tempData.push({
            label: 'slime',
            data: arrData
          })
          setData(tempData)
        })
    }, 5000)

  });
  if (data) {
    return (
      <div className="App">

        <div
          style={{
            width: '1000px',
            height: '400px'
          }}
        >

          <Chart data={data} axes={axes} />
        </div>

      </div>
    );
  } else {
    return <></>
  }

}

export default App;
