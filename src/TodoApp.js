import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos
  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  // Add new todo
const addTodo = async () => {
  if (!title) return;
  const res = await axios.post(API_URL, { title });
  setTodos([...todos, res.data]);
  setTitle("");
};

  // Update (toggle completed)
  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addBtn}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.listItem}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={styles.delBtn}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "auto", textAlign: "center" },
  inputBox: { marginBottom: "10px" },
  input: { padding: "8px", width: "70%" },
  addBtn: { padding: "8px", marginLeft: "8px" },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 10px",
    borderBottom: "1px solid #ccc",
  },
  delBtn: { background: "none", border: "none", cursor: "pointer" },
};

export default TodoApp;
