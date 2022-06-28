import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve({ data: { todoList: JSON.parse(localStorage.getItem('savedTodoList')) } }), "2000")
    })
      .then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  });

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
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />

      {isLoading ? <p>Loading...</p> :
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  )
}

export default App;
