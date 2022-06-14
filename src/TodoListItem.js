import React from 'react'

function TodoListItem({ todo, onRemoveTodo }) {
    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    return (
        <>
            <li>{todo.fields.Title} <button onClick={handleRemoveTodo} >Remove</button></li>
        </>
    )
}

export default TodoListItem