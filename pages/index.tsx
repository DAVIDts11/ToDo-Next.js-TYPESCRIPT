
import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef } from "react"

// define the page component
function Index() {
    // get the next route
    const router = useRouter()

    // since there is just one input we will use a uncontrolled form
    const item = useRef<HTMLInputElement>(null)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    let userName: string = ""
    if (null !== item.current) {
        userName = item.current.value
        console.log('userName = index== ',userName);
    }

    // after get the name  push to user todos page
    router.push({ pathname: "/todos/allUserToDos", query: { userName: userName }})
  }

    return (
      <div>
        <h1>Hello </h1>
        <div>
            <h2>What is your name ?</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={item}></input>
                <input type="submit" value="Show my todos"></input>
            </form>
        </div>

      </div>
    )}
  
export default Index
