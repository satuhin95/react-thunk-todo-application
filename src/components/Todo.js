import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import pencilImage from "../assets/images/pencil.png";
import updatedStatus from "../redux/todos/thunk/updatedStatus";
import updateColor from "../redux/todos/thunk/updateColor";
import deleteTodo from "../redux/todos/thunk/deleteTodo";
import updateTodo from "../redux/todos/thunk/updateTodo";
import { useState } from "react";
export default function Todo({ todo }) {
    const dispatch = useDispatch();
    const [toggleInput, setToggleInput ] = useState(true)
    const [todoText, setInput] = useState("");
    const { text, id, completed, color } = todo;
  
    const handleStatusChange = (todoId) => {
        dispatch(updatedStatus(todoId,completed));
    };

    const handleColorChange = (todoId, color) => {
        dispatch(updateColor(todoId, color));
    };

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
    };
   
    const handleEdit = (textTodo) => {
        setInput(textTodo)
         setToggleInput(false);
    };
    const handleInputText = (value) => {
        setInput(value);
    };
  
    const updateHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(updateTodo(id,todoText));
            setToggleInput(true);
        }     
    };
    
    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

                {completed?(
                <div className="select-none flex-1 line-through"  >
                     {text}
                 </div>
                ):(
                    <div className="select-none flex-1 " >
                     {toggleInput && (<p>{text}</p>)}
                     {!toggleInput && (
                        <input type="text" onKeyDown={updateHandler} onChange={(e)=>handleInputText(e.target.value)}   className=" py-2 border-none"   value={todoText} />

                     )}
                     
                 </div>
                ) } 

 
           
            {!completed && (
                 <img
                 src={pencilImage}
                 className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                 alt="Cancel"

                 onClick={ ()=>handleEdit( text)}
             />
            )}
           

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
