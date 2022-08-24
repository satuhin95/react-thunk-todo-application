import { update } from "../actions";
const updateTodo = (todoId, todoText)=>{
    return async( dispatch)=>{
        const response = await fetch(`http://localhost:9000/todos/${todoId}`,{
            method:"PATCH",
            body:JSON.stringify({
                text:todoText
            }),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        });
        const todo = await response.json();
    
        dispatch(update(todo.id, todo.text))
    }
}
export default updateTodo;