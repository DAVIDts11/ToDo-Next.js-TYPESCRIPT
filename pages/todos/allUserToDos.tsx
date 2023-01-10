// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import { TodoType } from "../../utils/types"
import Link from "next/link"

// Define the components props
interface AllToDosProps {
  todos: Array<TodoType> 
  userName: string
}

// define the page component
function AllToDos(props: AllToDosProps ) {
    const { todos } = props
    const userName:string = props.userName

    if (typeof window !== 'undefined'){
        localStorage.setItem('userName',userName ); 
    }

    return (
      <div>
        <h1>Hello {userName} </h1>
        <h2> You have {todos.filter(todo => (todo.completed === false)).length.toString()} uncomplited todos</h2>
        <h2>Click On Todo to see it individually</h2>
        
       {todos.length>0 && <h3><b> List of todos: </b></h3>}
       {/* MAPPING OVER THE TODOS */}
       {todos.map(t => (
          <div key={t._id}>
            <Link href={{pathname: `/todos/${t._id}`,query: {userName: userName}}}>
              <h3 style={{ cursor: "pointer" }}>
                {t.item} - {t.completed ? "completed" : "incomplete"}
              </h3>
            </Link>
          </div>
        ))}    
      <Link href="/todos/create"><button>Add Todo</button></Link>
      <Link href="/"><button>Switch User</button></Link>
      </div>
    )
}
  
  
// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps({query}) {

    const {userName} = query
    // get todo data from API
    const res = await fetch(process.env.API_URL + "?userName="+userName)
    const todos = await res.json()

    // return props
    return {
        props: { todos ,userName },
    }
}

export default AllToDos

