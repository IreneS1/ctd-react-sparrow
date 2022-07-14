import React from 'react'
import '../Styles/TodoListItem.css';
import PropTypes from "prop-types";


function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {

    const [editedText, setEditedText] = React.useState(todo.fields.title);
    const [isEditing, setIsEditing] = React.useState(false)

    const handleRemoveTodo = () => {
        onRemoveTodo(todo.id);
    }

    const handleUpdateTodo = (event) => {
        let updatedTodo = event.target.value;
        setEditedText(updatedTodo);
    }

    const handleEditTodo = (id) => {
        setIsEditing(!isEditing)
        let edit = editedText;
        onUpdateTodo(edit, id)

    }

    return (

        <div className='containerList'>

            {isEditing ? <input
                type="text"
                className='editInput'
                onChange={handleUpdateTodo}
                value={editedText} /> : <p key={todo.id}>{todo.fields.title}</p>}

            {/* <p className='notes'>{todo.fields.notes}</p> */}

            <button className='editButton' onClick={() => handleEditTodo(todo.id)}>Edit</button>


            {/* {isEditing === true && todoEdit === todo.id ? (
                <input
                    type="text"
                    onChange={handleUpdateTodo}
                    value={editedText} />) :
                (<li className='ListItem' key={todo.id}>{todo.fields.title}</li>)}

            {isEditing ?
                (<button onClick={() => { handleEditTodo(todo.id) }} type="submit">Update</button>) :
                (<button onClick={() => handleEditTodo(todo.id)}>Edit</button>)} */}
            <button onClick={handleRemoveTodo} className='completeButton'>Completed</button>

        </div>

    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func
}

export default TodoListItem