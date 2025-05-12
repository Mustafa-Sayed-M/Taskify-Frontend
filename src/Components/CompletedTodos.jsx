import { useMemo } from "react";
import TodoCard from "./TodoCard/TodoCard";

function CompletedTodos({ className = "", todosIsLoading, todos }) {

    const completedTodosList = useMemo(() => {
        if (!todosIsLoading) {
            return todos.filter((t) => t.isCompleted);
        } else {
            return [];
        }
    }, [todosIsLoading, todos]);


    return (
        <div className={`completed-todos ${className}`}>
            {/* Label */}
            <h2 className="mb-3 font-bold text-xl">
                <i className="fa-solid fa-check fa-fw me-2"></i>
                <span>Completed Todos</span>
            </h2>
            {/* Todos Items */}
            <div className="todos-items space-y-3">
                {
                    todosIsLoading ? (
                        <>Loading...</>
                    ) : completedTodosList.length === 0 ? (
                        <p className="text-center opacity-50">No todos completed yet.</p>
                    ) : (
                        completedTodosList.map((todo, index) => (<TodoCard
                            key={index}
                            todoData={todo}
                        />))
                    )
                }
            </div>
        </div>
    )
}

export default CompletedTodos;