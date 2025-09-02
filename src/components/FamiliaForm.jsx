import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function FamiliaForm() {
  const [familia, setFamilia] = useState({
    descricao: "",
    gramatura: "",
    marca: "",
    ncm: "",
    cest: "",
    validade: "",
    embalagens: ["", "", ""]
  });

  const handleSubmit = async () => {
    const { descricao, gramatura, marca, ncm, cest, validade, embalagens } = familia;
    if (!descricao || !gramatura || !marca || !ncm || !cest || !validade || embalagens.some(e => !e)) {
      return alert("Preencha todos os campos obrigatórios");
    }

    await addDoc(collection(db, "familias"), familia);
    alert("Família cadastrada com sucesso");
    setFamilia({ descricao: "", gramatura: "", marca: "", ncm: "", cest: "", validade: "", embalagens: ["", "", ""] });
  };

  return (
    <div>
      <h2>Cadastro de Família</h2>
      <input placeholder="Descrição" value={familia.descricao} onChange={e => setFamilia({ ...familia, descricao: e.target.value })} />
      <input placeholder="Gramatura" value={familia.gramatura} onChange={e => setFamilia({ ...familia, gramatura: e.target.value })} />
      <input placeholder="Marca" value={familia.marca} onChange={e => setFamilia({ ...familia, marca: e.target.value })} />
      <input placeholder="NCM" value={familia.ncm} onChange={e => setFamilia({ ...familia, ncm: e.target.value })} />
      <input placeholder="CEST" value={familia.cest} onChange={e => setFamilia({ ...familia, cest: e.target.value })} />
      <input placeholder="Validade" value={familia.validade} onChange={e => setFamilia({ ...familia, validade: e.target.value })} />
      <input placeholder="Embalagem 1" value={familia.embalagens[0]} onChange={e => setFamilia({ ...familia, embalagens: [e.target.value, familia.embalagens[1], familia.embalagens[2]] })} />
      <input placeholder="Embalagem 2" value={familia.embalagens[1]} onChange={e => setFamilia({ ...familia, embalagens: [familia.embalagens[0], e.target.value, familia.embalagens[2]] })} />
      <input placeholder="Embalagem 3" value={familia.embalagens[2]} onChange={e => setFamilia({ ...familia, embalagens: [familia.embalagens[0], familia.embalagens[1], e.target.value] })} />
      <button onClick={handleSubmit}>Cadastrar Família</button>
    </div>
  );
}
