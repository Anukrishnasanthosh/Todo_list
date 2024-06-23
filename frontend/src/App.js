import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTask from './components/AddTask'
import TodoList from './components/Todo'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
