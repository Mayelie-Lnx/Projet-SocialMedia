import { useState } from "react";
import { AuthProvider } from "./AuthContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Login";
import InscriptionForm from "./InscriptionForm.jsx";
import Home from "./Home.jsx";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Rediriger la racine ("/") vers "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/inscription" element={<InscriptionForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
