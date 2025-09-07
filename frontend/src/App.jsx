
import { BrowserRouter as Router, Routes, Route, Link } from "react-router"

import HelloWorld from "./templates/HelloWorld";
import Home from "./templates/Home"
import Crud from "./templates/todo/Crud";


const App = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  )
}

export default App