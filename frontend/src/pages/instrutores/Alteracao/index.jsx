import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormAluno from "../../../components/FormAluno";
import InformModal from "../../../components/InformModal";
import { authHeader } from "../../../services/authServices";

const Alteracao = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(undefined);
  const navigate = useNavigate();

  const idAluno = useParams().id;
  if (!idAluno) {
    navigate("/listagem");
  }

  const validator = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório."),
    dataNascimento: yup.date().required("Data de nascimento é obrigatória."),
    cpf: yup
      .string()
      .length(11, "CPF está incompleto.")
      .required("CPF é obrigatório."),
    sexo: yup
      .string()
      .oneOf(["M", "F", "O"], "Gênero está incorreto.")
      .required("Gênero é obrigatório."),
    telefone: yup
      .string()
      .length(11, "Telefone está incompleto.")
      .required("Telefone é obrigatório."),
    email: yup
      .string()
      .email("E-mail inválido.")
      .required("E-mail é obrigatório."),

    ativo: yup.boolean().required("Situação é obrigatória."),
  });

  function handleChange(event) {
    const value = event.target.rawValue
      ? event.target.rawValue
      : event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    validator
      .validate(inputs, { abortEarly: false })
      .then(() => {
        setErrors({});
        axios
          .put(`http://localhost:8080/api/instrutores/${idAluno}`, inputs, {
            headers: authHeader(),
          })
          .then((response) => {
            if (response.status === 200) {
              modal.show();
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setErrors({});
        error.inner.forEach((err) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [err.path]: err.message,
          }));
        });
      });
  }

  function closeModalAndRedirect() {
    modal.hide();
    navigate("/instrutores");
  }

  useEffect(() => {
    const informModal = new bootstrap.Modal("#informModal", {});
    setModal(informModal);
    setInputs({ ...inputs, id: idAluno });
    axios
      .get(`http://localhost:8080/api/instrutores/${idAluno}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          setInputs(response.data);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(inputs).length > 0) {
      validator
        .validate(inputs, { abortEarly: false })
        .then(() => {
          setErrors({});
        })
        .catch((error) => {
          setErrors({});
          error.inner.forEach((err) => {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [err.path]: err.message,
            }));
          });
        });
    }
  }, [inputs]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Alteração de Instrutor</h1>
      </div>
      <hr />
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormAluno
          handleChange={handleChange}
          inputs={inputs}
          errors={errors}
        />
        <div className="mt-3">
          <Link to="/instrutores" className="btn btn-secondary me-1">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
      <InformModal
        info="Instrutor alterado com sucesso!"
        action={closeModalAndRedirect}
      />
    </>
  );
};

export default Alteracao;
