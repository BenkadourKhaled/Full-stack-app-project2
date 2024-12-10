import { useEffect, useState } from 'react';
import { completeTodo, deleteTodo, getAllTodos } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodos();
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTodo() {
    navigate('/add-todo');
  }

  function updateTodo(id) {
    navigate(`/edit-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then((response) => {
        console.log(response.data);
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then((response) => {
        console.log(response.data);
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2>List of todo</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTodo(todo.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => markCompleteTodo(todo.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
