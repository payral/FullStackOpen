import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css';
import noteService from './services/notes'


const CountryList = ({countries, search}) => {

  const countryFilter = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (search === ""){
    return <div></div>
  }

  if (countryFilter.length > 10){
    return <div>Too many matches, specify another filter</div>
  }

  if (countryFilter.length < 10){
    return (<CountryShower countries={countryFilter} />)
  }

}

const CountryShower = ({countries}) => {

  const [countryToShow, setCountry] = useState(countries[0])
  const [show, setShow] = useState(false)

  const handleClick = ({country}) => {
    setShow(!show)    
    setCountry(country)
  }

  return (
    <div>
      {countries.map(country => 
      <div key={country.name.common}> {country.name.common}
        <button onClick={() => handleClick({country})}>show</button>
      </div>)}
      {show && (<Country key={countryToShow.name.common} country={countryToShow} />)}
    </div>
  )
}


const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  
  return (
    <div>
      Find Country: <input value={filter} onChange={handleFilter}/>
      <div>
      <CountryList countries={countries} search={filter}/>
      </div>
    </div>
  )
}

export default App;
