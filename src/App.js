import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
  const [isLoading, setIsLoading] = React.useState(true);


  // GET request
  React.useEffect(() => {
    const reqUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    console.log(reqUrl);
    fetch(reqUrl, options)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, []);

  // POST
  // React.useEffect(() => {
  //   let _data = {
  //     "fields": {
  //       "Title": "Wake up"
  //     },
  //     "typecast": true
  //   };

  //   const reqUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
  //   fetch(reqUrl, {
  //     method: 'POST',
  //     body: JSON.stringify(_data),
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then((json => console.log(json)))
  // }, [setTodoList])

  // React.useEffect(() => {
  //   if (!isLoading) {
  //     localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  //   }
  // });

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const item = todoList.find(element => element.id === id);
    console.log(item);
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
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </>
            } />
          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
