import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListTodoComponent from './components/ListTodoComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoComponent from './components/TodoComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<ListTodoComponent />}></Route>
          {/* http://localhost:3000/todos */}
          <Route path="/todos" element={<ListTodoComponent />}></Route>
          {/* http://localhost:3000/add-todo */}
          <Route path="/add-todo" element={<TodoComponent />}></Route>
          {/* http://localhost:3000/edit-todo/:id */}
          <Route path="/edit-todo/:id" element={<TodoComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
