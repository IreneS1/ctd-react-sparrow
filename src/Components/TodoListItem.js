import React from 'react'
import '../Styles/TodoListItem.css';
import PropTypes from "prop-types";


function TodoListItem({ todo, onRemoveTodo }) {

    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    return (
        <div className='containerList'>
            <li className='ListItem'>
                <input type='checkbox' className='checkbox' />{todo.fields.title}</li>
            <p className='notes'>{todo.fields.notes}</p>
            <button onClick={handleRemoveTodo} className='button' >Completed</button>
        </div>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func
}

export default TodoListItem