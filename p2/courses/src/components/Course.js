import React from "react"

const Header = ({name}) => 
<>
    <h2>{name}</h2>
</>

const Content = ({parts}) => {
    const sum = parts.reduce((sum , part) => sum + part.exercises, 0)
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part}/>
            )}
        <b>total of {sum} exercises</b>
            
        </div>
        
    )
}

const Part = ({part}) => {
    return (
        <p>
        {part.name} {part.exercises}
        </p>
    )
}
    


const Course = ({course}) => {

    return (
        <div>
            <Header name = {course.name}/>
            <Content parts = {course.parts}/>
        </div>
    )
}
export default Course