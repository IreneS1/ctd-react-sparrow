import React from 'react'
import Airtable from 'airtable';
import Navbar from './Navbar';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID
);

const TodoContainer = () => {

    const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
    const [isLoading, setIsLoading] = React.useState(true);
    const [date, setDate] = React.useState("");

    // GET request with prop of table name
    React.useEffect(() => {
        base('default')
            .select({
                view: "Grid view",
                //sort: [{ field: "title", direction: "asc" }]
            })
            .eachPage((records, fetchNextPage) => {
                setTodoList(records);
                console.log("The records from GET", records);
                setIsLoading(false);
                fetchNextPage();
            });
        todaysDate();
    }, []);

    // Function to display today's date
    const todaysDate = () => {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(currentDate.toLocaleDateString('en-us', options));
    }

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
        //console.log(updatedTodo, id)
        const item = todoList.find(element => element.id === id);
        base('default').update(id, {
            "priority": "false",
            "title": updatedTodo
        }, function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            //console.log("airtable", record)
            const itemIndex = todoList.indexOf(item);




            // setTodoList([...todoList,])

            //todoList[itemIndex] = updatedTodo;

            //console.log("this is the todo list", todoList)
        });
    }

    return (
        <div className='todo-app'>
            <Navbar />
            <div className='container'>
                <h1 className='header1'>Today's To•do List</h1>
                <h3 className='date'>{date}</h3>
                <hr />
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                    <TodoList
                        todoList={todoList}
                        onRemoveTodo={removeTodo}
                        onUpdateTodo={updateTodo} />}
            </div>
        </div>
    )
}

export default TodoContainer