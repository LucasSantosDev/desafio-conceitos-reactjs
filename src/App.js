import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("repositories");

        if (data && data.length > 0) {
          setRepository(data);
        }
      } catch (error) {
        console.error("Exception > ", error);
      }
    }

    fetchData();
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Novo projeto teste-${new Date()}`,
      url: `http://${new Date()}.com.br`,
    };

    try {
      const { data: responseData } = await api.post("repositories", data);

      setRepository([...repository, responseData]);
    } catch (error) {
      console.error("Exception > ", error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const repositoryIndex = repository.findIndex(
        (repository) => repository.id === id
      );

      repository.splice(repositoryIndex, 1);

      setRepository([]);
      setRepository(repository);
    } catch (error) {
      console.error("Exception > ", error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository &&
          repository.map((r) => (
            <li key={`${r.id}`}>
              {r.title}
              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
