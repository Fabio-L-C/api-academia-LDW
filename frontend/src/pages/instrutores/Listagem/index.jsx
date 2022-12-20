import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import TableAlunos from "../../../components/TableAlunos";
import { loadInstrutores } from "../../../services/instrutoresService";
import "./style.css";

const Listagem = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstrutores(setAlunos, setLoading);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Instrutores</h1>
        <Link to="/instrutores/cadastrar" className="btn btn-primary">
          Novo
        </Link>
      </div>
      <hr />
      {loading ? (
        <Loading />
      ) : (
        <TableAlunos alunos={alunos} setAlunos={setAlunos} url="instrutores" />
      )}
    </>
  );
};

export default Listagem;
