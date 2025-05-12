import { useEffect, useRef } from "react";
import { useTodos } from "../../../Context/TodosContext";
import DeleteAction from "./Actions/DeleteAction";
import FeaturedAction from "./Actions/FeaturedAction";
import UpdateAction from "./Actions/UpdateAction";

function TodoActions({ todoId, isFeatured, title }) {

    const actionsListRef = useRef(null);
    const { actionsTodoActive, setActionsTodoActive } = useTodos();
    const actionsTodoActiveRef = useRef(actionsTodoActive);

    // Handle { actionsTodoActive } Change
    useEffect(() => {
        actionsTodoActiveRef.current = actionsTodoActive;
    }, [actionsTodoActive]);

    // Is Active
    const actionsIsActive = actionsTodoActive === todoId;

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (actionsListRef.current) {
                actionsListRef.current.classList.remove('transition');
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle Click Out Side
    useEffect(() => {
        const handlerClickOutside = () => {
            if (actionsTodoActiveRef.current) setActionsTodoActive(null)
        };

        document.addEventListener('click', handlerClickOutside);
        return () => document.removeEventListener('click', handlerClickOutside);
    }, [setActionsTodoActive]);

    return (
        <div className="todo-actions relative">
            {/* Open Actions */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setActionsTodoActive(prev => prev === todoId ? null : todoId)
                }}
                title="Open Actions"
                className="p-3 rounded-md bg-[#181818] shadow-md md:hidden"
            >
                <span className="sr-only">Open Actions</span>
                <i className={`fa-solid fa-${actionsIsActive ? 'xmark' : 'list-dots'} fa-fw`}></i>
            </button>
            {/* Actions List */}
            <div ref={actionsListRef} className={`actions-list flex items-center gap-y-3 gap-x-2 max-md:absolute max-md:z-10 max-md:top-0 max-md:right-full max-md:mr-3 transition ${actionsIsActive ? 'max-md:opacity-100 max-md:translate-x-0' : 'max-md:opacity-0 max-md:translate-x-3 max-md:pointer-events-none'}`}>
                {/* Update Action */}
                <UpdateAction todoId={todoId} oldValue={title} />
                {/* Featured Action */}
                <FeaturedAction todoId={todoId} isFeatured={isFeatured} />
                {/* Delete Action */}
                <DeleteAction todoId={todoId} />
            </div>
        </div>
    )
}

export default TodoActions;