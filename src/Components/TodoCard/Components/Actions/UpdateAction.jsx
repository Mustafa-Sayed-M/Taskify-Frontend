import React from 'react';
import ActionComponent from './Components/ActionComponent';
import { useTodos } from '../../../../Context/TodosContext';

function UpdateAction({ todoId, oldValue }) {

    const { setUpdateTodo, setActionsTodoActive } = useTodos();

    const handleCLick = () => {
        setActionsTodoActive(null);
        setUpdateTodo(prev => ({ ...prev, isUpdate: true, todoId, oldValue }))
    };

    return (
        <ActionComponent
            text="Update Todo"
            className="text-green-500"
            icon="fa-solid fa-edit fa-fw"
            handleClick={handleCLick}
            {...{
                'aria-label': "Update Your Todo",
                title: 'Update Your Todo',
                disabled: false
            }}
        />
    )
}

export default UpdateAction;