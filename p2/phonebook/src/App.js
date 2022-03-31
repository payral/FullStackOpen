import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'
import Notification from './components/Notification'
import phoneService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'people')
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name === newName && person.number === newNumber) !== -1 ) {
      setErrorMessage(
        `${newName} is already in the Phonebook.`
      )
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    else if (persons.findIndex(person => person.name === newName !== -1)) {
      if (window.confirm(`${newName} is already in the Phonebook, replace the old number with a new one?`)) {
        const personChange = persons.find(person => person.name === newName)
        const changedNum = {...personChange, number:newNumber}
        phoneService.update(personChange.id, changedNum)
          .then(response => {console.log("Updated", response)
          setPersons(persons.map(person => personChange.name === person.name ? response : person))}
          )
        setNewName("")
        setNewNum("")
        return
      }

    }
    
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    
    phoneService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
      })
      setNewName("")
      setNewNum("")
      setErrorMessage("Added " + newName)
      setIsError(false)
  }

  const [newSearch, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleSearch = (event) => {
    setSearch(event.target.value)
    if(event.target.value === "") {
      setShowAll(true)
    }
    else{
      setShowAll(false)
    }
  }
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
      setNewNum(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Search val={newSearch} handler={handleSearch}/>
      <br/>
        <Notification message={errorMessage} isError={isError} />
        <Form handler={addPerson} 
          name={newName} handleName={handleNameChange} 
          number={newNumber} handleNumber={handleNumChange}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} />
    </div>
  )
}

export default App