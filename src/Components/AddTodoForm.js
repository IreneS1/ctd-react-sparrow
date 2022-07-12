import React from 'react'
import InputWithLabel from './InputWithLabel';
import '../Styles/AddTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {

    const [todoTitle, setTodoTitle] = React.useState("");

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(todoTitle);
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle("");
    };

    return (
        <>
            <form onSubmit={handleAddTodo} className='form'>
                <InputWithLabel onChange={handleTitleChange} />
                <button type="submit" className='formButton'>Add</button>
            </form>
        </>
    )
};


export default AddTodoForm