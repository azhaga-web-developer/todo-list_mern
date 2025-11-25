// Import React and hooks
import React, { useState, useEffect } from "react";
// Import CSS for styling
import "./App.css";

function App() {
  // State to hold todos fetched from backend
  const [todos, setTodos] = useState([]);
  // State to hold input value for new todo
  const [input, setInput] = useState("");

  // Fetch todos from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/todos") // GET request to backend
      .then((res) => res.json()) // Parse response as JSON
      .then((data) => setTodos(data)); // Set todos state
  }, []);

  // Add a new todo to backend and update state
  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (!input.trim()) return; // Ignore empty input
    // POST request to backend
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, completed: false }),
    });
    const newTodo = await res.json(); // Get new todo from response
    setTodos([...todos, newTodo]); // Add new todo to state
    setInput(""); // Clear input field
  };

  // Delete a todo from backend and update state
  const handleDelete = async (id) => {
    // DELETE request to backend
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    // Remove todo from state
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // Render UI
  return (
    <div className="app-container">
      {/* App title */}
      <h1 className="title">Todo List</h1>
      {/* Form to add new todo */}
      <form className="todo-form" onSubmit={handleAdd}>
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
      {/* List of todos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {/* Todo text */}
            <span>{todo.text}</span>
            {/* Delete button */}
            <button className="delete-btn" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export App component
export default App;