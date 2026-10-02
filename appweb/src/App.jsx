import { useState, useEffect } from 'react'

import './App.css'
import Menu from './components/Menu'
import Rodape from './components/Rodape'


function App() {
 const [pessoas, setPessoas] = useState([])
 //campos do formulario
 const [nome, setNome] = useState("")
 const [cpf, setCpf] = useState("")
//Guardar o id quando estamos editando
const [idEditando, setIdEditando] = useState(null)


useEffect(() => {
  fetch("http://localhost:3010/pessoas")
  .then((resposta) => resposta.json())
  .then((dados) => {setPessoa(dados)})
  .catch((erro) => {
    console.log("Erro ao buscar dados: ", erro)
  })
}, [])

function buscarPessoas(){
  fetch("http://localhost:3010/pessoas")
  .then((resposta) => resposta.json())
  .then((dados) => {
    setPessoas(dados)
  })
  .then((erro) => {
    console.log("Erro:", erro)
  })
}

useEffect(() => {
    buscarPessoas()
}, [])

function salvarPessoa(evento){
    evento.preventDefault();


        // --------------------------------------
        // SE EXISTE ID, FAZ PUT
        // --------------------------------------

        if (idEditando !== null) {

            fetch(`http://localhost:3010/pessoas/${idEditando}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf
                })

            })

                .then((resposta) => resposta.json())

                .then((dados) => {

                    alert(dados.mensagem);

                    limparFormulario();

                    buscarPessoas();

                })

                .catch((erro) => {

                    console.log("Erro:", erro);

                });

        }

        // --------------------------------------
        // CASO CONTRÁRIO, FAZ POST
        // --------------------------------------

        else {

            fetch("http://localhost:3010/pessoas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf
                })

            })

                .then((resposta) => resposta.json())

                .then((dados) => {

                    alert(dados.mensagem);

                    limparFormulario();

                    buscarPessoas();

                })

                .catch((erro) => {

                    console.log("Erro:", erro);

                });

        }
}
// ==========================================
    // PREPARAR EDIÇÃO
    // ==========================================

    function editarPessoa(pessoa) {

        setIdEditando(pessoa.id);

        setNome(pessoa.nome);

        setCpf(pessoa.cpf);

        // Vai para o formulário
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==========================================
    // EXCLUIR
    // ==========================================

    function excluirPessoa(id) {

        const confirmar = window.confirm(
            "Deseja realmente excluir esta pessoa?"
        );

        if (!confirmar) {
            return;
        }


        fetch(`http://localhost:3010/pessoas/${id}`, {

            method: "DELETE"

        })

            .then((resposta) => resposta.json())

            .then((dados) => {

                alert(dados.mensagem);

                buscarPessoas();

            })

            .catch((erro) => {

                console.log("Erro:", erro);

            });

    }


    // ==========================================
    // LIMPAR FORMULÁRIO
    // ==========================================

    function limparFormulario() {

        setNome("");

        setCpf("");

        setIdEditando(null);

    }


  return (
    <>
     <div className='pagina'>
      <Menu />
      <section className='conteudo'>
        <h1>Sistema de cadastro</h1>
        <p> Dados carregado diretamento do banco de dados através de API</p>
      </section>
      <section className='formulario'>
          <h2> {idEditando ? "Editar Pessoa" : "Cadastrar Pessoa"} </h2>


                    <form onSubmit={salvarPessoa}>


                        <div className="campo">

                            <label>
                                Nome
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(evento) =>
                                    setNome(evento.target.value)
                                }
                                placeholder="Digite o nome"
                                required
                            />

                        </div>


                        <div className="campo">

                            <label>
                                CPF
                            </label>

                            <input
                                type="text"
                                value={cpf}
                                onChange={(evento) =>
                                    setCpf(evento.target.value)
                                }
                                placeholder="Digite o CPF"
                                required
                            />

                        </div>


                        <div className="botoes">

                            <button
                                type="submit"
                                className="botao salvar"
                            >

                                {idEditando
                                    ? "Atualizar"
                                    : "Cadastrar"
                                }

                            </button>


                            {idEditando && (

                                <button
                                    type="button"
                                    className="botao cancelar"
                                    onClick={limparFormulario}
                                >

                                    Cancelar

                                </button>

                            )}

                        </div>


                    </form>

      </section>
      <section id="pessoas" className='pessoas'>
        <h2>Pessoas Cadastradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
            </tr>
           </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                    <td>{pessoa.id}</td>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.cpf}</td>
                    <td>
                        
                                        <button
                                            className="botao editar"
                                            onClick={() =>
                                                editarPessoa(pessoa)
                                            }
                                        >
                                            Editar
                                        </button>


                                        <button
                                            className="botao excluir"
                                            onClick={() =>
                                                excluirPessoa(pessoa.id)
                                            }
                                        >
                                            Excluir
                                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
         
        </table>
      </section>
      <Rodape />
     </div>
    </>
  )
}

export default App
