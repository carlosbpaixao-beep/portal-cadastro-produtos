import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProdutoForm() {
  const [produto, setProduto] = useState({ sabor: "", ean: "", dun: "", codInterno: "", familiaId: "", foto: null });
  const [familias, setFamilias] = useState([]);

  useEffect(() => {
    async function fetchFamilias() {
      const snapshot = await getDocs(collection(db, "familias"));
      setFamilias(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchFamilias();
  }, []);

  const handleSubmit = async () => {
    if (!produto.sabor || !produto.ean || !produto.dun || !produto.codInterno || !produto.familiaId || !produto.foto) {
      return alert("Preencha todos os campos e selecione uma foto");
    }

    const fotoRef = ref(storage, `produtos/${produto.foto.name}`);
    await uploadBytes(fotoRef, produto.foto);
    const fotoURL = await getDownloadURL(fotoRef);

    await addDoc(collection(db, "produtos"), { ...produto, fotoURL });
    alert("Produto cadastrado com sucesso");
    setProduto({ sabor: "", ean: "", dun: "", codInterno: "", familiaId: "", foto: null });
  };

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      <select value={produto.familiaId} onChange={e => setProduto({ ...produto, familiaId: e.target.value })}>
        <option value="">Selecione a família</option>
        {familias.map(f => <option key={f.id} value={f.id}>{f.descricao}</option>)}
      </select>
      <input placeholder="Sabor" value={produto.sabor} onChange={e => setProduto({ ...produto, sabor: e.target.value })} />
      <input placeholder="EAN" value={produto.ean} onChange={e => setProduto({ ...produto, ean: e.target.value })} />
      <input placeholder="DUN" value={produto.dun} onChange={e => setProduto({ ...produto, dun: e.target.value })} />
      <input placeholder="Código interno" value={produto.codInterno} onChange={e => setProduto({ ...produto, codInterno: e.target.value })} />
      <input type="file" onChange={e => setProduto({ ...produto, foto: e.target.files[0] })} />
      <button onClick={handleSubmit}>Cadastrar Produto</button>
    </div>
  );
}
