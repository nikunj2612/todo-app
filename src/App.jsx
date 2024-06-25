import "./App.css";

import Todo from "./components/Todo";
import { Draggable } from "./components/global/Draggable";
import { Droppable } from "./components/global/Droppable";

function App() {
  return (
    <div className='app' style={{ marginTop: "20px" }}>
      <Todo />
    </div>
  );
}

export default App;
