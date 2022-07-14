import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Goals from './Components/Goals'
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
          <Route path="/priority" element={<Priority />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
