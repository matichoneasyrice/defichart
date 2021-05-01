import { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import './App.css';
//0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1 slime 
//0xc1edcc306e6faab9da629efca48670be4678779d mgd
function App() {


  useEffect(() => {
    setInterval(() => {
      fetch('https://www.goosedefi.com/layeredFarming/2/incubators')
        .then(res => res.json())
        .then((newData) => {
          console.log(newData)
        }).catch((err) => {
          console.log(err)
        })

    }, 3000)
  })
  return (
    <div className="App">
    </div>
  );

}
export default App;
