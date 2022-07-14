import React from 'react'
import InputWithLabel from './InputWithLabel';
import '../Styles/AddTodoForm.css';
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {

    const [todoTitle, setTodoTitle] = React.useState("");

    // handleTitleChange function gets user's input is set to new todo title on change.
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };


    // handleAddTodo function invokes onAddTodo function with new 
    // todo title and id on submit. Sets the todotitle input empty
    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log("This is the todoTitle", todoTitle);
        onAddTodo({ 'title': todoTitle, 'id': Date.now() });
        setTodoTitle('');
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

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};


export default AddTodoForm