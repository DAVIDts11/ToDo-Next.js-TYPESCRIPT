import { TodoType } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"

// Define Prop Interface
interface ShowProps {
  todo: TodoType
  url: string
  userName: string
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter()

  // set the todo as state for modification
  const [todo, setTodo] = useState<TodoType>(props.todo)
  const [isComplete,setIsComplit] = useState<Boolean>(todo.completed)

  // function to complete a todo
  const handleComplete = async () => {
    let newTodo: TodoType 
    let complited: Boolean = isComplete
    if (!isComplete) {
        newTodo = { ...todo, completed: true }
        complited = true
    }
    else
    {
        newTodo = { ...todo, completed: false}
        complited = false
    }
      // make api call to change completed in database
      await fetch(props.url + "/" + todo._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        // send copy of todo with property
        body: JSON.stringify(newTodo),
      })
      
      setIsComplit(complited)
      // once data is updated update state so ui matches without needed to refresh
      setTodo(newTodo)
    
    // if completed is already true this function won't do anything
  }

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + "/" + todo._id + "?userName=" + props.userName, {
      method: "delete",
    })
    //push user back to main page after deleting
    router.push({pathname: "/todos/allUserToDos",query: {userName: props.userName}})
  }

  //return JSX
  return (
    <div>
      <h1>{todo.item}</h1>
      <h2>{isComplete ? "completed" : "incompleted"}</h2>
      <button onClick={handleComplete}>{isComplete ?  "Uncomplete" : "Complete"}</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push({pathname: "/todos/allUserToDos",query: {userName: props.userName}})
        }}
      >
        Go Back
      </button>
    </div>
  )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  const userName : string = context.query.userName
  // fetch the todo, the param was received via context.query.id
  const res = await fetch(process.env.API_URL + "/" + context.query.id + "?userName=" + userName)
  const todo = await res.json()

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { todo, url: process.env.API_URL,userName: userName } }
}

// export component
export default Show