import React from 'react'
import Airtable from 'airtable';
import AddTodoForm from './AddTodoForm';
import Navbar from './Navbar';
import TodoList from './TodoList';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID
);

const Priority = () => {

    const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
    const [isLoading, setIsLoading] = React.useState(true);

    // GET request with prop of table name
    React.useEffect(() => {
        base('default')
            .select({
                sort: [{ field: "priority", direction: "desc" }]
            })
            .eachPage((records, fetchNextPage) => {
                setTodoList(records);
                console.log("The records from GET", records);
                setIsLoading(false);
                fetchNextPage();
            });
    }, []);


    // useEffect on loading
    React.useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    });

    // add to do using Create()
    const addTodo = (newTodo) => {
        base('default').create({
            "title": newTodo.title,
            "priority": "fasle"
        }, { typecast: true }, function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(record.fields.title);
            setTodoList([...todoList, record])

        });
    }

    // API call to DELETE todo list item
    const removeTodo = (id) => {
        const item = todoList.find(element => element.id === id);
        base('default').destroy(item.id) // destroy using element id
        console.log("This is the item removed", item);
        const itemIndex = todoList.indexOf(item);
        todoList.splice(itemIndex, 1);
        const updatedTodoList = [].concat(todoList);
        setTodoList(updatedTodoList);
    }

    // API call to update todo list item
    const updateTodo = (updatedTodo, id) => {
        console.log("update mode active", updatedTodo);
        console.log(updatedTodo, id)
        const item = todoList.find(element => element.id === id);
        base('default').update(id, {
            "priority": "fasle",
            "title": updatedTodo
        }, function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            const itemIndex = todoList.indexOf(item);
            todoList[itemIndex] = updatedTodo;

            console.log(todoList)
        });
    }

    return (
        <div className='todo-app'>
            <Navbar />
            <div className='container'>
                <h1 className='header1'>Priority</h1>
                <hr />
                <div className='mainContainer'>
                    <AddTodoForm onAddTodo={addTodo} />
                    {isLoading ? <p>Loading...</p> :
                        <TodoList
                            todoList={todoList}
                            onRemoveTodo={removeTodo}
                            onUpdateTodo={updateTodo} />}
                </div>
            </div>
        </div>
    )
}

export default Priority