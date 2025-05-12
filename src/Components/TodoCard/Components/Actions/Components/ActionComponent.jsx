function ActionComponent({ handleClick, className = "", icon = "", text = "", ...attributes }) {
    return (
        <button
            type="button"
            {...attributes}
            onClick={handleClick}
            className={`p-3 rounded-md bg-black shadow-md max-md:w-full max-md:text-start text-nowrap ${className}`}
        >
            <i className={icon}></i>
            <span className="sr-only max-md:ms-2">{text}</span>
        </button>
    )
}

export default ActionComponent;