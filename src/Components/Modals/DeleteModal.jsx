import { useState } from 'react';
import { useTodos } from '../../Context/TodosContext';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';

function DeleteModal() {

    const { user } = useUser();

    const { deleteTodo: { isDelete, todoId }, setDeleteTodo } = useTodos();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const handleCancel = () => {
        if (!isSubmitting) {
            setDeleteTodo(prev => ({ ...prev, isDelete: false }))
        }
    };

    const handleDelete = async () => {
        if (!isSubmitting) {
            try {
                setIsSubmitting(true);
                const response = await fetch(`${import.meta.env.VITE_TODOS_API}?userEmail=${user?.primaryEmailAddress?.emailAddress}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        todoId
                    })
                });
                const data = await response.json();

                // Checking from response
                if (!response.ok) {
                    // Show error message:
                    return;
                }

                // Update query
                queryClient.setQueryData(['todos'], old => {
                    if (!old) return old;
                    return {
                        ...old,
                        todos: old.todos.filter(todo => todo._id !== data.todo._id)
                    };
                });
                // Show success message
            } catch (e) {
                console.log(e);
            } finally {
                setIsSubmitting(false);
                handleCancel();
            }
        }
    };

    return (
        <div
            onClick={handleCancel}
            className={`delete-modal min-h-[calc(100vh-72px)] flex items-center w-full fixed z-50 top-[72px] left-0 bg-black/40 backdrop-blur-sm transition ${isDelete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className='container'>
                <div
                    onClick={e => e.stopPropagation()}
                    className={`confirmation-box p-5 rounded-md bg-[#181818] mx-auto md:max-w-[500px]`}
                >
                    {/* Message */}
                    <p className='text-center mb-3'>Are you sure from delete this todo?</p>
                    {/* Actions */}
                    <div className='flex items-center gap-2'>
                        {/* Cancel */}
                        <button
                            type='button'
                            disabled={isSubmitting}
                            onClick={handleCancel}
                            className='bg-white text-[#181818] font-medium py-2 px-4 rounded-md w-full'
                        >
                            Cancel
                        </button>
                        {/* Delete */}
                        <button
                            type='button'
                            disabled={isSubmitting}
                            onClick={handleDelete}
                            className='bg-red-700 font-medium py-2 px-4 rounded-md w-full'
                        >
                            {
                                isSubmitting && <i className='fa-solid fa-spinner animate-spin fa-fw me-2'></i>
                            }
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;