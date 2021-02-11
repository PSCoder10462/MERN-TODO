import React, { useState } from "react";
import "./AddTodo.css";

function AddTodo({ addTodo }) {
  const [todo, setTodo] = useState("");

  return (
    <div className="addTodo">
      <form
        onSubmit={(e) => {
          addTodo(e, todo);
          setTodo("");
        }}
      >
        <label>Todo</label>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="write todo here!"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo;
