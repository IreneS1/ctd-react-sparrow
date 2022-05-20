import React from 'react'
import InputWithLabel from './InputWithLabel';

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
            <form onSubmit={handleAddTodo}>
                <InputWithLabel onChange={handleTitleChange}>
                    Title:
                </InputWithLabel>
                <button type="submit">Add</button>
            </form>
        </>
    )
};


export default AddTodoForm