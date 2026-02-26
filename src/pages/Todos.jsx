import { useEffect, useState } from "react";
import { todoService } from "../services/todoservice";
import { useAuth } from "../context/AuthContext";

export default function Todos() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchTodos = async () => {
      try {
        const data = await todoService.getAllTodos();
        setTodos(data);
      } catch (err) {
        console.error("Failed to load todos", err);
      }
    };

    fetchTodos();
  }, [isAuthenticated]);

  const addNewItem = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    setError("");

    try {
      const newTodo = await todoService.createTodo({ title });
      setTodos((prev) => [...prev, newTodo]);
      setTitle("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete todo");
    }
  };

  const editItem = async (e) => {
    e.preventDefault();

    if (!editingTodo.title.trim()) {
      setEditError("Title is required");
      return;
    }

    if (editingTodo.title.trim().length < 3) {
      setEditError("Title must be at least 3 characters");
      return;
    }

    setEditError("");

    try {
      const updatedTodo = await todoService.updateTodo(editingTodo.id, {
        title: editingTodo.title,
        completed: editingTodo.completed,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );
      setEditingTodo(null);
    } catch (err) {
      setEditError(err, "Failed to update todo. Please try again");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My To-Do List
        </h1>

        {/* Create Form */}
        <form
          onSubmit={addNewItem}
          className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Enter new todo"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition duration-200"
          >
            Add
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Todos Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{todo.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        todo.completed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editingTodo && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Edit Todo
            </h3>
            <form onSubmit={editItem} className="flex flex-col gap-4">
              <input
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingTodo.completed}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      completed: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                Completed
              </label>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTodo(null)}
                  className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-200"
                >
                  Cancel
                </button>
              </div>
              {editError && <p className="text-red-500 text-sm">{editError}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
