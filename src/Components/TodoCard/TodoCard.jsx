import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TodoActions from "./Components/TodoActions";
import { useUser } from "@clerk/clerk-react";

function TodoCard({ todoData: { _id, title, isCompleted, isFeatured, createdAt } }) {

    const todoDate = new Date(createdAt);

    const { user } = useUser();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    // Handle Complete
    const handleTodoComplete = async (e, todoId) => {
        const newIsCompleted = e.target.checked;
        if (!isSubmitting) {
            try {
                setIsSubmitting(true);
                const response = await fetch(`${import.meta.env.VITE_TODOS_API}?userEmail=${user?.primaryEmailAddress?.emailAddress}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        updatedFields: {
                            isCompleted: newIsCompleted
                        },
                        todoId
                    })
                });
                const data = await response.json();

                if (!response.ok) {
                    console.error("Update failed:", data.message);
                    return;
                }

                queryClient.setQueryData(['todos'], old => {
                    if (!old) return old;
                    return {
                        ...old,
                        todos: old.todos.map(todo =>
                            todo._id === _id ? { ...todo, isCompleted: newIsCompleted } : todo
                        )
                    };
                });
            } catch (e) {
                console.log(e);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className={`todo-card transition-opacity flex items-center gap-3`}>
            {/* Main Content */}
            <div className={`p-3 rounded-md bg-[#181818] shadow-md flex items-center gap-2 w-full  ${isCompleted ? "opacity-70" : ""}`}>
                {/* Complete Input */}
                <label
                    htmlFor={_id}
                    className="checkbox-box w-5 h-5 leading-5 text-center rounded-sm cursor-pointer"
                >
                    <input
                        id={_id}
                        name="completed"
                        type="checkbox"
                        onChange={(e) => handleTodoComplete(e, _id)}
                        defaultChecked={isCompleted}
                        className="hidden peer"
                    />
                    <i className={`fa-${isSubmitting || isCompleted ? 'solid' : 'regular'} fa-${isSubmitting ? 'spinner animate-spin' : isCompleted ? 'check' : 'circle'} fa-fw text-yellow-500`}></i>
                </label>
                {/* Title */}
                <label
                    htmlFor={_id}
                    className={`cursor-pointer font-semibold flex-1 ${isCompleted ? 'line-through' : ''}`}
                >{title}</label>
                {/* Created At */}
                <p className="opacity-60 ms-4 text-sm max-md:hidden">{todoDate.toLocaleDateString('en', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
                <p className="opacity-60 ms-4 text-sm md:hidden">{todoDate.toLocaleDateString('en', {
                    hour: '2-digit',
                    minute: '2-digit'
                }).split(',')[1]}</p>
            </div>
            {/* Todo Actions */}
            <TodoActions
                todoId={_id}
                title={title}
                isFeatured={isFeatured}
            />
        </div>
    )
}

export default TodoCard;