import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, saveTodo, updateTodo } from '../services/TodoService';

const TodoComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateTodo = (e) => {
    e.preventDefault();
    const todo = {
      title,
      description,
      completed,
    };
    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response.data);
          navigate('/todos');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      saveTodo(todo)
        .then((response) => {
          console.log(response.data);
          navigate('/todos');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">update Todo </h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getTodo(id).then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      });
    }
  }, [id]);

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter Todo Title"
                  name="title"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Enter todo Description"
                  name="description"
                />
              </div>
              <div className="form-group">
                <label>Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-success"
                onClick={(e) => {
                  saveOrUpdateTodo(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
