import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

function AddTodo({ className = "", todos }) {

    const { user } = useUser();

    const todosLength = todos.length;

    const [titleValue, setTitleValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titleValue && !isSubmitting) {
            try {
                setIsSubmitting(true);
                const response = await fetch(`${import.meta.env.VITE_TODOS_API}?userEmail=${user?.primaryEmailAddress?.emailAddress}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: titleValue
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
                        todos: [...old.todos, data.todo]
                    };
                });

                // Reset Title Value
                setTitleValue('');
            } catch (e) {
                console.log(e);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const handleChange = useCallback((e) => {
        const value = e.target.value;
        const enhancedValue = value.trim();
        if (enhancedValue) {
            setTitleValue(value);
        } else {
            e.target.value = '';
            setTitleValue('');
        }
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className={`add-todo flex gap-3 ${className}`}
        >
            <input
                required
                type="text"
                id="addTodo"
                name="todo_title"
                value={titleValue}
                disabled={isSubmitting}
                onChange={handleChange}
                placeholder={todosLength === 0 ? 'Add your first todo' : 'Add a new todo...'}
                className="p-4 flex-1 bg-[#181818] rounded-full shadow-md placeholder:transition-opacity focus:placeholder:opacity-0"
            />
            {/* Submit */}
            <button
                title={isSubmitting ? 'Loading...' : 'Add'}
                disabled={isSubmitting}
                className="w-[56px] text-xl rounded-full bg-yellow-500 text-[#181818] shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <i className={`fa-solid fa-${isSubmitting ? 'spinner animate-spin' : 'plus'} fa-fw`}></i>
            </button>
        </form>
    )
}

export default AddTodo;
