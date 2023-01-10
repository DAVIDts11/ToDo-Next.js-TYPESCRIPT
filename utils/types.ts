import { Types } from 'mongoose';

// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
  }
  
  // Interface to define our Todo model on the frontend
  export interface TodoType {
    _id?: number
    item: string
    completed: boolean
  }

//Interface to define our User model
export interface UserType {
    _id?: Types.ObjectId
    userName: string
    todos: Array<Types.ObjectId> 
  }
