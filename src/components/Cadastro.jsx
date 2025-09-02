import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { validCNPJ, validEmail, formatCNPJ, STATUS } from "../utils/validators";

export default function Cadastro({ switchMode }) {
  const [cadastroData, setCadastroData] = useState({ userName: "", nome: "", cnpj: "", email: "", senha: "" });

  const handleCadastro = async () => {
    if (!cadastroData.userName || !cadastroData.nome || !cadastroData.cnpj || !cadastroData.email || !cadastroData.senha) {
      return alert("Preencha todos os campos obrigatórios");
    }
    if (!validCNPJ(cadastroData.cnpj)) return alert("CNPJ inválido");
    if (!validEmail(cadastroData.email)) return alert("E-mail inválido");

    await addDoc(collection(db, "users"), {
      ...cadastroData,
      cnpj: formatCNPJ(cadastroData.cnpj),
      role: "Fornecedor",
      status: STATUS.PENDENTE
    });
    alert("Cadastro enviado para aprovação");
    switchMode("login");
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input placeholder="CNPJ" value={cadastroData.cnpj} onChange={e => setCadastroData({ ...cadastroData, cnpj: e.target.value })} />
      <input placeholder="Nome completo" value={cadastroData.nome} onChange={e => setCadastroData({ ...cadastroData, nome: e.target.value })} />
      <input placeholder="E-mail" value={cadastroData.email} onChange={e => setCadastroData({ ...cadastroData, email: e.target.value })} />
      <input placeholder="Nome de usuário" value={cadastroData.userName} onChange={e => setCadastroData({ ...cadastroData, userName: e.target.value })} />
      <input placeholder="Senha" type="password" value={cadastroData.senha} onChange={e => setCadastroData({ ...cadastroData, senha: e.target.value })} />
      <button onClick={handleCadastro}>Enviar cadastro</button>
      <p><button onClick={() => switchMode("login")}>Voltar ao Login</button></p>
    </div>
  );
}
