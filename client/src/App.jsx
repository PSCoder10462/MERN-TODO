import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./components/AddTodo/AddTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import { setTodo, selectTodos } from "./redux/todos/todoSlice";
import todoActions from "./redux/todos/actions";
import "./App.css";
import { io } from "socket.io-client";
import style from "./styles.module.css";

function App() {
  const socket = io({ forceNew: true });

  const todos = useSelector(selectTodos),
    dispatch = useDispatch();

  useEffect(async () => {
    const todosData = await todoActions.getTodo();
    dispatch(setTodo(todosData));
  }, []);

  socket.on("FromServer", (data) => console.log(data));

  socket.on("dbUpdate", async () => {
    const todosData = await todoActions.getTodo();
    dispatch(setTodo(todosData));
  });

  const addTodo = (todo) => {
    todoActions.addTodo(todo);
  };

  return (
    <div className="app">
      <div className={style.navbar}>
        <h1>Todo Web App</h1>
      </div>

      <div className={style.appContainer}>
        <div className="bg" />
        <div className="bg bg2" />
        <div className="bg bg3" />
        <div className="container">
          <AddTodo addTodo={addTodo} />
          <ShowTodo todos={todos} />
        </div>
      </div>
    </div>
  );
}

export default App;
