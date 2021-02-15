import axios from "axios";

const todoActions = {
  getTodo: async () => {
    return await axios
      .get("/getTodo")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log(err));
  },

  // adding data to mongo db only
  addTodo: (todo) => {
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
      .catch((err) => console.log(err));
  },
  checkTodo: (todo) => {
    axios
      .post("/checkTodo", { todo })
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  },
  uncheckTodo: (todo) => {
    axios
      .post("/uncheckTodo", { todo })
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  },
};

export default todoActions;
