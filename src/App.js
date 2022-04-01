import React from 'react';

const todoList = [
  {
    id: 1,
    title: 'Study',
  },
  {
    id: 2,
    title: 'Do Homework',
  },
  {
    id: 3,
    title: 'Turn in assignment',
  }
]

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
