import React from 'react'
import InputWithLabel from './InputWithLabel';
import '../Styles/AddTodoForm.css';
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {

    const [todoTitle, setTodoTitle] = React.useState("");


    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };


    // handleAddTodo function makes a POST request to the api 
    const handleAddTodo = (event) => {
        let _data =
        {
            "fields": {
                "title": todoTitle
            },
            "typecast": true,
        };


        event.preventDefault();
        console.log("This is the todoTitle", todoTitle);

        const reqUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
        console.log(reqUrl);
        fetch(reqUrl, {
            method: 'POST',
            body: JSON.stringify(_data),
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((json => console.log(json)))

        onAddTodo(_data);
        setTodoTitle(" ");
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