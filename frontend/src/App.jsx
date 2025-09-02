
import { BrowserRouter as Router, Routes, Route, Link } from "react-router"

import HelloWorld from "./templates/HelloWorld";
import Home from "./templates/Home"


const App = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<HelloWorld />} />
      </Routes>
    </Router>
  )
}

export default App