import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function FichasPendentes({ role }) {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    async function fetchFichas() {
      const snapshot = await getDocs(collection(db, "produtos"));
      setFichas(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchFichas();
  }, []);

  const handleAprovar = async (id) => {
    await updateDoc(doc(db, "produtos", id), { status: "Aprovado" });
    setFichas(fichas.map(f => f.id === id ? { ...f, status: "Aprovado" } : f));
  };

  const handleReprovar = async (id) => {
    await updateDoc(doc(db, "produtos", id), { status: "Reprovado" });
    setFichas(fichas.map(f => f.id === id ? { ...f, status: "Reprovado" } : f));
  };

  return (
    <div>
      <h2>Fichas Pendentes</h2>
      <ul>
        {fichas.map(f => (
          <li key={f.id}>
            {f.sabor} ({f.codInterno}) - Status: {f.status || "Pendente"}
            {role !== "Fornecedor" && (
              <>
                <button onClick={() => handleAprovar(f.id)}>Aprovar</button>
                <button onClick={() => handleReprovar(f.id)}>Reprovar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
