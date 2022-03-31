import phoneService from '../services/phonebook'
import { useState, useEffect } from 'react'

const Person = ({person}) => {
    const [showPerson, setShow] = useState(true)

    const deletePerson = (person) => {
      window.confirm("Delete " + person.name + "?")
      phoneService
      .remove(person)
      .then(setShow(false))
      
      
    }

    return (
      showPerson && (
      <div>
        {person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button>
      </div>)
    )
  }

  export default Person