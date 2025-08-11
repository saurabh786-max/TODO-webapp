import { Task } from "../models/tasks.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create task
// 1. take the data from req.body
// 2.check if the data is loaded successfuly
// 3.response the created user  data 

const createTask = asyncHandler(async (req, res) => {
  const { taskName, isDone } = req.body;

  const tasks = await Task.create({
    taskName,
    isDone,
  });
  if(!tasks){
    throw new apiError(402,"unable to read task data")
  }

  const createdTask = await Task.findById(tasks._id);
  if(!createdTask){
    throw new apiError(402,"unable to create task ")
  }

  res.status(201).json({
    success: true,
    data: createdTask,
    message:"task created successfully"
  });
});

// print all tasks
// 1. use a mongodb function find with only empty object that will print all the available data in the collection 

const allTasks = asyncHandler(async(req,res)=>{
  const data = await Task.find({})

  if(!data){
    throw new apiError(402,"error in fetching the data")
  }
   
  res.status(201)
  .json(
    new apiResponse (201,
      data,
      "fetched successfully "
    )
  )

})

// update all tasks 
// 1.we have to pass the id to the url params 
// 2.to extract that id from the param we have to use req.params
// 3. After extacting use it in the function findbyIdAndUpdate and use the put method in the routes and print the response

const updateTasks = asyncHandler(async (req,res)=>{
  const {taskName,isDone} = req.body;
  const {id} = req.params;
   const data = await Task.findByIdAndUpdate(id,
    {
      $set:{
        taskName,
        isDone
      },
      
    },
    {
      new:true
    }
   )
   res.status(200)
   .json(new apiResponse(200,data,"this data is updated successfuly !!"))
})

// delete the tasks
// 1. here also we send id to the params of URL and then extract it using req.params 
// 2.after extracting we use mongodb function findbyIdAndDelete and then print the response
const deleteTasks = asyncHandler(async (req,res)=>{
  const {id} = req.params;
 const data = await Task.findByIdAndDelete(id);

 res.status(200)
 .json( new apiResponse(200,data,"this data is deleted successfully"))
})

export { createTask ,
  allTasks,
  updateTasks,
  deleteTasks
};
