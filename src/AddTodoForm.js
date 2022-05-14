import React from 'react'

const AddTodoForm = ({ onAddTodo }) => {

    const [todoTitle, setTodoTitle] = React.useState("");

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        //let todoTitle = event.target.title.value;
        console.log(todoTitle);
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle("");
    };

    return (
        <>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title:</label>
                <input
                    type="text"
                    id="todoTitle"
                    name="title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                />
                <button type="submit">Add</button>
            </form>
        </>
    )
};


export default AddTodoForm