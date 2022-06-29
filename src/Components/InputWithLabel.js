import React from 'react'
import '../Styles/InputWithLabel.css';
import PropTypes from "prop-types";

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
                placeholder="New Todo Item"
                className='input'
            />
        </>
    )
}

InputWithLabel.propTypes = {
    todoTitle: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.string
}

export default InputWithLabel