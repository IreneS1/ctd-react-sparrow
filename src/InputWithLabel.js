import React from 'react'

const InputWithLabel = ({ todoTitle, onChange, children }) => {
    const handleTitleChange = onChange;

    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                ref={inputRef}
                onChange={handleTitleChange}
            />
        </>
    )
}

export default InputWithLabel