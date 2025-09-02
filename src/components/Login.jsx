import React, { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { STATUS } from "../utils/validators";

export default function Login({ setCurrentUser, switchMode }) {
  const [loginData, setLoginData] = useState({ userName: "", senha: "" });

  const handleLogin = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    const user = users.find(u => u.userName === loginData.userName && u.senha === loginData.senha);
    if (!user) return alert("Usuário ou senha inválidos");
    if (user.status !== STATUS.APROVADO) return alert("Cadastro ainda não aprovado");
    setCurrentUser(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Nome de usuário" value={loginData.userName} onChange={e => setLoginData({ ...loginData, userName: e.target.value })} />
      <input placeholder="Senha" type="password" value={loginData.senha} onChange={e => setLoginData({ ...loginData, senha: e.target.value })} />
      <button onClick={handleLogin}>Entrar</button>
      <p>
        <button onClick={() => switchMode("reset")}>Esqueci a senha</button> | 
        <button onClick={() => switchMode("cadastro")}>Cadastrar</button>
      </p>
    </div>
  );
}
