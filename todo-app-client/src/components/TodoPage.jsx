import axios from "axios";
import React, { useEffect, useState } from "react";

const TodoPage = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [selid, setSelId] = useState("0");
  useEffect(() => {
    console.log("from useEffect");
    var url = "http://localhost:3000/todos";
    var method = "GET";
    axios
      .get(url)
      // .then((res) => {
      //   return res.json();
      // })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      });
  }, []);

  const handleAddTodo = () => {
    console.log(todo);
    // if (selid != "0") {
    //   //update logic
    //   let newList = todos.map((t) =>
    //     t.id == selid
    //       ? { title: todo, isCompleted: t.isCompleted, id: t.id }
    //       : t
    //   );
    //   setTodos(newList);
    //   setSelId("0");
    // } else {
    //   setTodos([{ title: todo, isCompleted: false, id: Date.now() }, ...todos]);
    // }
    if (selid != "0") {
      // update
      axios
        .put("http://localhost:3000/todos/" + selid, {
          title: todo,
          isCompleted: false,
        })
        .then((response) => {
          console.log(response.data);
          setTodos(response.data);
        });
    } else {
      // add
      axios
        .post("http://localhost:3000/todos", {
          title: todo,
          isCompleted: false,
          id: Date.now(),
        })
        .then((response) => {
          console.log(response.data);
          setTodos(response.data);
        });
    }

    setTodo("");
  };
  const handleTodoChange = (id) => {
    let item = todos.find((t) => t.id == id);
    axios
      .put("http://localhost:3000/todos/" + id, {
        title: item.title,
        isCompleted: !item.isCompleted,
      })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      });
    // setTodos(newList);
  };
  const handleDelete = (id) => {
    // let newList = todos.filter((t) => t.id != id);
    axios.delete("http://localhost:3000/todos/" + id).then((response) => {
      console.log(response.data);
      setTodos(response.data);
    });
    // setTodos(newList);
  };
  const handleEdit = (id) => {
    let t = todos.find((t) => t.id == id);
    if (t) {
      setTodo(t.title);
      setSelId(id);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="txtTodo"
          id="txtTodo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>
          {selid != "0" ? "Update" : "Add"}
        </button>
      </div>
      <div>
        {todos.map((t) => (
          <div key={t.id}>
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={(e) => handleTodoChange(t.id)}
            />
            {t.title}
            <button onClick={(e) => handleDelete(t.id)}>Delete</button>
            <button onClick={(e) => handleEdit(t.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
