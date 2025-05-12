import React from "react";
const TodosContext = React.createContext();

export const TodosContextProvider = ({ children }) => {

    const [actionsTodoActive, setActionsTodoActive] = React.useState(null);
    const [updateTodo, setUpdateTodo] = React.useState({
        isUpdate: false,
        oldValue: null,
        todoId: null
    });
    const [deleteTodo, setDeleteTodo] = React.useState({
        isDelete: false,
        todoId: null
    });

    return (
        <TodosContext.Provider
            value={{
                actionsTodoActive, setActionsTodoActive,
                updateTodo, setUpdateTodo,
                deleteTodo, setDeleteTodo
            }}
        >
            {/* Children */}
            {children}
        </TodosContext.Provider>
    )
};

export const useTodos = () => React.useContext(TodosContext);