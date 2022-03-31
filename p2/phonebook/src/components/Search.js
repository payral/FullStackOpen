
const Search = (props) => {

    return (
        <div>
        filter by name: <input value = {props.val} onChange = {props.handler} />
      </div> 
    )
  }

  export default Search