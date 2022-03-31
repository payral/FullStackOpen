const Notification = ({ message, isError }) => {

    const errorStyle =  {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }
      const goodStyle =  {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }

    if (message === null) {
      return null
    }
  
    if (isError) {return (
      <div style={errorStyle}>
        {message}
      </div>
    )}
    else{
        return (
            <div style={goodStyle}>
                {message}
            </div>
        )
    }
  }

  export default Notification