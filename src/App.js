import React from 'react';
import Airtable from 'airtable';
import TodoList from './Components/TodoList';
import AddTodoForm from './Components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import './Styles/App.css';



const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

function App() {

  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")));
  const [isLoading, setIsLoading] = React.useState(true);


  // GET request
  React.useEffect(() => {
    base("default")
      .select({ view: "Grid view" })
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
  const updateTodo = (id) => {
    console.log("update mode active");
    //const item = todoList.find(element => element.id === id);
    //   base('default').update(item.id, {
    //     "priority": "fasle",
    //     "title": "Eat breakfast"
    //   }, function (err, record) {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(record.get('priority'));
    //     console.log(record)
    //   });
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
                  <h1 className='header1'>Today's To•do List</h1>
                  <hr />
                  <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? <p>Loading...</p> :
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />}
                </div>
              </>
            } />
          <Route path="/home" element={<h1>New Todo List</h1>} />
          <Route path="/priority" element={<h1>Priority</h1>} />
          <Route path="/goals" element={<h1>Goals</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
