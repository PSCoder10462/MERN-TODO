import React, { useState } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Clear, Delete, Done } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import todoActions from "../../../redux/todos/actions";
import { setTodo } from "../../../redux/todos/todoSlice";
import "./TodoItem.css";

function TodoItem({ todo }) {
  const dispatch = useDispatch(),
    [checkLoad, setCheckLoad] = useState(false),
    [delLoad, setDelLoad] = useState(false); // true -> loader active

  const checkHandler = async () => {
    setCheckLoad(true);
    await todoActions.checkTodo(todo).then(async (res) => {
      if (res === "Todo Updated successfully !!") {
        const todosData = await todoActions.getTodo();
        dispatch(setTodo(todosData));
      }
    });
    setCheckLoad(false);
  };
  const deleteHandler = async () => {
    setDelLoad(true);
    await todoActions.deleteTodo(todo).then(async (res) => {
      if (res === "Todo Deleted successfully !!") {
        const todosData = await todoActions.getTodo();
        dispatch(setTodo(todosData));
      }
    });
    setDelLoad(false);
  };

  return (
    <div>
      <li
        key={todo._id}
        className={todo.check ? "todos__item checked" : "todos__item"}
      >
        <h3>{todo.todo}</h3>
        {checkLoad ? (
          <CircularProgress />
        ) : todo.check ? (
          <IconButton onClick={checkHandler}>
            <Clear />
          </IconButton>
        ) : (
          <IconButton onClick={checkHandler}>
            <Done />
          </IconButton>
        )}
        {delLoad ? (
          <CircularProgress />
        ) : (
          <IconButton onClick={deleteHandler}>
            <Delete />
          </IconButton>
        )}
      </li>
    </div>
  );
}

export default TodoItem;
