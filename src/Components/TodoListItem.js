import React from 'react'
import '../Styles/TodoListItem.css';

function TodoListItem({ todo, onRemoveTodo }) {
    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    return (
        <>
            <li className='ListItem'>{todo.fields.Title}
                <button onClick={handleRemoveTodo} className='button' >Remove</button>
            </li>
        </>
    )
}

export default TodoListItem