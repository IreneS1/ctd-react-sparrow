import React from 'react'
import '../Styles/TodoListItem.css';
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo }) {
    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    return (
        <>
            <li className='ListItem'>{todo.fields.Title}
                <button onClick={handleRemoveTodo} className='button' >Completed</button>
            </li>
        </>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func
}

export default TodoListItem