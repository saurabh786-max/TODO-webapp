import React, { useEffect } from 'react'
import { FaCheck, FaPenAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { RiDeleteBin7Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { createTask, deleteTask, getAllTasks, updateTask } from './api.js';
import { notify } from './utils.js';

const TaskManager = () => {
    const [Input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const handleAddTask = async () => {
        const obj = {
            taskName: Input,
            isDone: false
        }
        console.log(obj)
        try {
            const res = await createTask(obj);

        console.log("Task created:", res);
        setInput(""); // clear input after adding

        if (res.success) {
            notify(res.message, "success");
            fetchAllTasks();
        } else {
            notify(res.message, "error");
        }
        } catch (err) {
            console.log("Error creating task:", err);
            notify("failed to create task ","error")
        }
    }
    const fetchAllTasks =async ()=>{
       try {
         const {data} = await getAllTasks();
         setTasks(data);
         console.log(data);
         
       } catch (error) {
        console.log(error);
         notify("failed to fetch tasks ","error");
       }
    }
    useEffect(()=>{
        fetchAllTasks()
    },[])
    const handleDeletetask = async(id)=>{
        try {
            const res =  await deleteTask(id);
            if (res.success) {
                notify(res.message, "success");
                fetchAllTasks();
            } else {
                notify(res.message, "error");
            }
        } catch (error) {
            console.log("error in deleting task:", err);
            notify("failed to delete task ","error")
        }
    }
    const handleEditTask = async (items)=>{
           const {_id,taskName,isDone}= items;
           const obj ={
            taskName,
            isDone:!isDone
           }
           try{
            const{success,message} = await updateTask(_id,obj);
            if(success){
                notify(message,"success")
            }
            else{
                notify(message,"error")
            }
            fetchAllTasks()
           }
           catch(err){
            console.log(err);
            notify("failed to create task", "error")
           }
    }
    return (
        <div className="flex flex-col items-center gap-10 min-h-screen p-4">
            {/* Title */}
            <h1 className="text-4xl text-center">Task Manager App</h1>

            {/* Input + Search Box */}
            <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-3 w-full max-w-2xl">
                {/* Add Task */}
                <div className="flex w-full sm:w-auto">
                    <input
                        type="text"
                        value={Input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border border-r-0 text-center rounded-l w-full sm:w-48"
                        placeholder="add task"
                    />
                    <button
                        onClick={handleAddTask}
                        className="border rounded-t-none h-11 w-12 flex items-center justify-center bg-green-500 text-white cursor-pointer  hover:bg-green-600 ">
                        <FaPlus />
                    </button>
                </div>

                {/* Search Task */}
                <div className="flex w-full sm:w-auto">
                    <span>
                        <FaSearch className="h-10 w-10 bg-gray-400 border border-r-0 rounded-l p-2" />
                    </span>
                    <input
                        type="text"
                        className="border p-1 border-l-0 rounded-r w-full sm:w-48"
                        placeholder="search task"
                    />
                </div>
            </div>

            {/* Task List */}
            {
                tasks.map((items)=>(
                    <div 
                    key={items._id}
                    className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl bg-gray-50 p-2 rounded shadow">
                {/* Task text */}
                <span className={`border p-2 flex-1  bg-gray-200 text-center sm:text-left ${items.isDone ?'line-through':''}`}>
                    {items.taskName}
                </span>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <button
                    onClick={()=>{handleEditTask(items)}}
                    >
                        <FaCheck className="bg-green-400 p-2 w-10 h-10 border" />
                    </button>
                    <button>
                        <FaPenAlt className="border p-2 w-10 h-10" />
                    </button>
                    <button onClick={()=>{handleDeletetask(items._id)}} >
                        <RiDeleteBin7Line className="border p-2 w-10 h-10 bg-red-400" />
                    </button>
                </div>
            </div>
                ))
            }
            <ToastContainer/>
        </div>
    );
}

export default TaskManager;
