import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} className="btn btn-primary">
      {props.text}
    </button>
  )
}
const Display = ({name, value}) => {

if (name ==="Positive"){
  return (
    <tr>
    <td> {name} </td>
    <td> {value} % </td>
  </tr>
  )
}

return (
  <tr>
    <td> {name} </td>
    <td> {value} </td>
  </tr>
)

}

const Statistics = (props) => {
  const good = props.values[0]
  const neutral = props.values[1]
  const bad = props.values[2]
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100
  if (total === 0){
    return (
    <div>
      No Feedback Given
    </div>
    )
  }

  return (<table className="table">
            <tbody>
              <Display name= "Good" value = {good}/>
              <Display name= "Neutral" value = {neutral}/>
              <Display name= "Bad" value = {bad}/>
              <Display name= "All" value = {total}/>
              <Display name= "Average" value = {average}/>
              <Display name= "Positive" value = {positive}/>
            </tbody>
          </table>
         
  )
}

const Anecdote = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0 ,0])
  //const [maxInd, setMaxInd] = useState(0)
  const max = Math.max(...votes)
  const maxIndex = votes.indexOf(max); 

  const newRandom = () => {
    let newInt = Math.floor(Math.random() * (anecdotes.length))
    while (newInt === selected){
      newInt = Math.floor(Math.random() * (anecdotes.length))
    }
    setSelected(newInt)
  }

  const voteFor = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  return (
    <div>
      <h1 className="fw-light">
            Anecdote of the Day
      </h1>
      <Button text = "New Anecdote" handleClick={newRandom}/>
      <Button text = "Vote" handleClick={voteFor}/>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes.
      </div>
      <h1 className="fw-light">
            Anecdote with the most votes
      </h1>
      <div>
        {anecdotes[maxIndex]}
      </div>
      <div>
        has {votes[maxIndex]} votes.
      </div>
    </div>
    
  )
}

const App = () => {
 

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good+1)
  }
  const addNeutral = () => {
    setNeutral(neutral+1)
  }
  const addBad = () => {
    setBad(bad+1)
  }


  return (
    <div className="text-center p-5 container">
      <div className="row">
        <div className ="col">
          <h1 className="fw-light">
            Give Feedback
          </h1>
          <Button text = "Good" handleClick={addGood}/>
          <Button text = "Neutral" handleClick={addNeutral}/>
          <Button text = "Bad" handleClick={addBad}/>
          <br /> <br />
          <h1 className="fw-light">
            Statistics
          </h1>
          <Statistics values = {[good,neutral,bad]}/>
          <br />
          <Anecdote />
        </div>
      </div>
    </div>
  )
}

export default App