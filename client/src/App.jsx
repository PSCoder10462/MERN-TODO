import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./components/AddTodo/AddTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import { pusherTodo, setTodo, selectTodos } from "./redux/todos/todoSlice";
import todoActions from "./redux/todos/actions";
import "./App.css";
import { pusher } from "./pusherConfig";

function App() {
  const channel = pusher.subscribe("todos");

  const todos = useSelector(selectTodos),
    dispatch = useDispatch();

  useEffect(async () => {
    const todosData = await todoActions.getTodo();
    dispatch(setTodo(todosData));
  }, []);

  useEffect(() => {
    channel.bind("inserted", ({ todoDetails }) => {
      dispatch(pusherTodo(todoDetails));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [todos]);

  const addTodo = (e, todo) => {
    e.preventDefault();
    todoActions.addTodo(todo);
  };

  return (
    <div className="app">
      <h1>todo app</h1>

      <AddTodo addTodo={addTodo} />

      {todos?.map((todo, id) => (
        <ShowTodo key={id} val={todo} />
      ))}
    </div>
  );
}

export default App;
