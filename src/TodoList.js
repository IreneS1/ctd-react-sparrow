import React from 'react'
import TodoListItem from './TodoListItem'

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
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} />
            })}
        </ul>
    </div>
)

export default TodoList