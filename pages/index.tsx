// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import { Todo } from "../utils/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  todos: Array<Todo>
}

// define the page component
function Index(props: IndexProps) {
  const { todos } = props
  const uncompitedToDos: String = todos.filter(todo => (todo.completed === false)).length.toString()

  //Array.isArray(todos) && 
  return (
    <div>
      <h1>Hello David </h1>
      <h2> You have {uncompitedToDos} uncomplited todos</h2>
      <h2>Click On Todo to see it individually</h2>
      
     {todos.length>0 && <h3><b> List of todos: </b></h3>}
     {/* MAPPING OVER THE TODOS */}
     {todos.map(t => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}    
    <Link href="/todos/create"><button>Add Todo</button></Link>

    </div>
  )}


// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string)
  const todos = await res.json()
  
  // return props
  return {
    props: { todos },
  }
}

export default Index