import React from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => (
    <>
        <ul>
            {todoList.map((item) => {
                return <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                    onUpdateTodo={onUpdateTodo} />
            })}
        </ul>
    </>
)


TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func
}

export default TodoList