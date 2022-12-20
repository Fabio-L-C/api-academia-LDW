import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import TableAlunos from "../../../components/TableAlunos";
import { loadAlunos } from "../../../services/alunosService";
import "./style.css";

const Listagem = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlunos(setAlunos, setLoading);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Alunos</h1>
        <Link to="/alunos/cadastrar" className="btn btn-primary">
          Novo
        </Link>
      </div>
      <hr />
      {loading ? (
        <Loading />
      ) : (
        <TableAlunos alunos={alunos} setAlunos={setAlunos} />
      )}
    </>
  );
};

export default Listagem;
