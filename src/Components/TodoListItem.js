import React from 'react'
import '../Styles/TodoListItem.css';
import PropTypes from "prop-types";


function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {

    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    const handleUpdateTodo = () => {
        onUpdateTodo(todo.id)
    }

    return (
        <div className='containerList'>
            <li className='ListItem' onDoubleClick={handleUpdateTodo}>{todo.fields.title}
                {/* Not sure if I want to include a checkbox */}
                {/* <input type='checkbox' className='checkbox' /> */}
                {/* <p className='notes'>{todo.fields.notes}</p> */}
                <button onClick={handleRemoveTodo} className='button'>Completed</button>
            </li>
        </div>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func
}

export default TodoListItem