import React, { useState } from "react";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState("login");

  const switchMode = (newMode) => setMode(newMode);

  if (!currentUser) {
    if (mode === "login") return <Login setCurrentUser={setCurrentUser} switchMode={switchMode} />;
    if (mode === "cadastro") return <Cadastro switchMode={switchMode} />;
    if (mode === "reset") return <ResetPassword switchMode={switchMode} />;
  }

  return <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />;
}
