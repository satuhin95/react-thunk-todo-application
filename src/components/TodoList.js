import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Footer from "./Footer";
import Todo from "./Todo";

const numberOfTodos = (no_of_todos) => {
    switch (no_of_todos) {
        case 0:
            return "No task";
        case 1:
            return "1 task";
        default:
            return `${no_of_todos} tasks`;
    }
};

export default function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const todosIncomplete = todos.filter((todo) => !todo.completed).length;
    const todosComplete = todos.filter((todo) => todo.completed).length;

    useEffect(() => {
      dispatch(fetchTodos)
    }, [dispatch])
    

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    const filterByComplateed = (todo) => {
        return todo.completed;
    };
    const filterByIncomplateed = (todo) => {
        return !todo.completed;
    };

    return ( 
       <>
         <div className="incompate-tase">
            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            <h2 className="text-center" >Incompleted Tasks</h2>
                {todos
                    .filter(filterByStatus)
                    .filter(filterByColors)
                    .filter(filterByIncomplateed)
                    .map((todo) => (
                        <Todo todo={todo} key={todo.id} id={todo.id} />
                    ))}
            </div>
             <Footer completeStatus={numberOfTodos(todosIncomplete)}/>
         </div>
         <div className="complate-task">
            <div className="mt-10 text-gray-700 text-sm max-h-[300px] overflow-y-auto ">
                <h2 className="text-center" >Completed Tasks</h2>
                {todos
                    .filter(filterByStatus)
                    .filter(filterByColors)
                    .filter(filterByComplateed)
                    .map((todo) => (
                        <Todo todo={todo} key={todo.id} />
                    ))}
            </div>   
          <Footer completeStatus={numberOfTodos(todosComplete)}/>     
         </div>
       </>
    );
}
