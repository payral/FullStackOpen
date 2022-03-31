import axios from 'axios'
import { useState, useEffect } from 'react'



const Country = ({country}) => {
    const [city, setCity] = useState([])
    const [weather, setWeather] = useState("")
    const [showWeather, setShowWeather] = useState(false)

    useEffect(() => {
        let getLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${capital},${code}&appid=${api_key}`
        axios
          .get(getLatLon)
          .then(response => {
            console.log('got lat and lon')
            setCity([response.data[0].lat, response.data[0].lon])
          })
      }, [])

      useEffect(() => {
        let getWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${city[0]}&lon=${city[1]}&units=metric&appid=${api_key}`
        axios
          .get(getWeather)
          .then(response => {
            console.log(response.data, 'found weather fulfilled')
            setWeather(response.data)
            setShowWeather(true)
          })
          
      }, [city])

    const api_key = process.env.REACT_APP_API_KEY
    const name = country.name.common
    const capital = country.capital[0]
    const code = country.cca2
    const area = country.area
    const flag = country.flags.png
    const languages = Object.values(country.languages)
    
    return (
      <div>
        <h1>{name}</h1>
        <div>
          capital {capital}
        </div>
        <div>
          area {area}
        </div>
        <br/>
        <b>Languages</b>
        <ul>
          {languages.map(lang => <li>{lang}</li>)}
        </ul>
        <img src={flag}/>
        <h2>Weather in {capital}</h2>
        <div>
            {showWeather && (
                <div>
                    <div>temperature: {weather.main.temp} Celcius </div>
                    <div><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></div>
                    <div>wind: {weather.wind.speed} m/s </div>
                </div>
            )
            }
        </div>

      </div>  
    )
  }

  export default Country;