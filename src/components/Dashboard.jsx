import React from "react";
import FamiliaForm from "./FamiliaForm";
import ProdutoForm from "./ProdutoForm";
import FichasPendentes from "./FichasPendentes";

export default function Dashboard({ currentUser, setCurrentUser }) {
  const role = currentUser.role;

  return (
    <div className="p-4">
      <h1>Bem-vindo, {currentUser.nome}</h1>
      <p>Perfil: {role}</p>
      <button onClick={() => setCurrentUser(null)}>Sair</button>

      <hr className="my-4" />

      {/* ADMIN */}
      {role === "Administrador" && (
        <>
          <h2>Administração Geral</h2>
          <FichasPendentes role={role} />
        </>
      )}

      {/* FORNECEDOR */}
      {role === "Fornecedor" && (
        <>
          <h2>Cadastro de Produtos</h2>
          <FamiliaForm />
          <ProdutoForm />
        </>
      )}

      {/* ANALISTA DE COMPRAS */}
      {role === "Analista de Compras" && (
        <>
          <h2>Revisão de Fichas</h2>
          <FichasPendentes role={role} />
        </>
      )}

      {/* COMPRADOR */}
      {role === "Comprador" && (
        <>
          <h2>Validação de Fichas</h2>
          <FichasPendentes role={role} />
        </>
      )}

      {/* GERENTE */}
      {role === "Gerente" && (
        <>
          <h2>Lista de Fichas Recebidas</h2>
          <FichasPendentes role={role} />
        </>
      )}

      {/* DIRETORIA */}
      {role === "Diretoria" && (
        <>
          <h2>Lista de Fichas Recebidas</h2>
          <FichasPendentes role={role} />
        </>
      )}

      {/* CADASTRO */}
      {role === "Cadastro" && (
        <>
          <h2>Fichas Aprovadas</h2>
          <FichasPendentes role={role} />
        </>
      )}
    </div>
  );
}
