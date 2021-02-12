import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import Pusher from "pusher-js";
import AddTodo from "./components/AddTodo/AddTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import {pusherTodo, setTodo, selectTodos} from './redux/todos/todoSlice';
import todoActions from './redux/todos/actions'
import "./App.css";

// Pusher
const pusher = new Pusher("15057156b578c5f6fdc7", {
      cluster: "ap2",
    });
const channel = pusher.subscribe("todos");
// 

function App() {  
  const todos = useSelector(selectTodos),
  dispatch = useDispatch();  

  useEffect( async () => {     
    const todosData = await todoActions.getTodo();    
    dispatch(setTodo(todosData));  
  }, []);

useEffect(() => {    
    channel.bind("inserted", ({todoDetails}) => {          
      dispatch(pusherTodo(todoDetails))      
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };  
  }, [todos]);

  const addTodo = (e, todo) => {
    e.preventDefault();
    todoActions.addTodo(todo)
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
