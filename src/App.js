import React from 'react';
import Airtable from 'airtable';
import TodoList from './Components/TodoList';
import AddTodoForm from './Components/AddTodoForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import './Styles/App.css';



const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

function App() {

  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
  const [isLoading, setIsLoading] = React.useState(true);
  // const [onAddTodo, setOnAddTodo] = React.useState('');


  // GET request
  React.useEffect(() => {
    base("default")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setTodoList(records);
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

  // add to do 
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
    console.log("this is the todolist", todoList);
  }

  // API call to DELETE todo list item
  const removeTodo = (id) => {

    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
      process.env.REACT_APP_AIRTABLE_BASE_ID
    );
    const item = todoList.find(element => element.id === id);
    base('default').destroy(item.id) // destroy using element id
    console.log("This is the item removed", item);
    const itemIndex = todoList.indexOf(item);
    todoList.splice(itemIndex, 1);
    const updatedTodoList = [].concat(todoList);
    setTodoList(updatedTodoList);
  }

  return (
    <div className='todo-app'>
      <BrowserRouter>
        <Routes>
          <Route
            index
            exact
            path="/"
            element={
              <>
                <Navbar />
                <div className='container'>
                  <h1 className='header1'>Todo List</h1>
                  <hr />
                  <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? <p>Loading...</p> :
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
                </div>
              </>
            } />
          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
