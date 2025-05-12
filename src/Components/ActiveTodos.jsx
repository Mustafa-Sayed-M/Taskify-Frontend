import { useMemo } from "react";
import TodoCard from "./TodoCard/TodoCard";

function ActiveTodos({ className = "", todosIsLoading, todos }) {

    const activeTodosList = useMemo(() => {
        if (!todosIsLoading) {
            return todos.filter((t) => !t.isCompleted);
        } else {
            return [];
        }
    }, [todosIsLoading, todos]);

    return (
        <div className={`active-todos ${className}`}>
            {/* Label */}
            <h2 className="mb-3 font-bold text-xl">
                <i className="fa-regular fa-circle fa-fw me-2"></i>
                <span>Active Todos</span>
            </h2>
            {/* Todos Items */}
            <div className="todos-items space-y-3">
                {
                    todosIsLoading ? (
                        <>Loading...</>
                    ) : activeTodosList.length === 0 ? (
                        <p className="text-center opacity-50">No todos added yet.</p>
                    ) : (
                        activeTodosList.map((todo, index) => (<TodoCard
                            key={index}
                            todoData={todo}
                        />))
                    )
                }
            </div>
        </div>
    )
}

export default ActiveTodos;