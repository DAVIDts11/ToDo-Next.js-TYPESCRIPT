import mongoose ,{Types} from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs , UserType ,TodoType} from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const userName : string = req.query.userName as string ; 
      const { Todo , User } = await connect() // connect to database
      User.findOne({userName:userName}, async function  (err, result) {
        if (err) {catcher(err)}
        if (!result) {
           const newUser:UserType = {
                userName,
                todos:[]
           }
           await User.create(newUser).catch(catcher)
           res.json([])
        }
        else{
            res.json((await result.populate("todos")).todos)
        }
    })
    },

    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const userName : string = req.query.userName as string ; 
      const { Todo , User } = await connect() // connect to database
      let todoId: Types.ObjectId |null =null;
      await Todo.create(req.body).then((todo) =>{todoId = todo._id }).catch(catcher)
      res.json( await User.updateOne(
        { userName: userName }, 
        { $addToSet: { todos: todoId } }
      ))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) {
    await response(req, res);
    console.log('res v res res res');
  }
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler