import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./components/AddTodo/AddTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import { pusherTodo, setTodo, selectTodos } from "./redux/todos/todoSlice";
import todoActions from "./redux/todos/actions";
import "./App.css";
import Pusher from "pusher-js";
import { pusher_key } from "./pusherConfig";
import style from "./styles.module.css";

function App() {
  const pusher = new Pusher(pusher_key, {
    cluster: "ap2",
  });

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
      <div className={style.navbar}>
        <h1 className={style.navbarTitle}>Todo Web App</h1>
      </div>

      <AddTodo addTodo={addTodo} />

      {todos?.map((todo, id) => (
        <ShowTodo key={id} val={todo} />
      ))}
    </div>
  );
}

export default App;
