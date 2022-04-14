import React from 'react'

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

const TodoList = () => (
    <div>
        <ul>
            {todoList.map(function (item) {
                return <li key={item.id}>{item.title}</li>
            })}
        </ul>
    </div>
)

export default TodoList