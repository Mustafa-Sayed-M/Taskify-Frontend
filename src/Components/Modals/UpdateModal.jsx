import { useEffect, useState } from 'react';
import { useTodos } from '../../Context/TodosContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/clerk-react';

function UpdateModal() {

    const { user } = useUser();

    const { updateTodo: { isUpdate, todoId, oldValue }, setUpdateTodo } = useTodos();
    const [newValue, setNewValue] = useState(oldValue);
    useEffect(() => { // Update new value when old value changed
        setNewValue(oldValue);
    }, [oldValue]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const toastErrorId = 'update-error';

    const handleCancel = () => {
        if (!isSubmitting) {
            toast.dismiss(toastErrorId)
            setUpdateTodo(prev => ({ ...prev, isUpdate: false }))
        }
    };

    const handleUpdate = async () => {
        if (!isSubmitting) {
            if (newValue === oldValue) {
                // Show info message:
                if (!toast.isActive(toastErrorId)) {
                    toast.info("Must different value", {
                        position: 'bottom-left',
                        theme: 'dark',
                        toastId: toastErrorId
                    });
                }
                return;
            };

            try {
                setIsSubmitting(true);
                toast.dismiss(toastErrorId);
                const response = await fetch(`${import.meta.env.VITE_TODOS_API}?userEmail=${user?.primaryEmailAddress?.emailAddress}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        todoId,
                        updatedFields: {
                            title: newValue
                        }
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
                    const newTodos = old.todos.map((todo) => {
                        if (todo._id === data.todo._id) {
                            return { ...todo, ...data.todo };
                        } else {
                            return todo;
                        }
                    });
                    return {
                        ...old,
                        todos: newTodos
                    };
                });
                // Show success message
                toast.success("Todo updated successfully", {
                    position: 'bottom-left',
                    theme: 'dark'
                });
            } catch (e) {
                console.log(e);
            } finally {
                setIsSubmitting(false);
                handleCancel();
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const enhancedValue = value.trim();
        if (enhancedValue) {
            setNewValue(enhancedValue);
        } else {
            e.target.value = '';
            setNewValue(null);
        }
    };

    return (
        <div
            onClick={handleCancel}
            className={`delete-modal min-h-[calc(100vh-72px)] flex items-center w-full fixed z-50 top-[72px] left-0 bg-black/40 backdrop-blur-sm transition ${isUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className='container'>
                <div
                    onClick={e => e.stopPropagation()}
                    className={`confirmation-box p-5 rounded-md bg-[#181818] mx-auto md:max-w-[500px]`}
                >
                    {/* Message */}
                    <p className='text-center mb-4'>Update your todo</p>
                    {/* Update Input */}
                    <input
                        required
                        type="text"
                        id="addTodo"
                        name="todo_title"
                        defaultValue={oldValue}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        placeholder={'Update your todo'}
                        className="w-full mb-4 p-4 flex-1 bg-[#101010] rounded-full shadow-md placeholder:transition-opacity focus:placeholder:opacity-0"
                    />
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
                            onClick={handleUpdate}
                            className='bg-yellow-500 text-[#181818] font-medium py-2 px-4 rounded-md w-full'
                        >
                            {
                                isSubmitting && <i className='fa-solid fa-spinner animate-spin fa-fw me-2'></i>
                            }
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal;