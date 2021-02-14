import React, { useState } from "react";
import "./AddTodo.css";
import { Button, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";

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
        <TextField
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained">
          {/* Add Todo */}
          <Send />
        </Button>
      </form>
    </div>
  );
}

export default AddTodo;
