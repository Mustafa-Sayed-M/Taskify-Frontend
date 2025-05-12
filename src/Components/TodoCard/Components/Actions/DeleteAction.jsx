import React from 'react';
import ActionComponent from './Components/ActionComponent';
import { useTodos } from '../../../../Context/TodosContext';

function DeleteAction({ todoId }) {

    const { setActionsTodoActive, setDeleteTodo } = useTodos();

    const handleClick = () => {
        setActionsTodoActive(null);
        setDeleteTodo(prev => ({ ...prev, isDelete: true, todoId: todoId }))
    };

    return (
        <ActionComponent
            text="Delete Todo"
            className="text-red-500"
            icon="fa-solid fa-trash-can fa-fw"
            handleClick={handleClick}
            {...{
                'aria-label': "Delete Todo",
                title: 'Delete Your Todo',
                disabled: false
            }}
        />
    )
}

export default DeleteAction;