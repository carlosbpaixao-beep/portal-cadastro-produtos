import React, { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function ResetPassword({ switchMode }) {
  const [resetEmail, setResetEmail] = useState("");

  const handleReset = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    const user = users.find(u => u.email === resetEmail);
    if (!user) return alert("E-mail não encontrado");
    const novaSenha = prompt("Digite a nova senha:");
    if (!novaSenha) return alert("Senha não alterada");
    await updateDoc(doc(db, "users", user.id), { senha: novaSenha });
    alert("Senha redefinida com sucesso");
    switchMode("login");
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <input placeholder="Digite seu e-mail" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
      <button onClick={handleReset}>Enviar</button>
      <p><button onClick={() => switchMode("login")}>Voltar ao Login</button></p>
    </div>
  );
}
