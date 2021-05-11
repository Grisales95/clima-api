import React from "react"
import {useState} from "react"

export default function Wheater () {
  
  const [clima, setClima] = useState ([])

  const [units, setUnits ] = useState("celsius")

  const toCelsius = temp => Math.round((5/9) * (temp - 32))
    const switchToC = () => setUnits('celsius')
    const switchToF = () => setUnits('fahrenheit')

   React.useEffect(() => {
     getData()  
   }, [])

  const getData = () => {
    navigator.geolocation.getCurrentPosition(async location => {
      const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=9f904ebccd4a18da98b14f547a4efbaf`)
      const info = await data.json()
      setClima(info)
    })  
  }
  if (!clima.weather) {
    return <span>Loading...</span>;
}

const iconUrl = `https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`

const { temp, temp_min, temp_max, humidity } = clima.main

return(
    <div className = "container">
      <h1>Weather App</h1>
      <div className="container-app">
        <h2>{clima.name} - {clima.sys.country}</h2>

        <img src={iconUrl} alt="weather"/>
  
        <p>Conditions: {clima.weather[0].main} - {clima.weather[0].description}</p>

        <p>Temperature:{units === 'celsius' ? `${Math.round(temp)} °C` : `${toCelsius(temp)} °F `} </p>

        <p>Min Temperature: {units === 'celsius' ? `${Math.round(temp_min)} °C` : `${toCelsius(temp_min)} °F `}</p>

        <p>Min Temperature: {units === 'celsius' ? `${Math.round(temp_max)} °C` : `${toCelsius(temp_max)} °F `}</p>

        <p>Humidity: {humidity}%</p>

        <div>
          <button className="margin-r" onClick={switchToF}>°F</button>
          <button onClick={switchToC}>°C</button>
        </div>
      </div>
    </div>
    
  )
}