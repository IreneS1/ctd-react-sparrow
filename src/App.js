import React from 'react';
import TodoList from './Components/TodoList';
import AddTodoForm from './Components/AddTodoForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import './Styles/App.css';

function App() {

  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
  const [isLoading, setIsLoading] = React.useState(true);
  // const [onAddTodo, setOnAddTodo] = React.useState('');


  // GET request
  React.useEffect(() => {
    const reqUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    // console.log(reqUrl);
    fetch(reqUrl, options)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log("This is the GET result", result);
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, []);

  // useEffect on loading
  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  });

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
    console.log("this is the todolist", todoList);
  }



  const removeTodo = (id) => {
    const item = todoList.find(element => element.id === id);
    console.log("This is the item removed", item);
    const itemIndex = todoList.indexOf(item);
    todoList.splice(itemIndex, 1);
    const updatedTodoList = [].concat(todoList);
    setTodoList(updatedTodoList);
  }

  return (
    <div>
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
