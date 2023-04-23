import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const tarefasSalvas =
      JSON.parse(localStorage.getItem("listaTarefas")) || [];
    setTarefas(tarefasSalvas);
  }, []);

  function adicionarTarefa(texto) {
    if (!texto.trim()) return;

    const novasTarefas = [...tarefas, texto];
    setTarefas(novasTarefas);

    window.alert("Tarefa adicionada");

    salvarTarefas(novasTarefas);
  }

  function removerTarefa(index) {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);

    window.alert("Tarefa removida");

    salvarTarefas(novasTarefas);
  }

  function salvarTarefas(novasTarefas) {
    localStorage.setItem("listaTarefas", JSON.stringify(novasTarefas));
  }

  const inputTarefaRef = useRef();

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      adicionarTarefa(e.target.value.trim());
      e.target.value = "";
    }
  }

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <input
        className="nova-tarefa"
        onKeyPress={handleKeyPress}
        placeholder="Adicione uma tarefa"
        ref={inputTarefaRef}
        maxLength={30}
      ></input>
      <ul className="tarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} onClick={() => removerTarefa(index)}>
            {tarefa}
          </li>
        ))}
      </ul>
      <button
        className="add-tarefa"
        onClick={() => {
          const inputTarefa = inputTarefaRef.current;
          adicionarTarefa(inputTarefa.value.trim());
          inputTarefa.value = "";
        }}
      >
        Adicionar tarefa
      </button>
    </div>
  );
}

export default App;
