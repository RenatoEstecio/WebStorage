import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  const buscarProdutos = (valor?: string) => {
    const query = valor ?? busca;

    const url = query
      ? `https://localhost:44327/api/Product?query=${query}`
      : "https://localhost:44327/api/Product";

    fetch(url)
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err));
  };

   const buscarPorCategoria = (categoria: string) => { 
    setBusca(""); // limpa o input
    buscarProdutos(categoria);
  };


const categorias = [
  { label: "Consoles", value: "console" },
  { label: "Controles", value: "controle" },
  { label: "Computadores", value: "computador" },
  { label: "Notebooks", value: "notebook" },
  { label: "Placas de Vídeo", value: "placa de vídeo" },
  { label: "Smartphones", value: "smartphone" },
  { label: "SSDs", value: "ssd" }
];

  // carga inicial
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <header className="header">
         <div className="header-content">
        <div className="logo">e-Commerce</div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Encontre na loja"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarProdutos()}
            className="search"
          />

          <button onClick={() => buscarProdutos()} className="search-btn">🔍
          </button>
        </div>

        <div className="icons">🛒 👤</div>
        </div>
      </header>

      {/* MENU */}
      <nav className="menu">
         <div className="menu-content">
       {categorias.map((c) => (
        <button key={c.value} onClick={() => buscarPorCategoria(c.value)}>
          {c.label.toUpperCase()}
        </button>
      ))}
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="container">
        <h2>OFERTAS COM FRETE GRÁTIS</h2>

        <div className="grid">
          {produtos.map((p, index) => (
            <div className="card" key={index}>
              <span className="discount">30% OFF</span>

              <img
                src={p.imgUrl || "https://via.placeholder.com/200"}
                alt={p.name}
              />

              <span className="badge">Frete grátis</span>

              <h3>{p.name}</h3>

              <p className="price">
                R$ {p.price ? p.price.toFixed(2) : "0,00"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;