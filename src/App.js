import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Priority from './Components/Priority';
import TodoContainer from './Components/TodoContainer';


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            index
            exact
            path="/"
            element={<TodoContainer />} />
          <Route path="/home" element={<h1>New Todo List</h1>} />
          <Route path="/priority" element={<Priority />} />
          <Route path="/goals" element={<h1>Goals</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
