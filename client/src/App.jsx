import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/getTodo")
      .then(({ data }) => setTodos(data))
      .catch((err) => console.log(err.message));
  }, []);

  const addTodo = (e, todo) => {
    e.preventDefault();

    // post request to server
    axios
      .post("/addTodo", {
        todo: {
          todo,
          check: false,
        },
      })
      .then(({ data }) => {
        alert(data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="app">
      <h1>todo app</h1>

      <AddTodo addTodo={addTodo} />

      {todos.map((todo, id) => (
        <ShowTodo key={id} val={todo} />
      ))}
    </div>
  );
}

export default App;
