import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef } from "react"
import { TodoType } from "../../utils/types"

// Define props
interface CreateProps {
  url: string
}

// Define Component
function Create(props: CreateProps) {
  // get the next route
  const router = useRouter()

  // since there is just one input we will use a uncontrolled form
  const item = useRef<HTMLInputElement>(null)
  
  let userName: string | null;
  if (typeof window !== 'undefined') {
      userName = localStorage.getItem('userName');
  }
  // Function to create new todo
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new todo, create variable, check it item.current is not null to pass type checks
    let todo: TodoType = { item: "", completed: false }
    if (null !== item.current) {
      todo = { item: item.current.value, completed: false }
    }

    // Make the API request
    await fetch(props.url+"?userName="+userName, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })

    // after api request, push back to main page
    router.push({pathname: "/todos/allUserToDos",query: {userName: userName}})
  }

  return (
    <div>
      <h1>Create a New Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={item}></input>
        <input type="submit" value="create todo"></input>
      </form>
      <button
        onClick={() => {
          router.push({pathname: "/todos/allUserToDos",query: {userName: userName}})
        }}
      >
        Go Back
      </button>
    </div>
  )
}

// export getStaticProps to provie API_URL to component
export async function getStaticProps({query}) {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

// export component
export default Create