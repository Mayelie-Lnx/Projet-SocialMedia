import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./Login.css";
import LoginForm from "./Login";
// import InscriptionForm from "./InscriptionForm.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* <Route path="/inscription" element={<InscriptionForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
