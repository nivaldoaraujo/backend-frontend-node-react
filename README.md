# 🧑‍💻 Sistema de Cadastro de Pessoas

Aplicação web desenvolvida com **React + Vite**, integrada a uma **API REST**, permitindo realizar operações de cadastro, consulta, atualização e exclusão de pessoas.

O projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento **Front-end**, consumo de **APIs REST**, utilização de **Hooks do React** e operações de **CRUD**.

---

## 👨‍💻 Autor

**Nivaldo Batista de Araújo**

Projeto desenvolvido para fins de estudo e prática em desenvolvimento de aplicações web.

---

## 📋 Sobre o Projeto

O sistema permite cadastrar e gerenciar pessoas através de uma interface desenvolvida em React.

Cada pessoa possui os seguintes dados:

* ID
* Nome
* CPF

A aplicação React realiza requisições HTTP para uma API REST responsável pelo acesso e gerenciamento dos dados.

---

## ✨ Funcionalidades

* ✅ Listar pessoas cadastradas
* ✅ Cadastrar uma nova pessoa
* ✅ Editar uma pessoa
* ✅ Atualizar os dados de uma pessoa
* ✅ Excluir uma pessoa
* ✅ Limpar o formulário
* ✅ Confirmação antes da exclusão
* ✅ Integração com API REST
* ✅ Atualização da lista após as operações
* ✅ Interface utilizando componentes React

---

## 🛠️ Tecnologias utilizadas

### Front-end

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Comunicação com a API

* Fetch API
* HTTP
* API REST
* JSON

### Ferramentas

* Visual Studio Code
* Node.js
* npm
* Git
* GitHub

---

## 📦 Dependências

As principais dependências utilizadas no projeto são:

```bash
npm install react react-dom
```

Para o ambiente de desenvolvimento:

```bash
npm install -D vite
```

> As versões exatas das dependências podem ser consultadas no arquivo `package.json`.

---

## 📁 Estrutura do Projeto

```text
projeto-cadastro/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Menu.jsx
│   │   └── Rodape.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
└── README.md
```

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm
* Git

Verifique as versões instaladas:

```bash
node -v
```

```bash
npm -v
```

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará a aplicação em um endereço semelhante a:

```text
http://localhost:5173
```

Abra o endereço no navegador.

---

# 🔌 Integração com o Backend

O Front-end utiliza uma API REST responsável pelo gerenciamento dos dados.

A API está configurada para utilizar a porta:

```text
3010
```

Endpoint principal:

```text
http://localhost:3010/pessoas
```

A comunicação entre React e Backend é realizada utilizando a função `fetch()`.

---

# 🔄 Operações CRUD

O projeto utiliza as quatro operações principais de uma API REST.

| Operação  | Método HTTP | Endpoint       | Função                 |
| --------- | ----------- | -------------- | ---------------------- |
| Listar    | GET         | `/pessoas`     | Busca todas as pessoas |
| Cadastrar | POST        | `/pessoas`     | Cadastra uma pessoa    |
| Atualizar | PUT         | `/pessoas/:id` | Atualiza uma pessoa    |
| Excluir   | DELETE      | `/pessoas/:id` | Exclui uma pessoa      |

---

## 📥 GET — Listar pessoas

Utilizado para buscar as pessoas cadastradas.

```javascript
fetch("http://localhost:3010/pessoas")
  .then((resposta) => resposta.json())
  .then((dados) => {
    setPessoas(dados)
  })
```

---

## ➕ POST — Cadastrar pessoa

Utilizado para inserir uma nova pessoa.

```javascript
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
```

Exemplo de dados enviados:

```json
{
  "nome": "João da Silva",
  "cpf": "12345678900"
}
```

---

## ✏️ PUT — Atualizar pessoa

Quando o usuário seleciona uma pessoa para edição, o sistema utiliza o ID da pessoa.

```javascript
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
```

---

## 🗑️ DELETE — Excluir pessoa

Para excluir uma pessoa:

```javascript
fetch(`http://localhost:3010/pessoas/${id}`, {
  method: "DELETE"
})
```

Antes da exclusão, o sistema solicita uma confirmação ao usuário:

```javascript
const confirmar = window.confirm(
  "Deseja realmente excluir esta pessoa?"
)
```

---

# ⚛️ React Hooks

O projeto utiliza principalmente os Hooks `useState` e `useEffect`.

## useState

O `useState` é utilizado para controlar os dados da aplicação.

Exemplo:

```javascript
const [pessoas, setPessoas] = useState([])
```

Campos do formulário:

```javascript
const [nome, setNome] = useState("")
const [cpf, setCpf] = useState("")
```

Controle da edição:

```javascript
const [idEditando, setIdEditando] = useState(null)
```

---

## useEffect

O `useEffect` é utilizado para executar a busca dos dados quando o componente é carregado.

```javascript
useEffect(() => {
  buscarPessoas()
}, [])
```

---

# 🧩 Componentização

O projeto utiliza componentes para organizar a interface.

## Menu

Arquivo:

```text
src/components/Menu.jsx
```

Responsável pelo menu de navegação.

## Rodape

Arquivo:

```text
src/components/Rodape.jsx
```

Responsável pelo rodapé da aplicação.

## App

Arquivo:

```text
src/App.jsx
```

É o componente principal da aplicação.

Responsável por:

* Controlar os estados;
* Buscar os dados;
* Cadastrar pessoas;
* Editar pessoas;
* Atualizar pessoas;
* Excluir pessoas;
* Exibir os dados;
* Controlar o formulário.

---

# 📝 Formulário

O formulário possui os campos:

### Nome

```jsx
<input
  type="text"
  value={nome}
  onChange={(evento) =>
    setNome(evento.target.value)
  }
  placeholder="Digite o nome"
  required
/>
```

### CPF

```jsx
<input
  type="text"
  value={cpf}
  onChange={(evento) =>
    setCpf(evento.target.value)
  }
  placeholder="Digite o CPF"
  required
/>
```

O atributo `required` determina que os campos devem ser preenchidos antes do envio.

---

# 📊 Exibição dos dados

Os dados recebidos da API são armazenados no estado:

```javascript
const [pessoas, setPessoas] = useState([])
```

O método `map()` é utilizado para apresentar os dados na tabela:

```jsx
{pessoas.map((pessoa) => (
  <tr key={pessoa.id}>
    <td>{pessoa.id}</td>
    <td>{pessoa.nome}</td>
    <td>{pessoa.cpf}</td>
  </tr>
))}
```

---

# 🔁 Fluxo da aplicação

A arquitetura básica do projeto funciona da seguinte maneira:

```text
┌─────────────────┐
│     Usuário     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React / Vite   │
└────────┬────────┘
         │
         │ Fetch API
         ▼
┌─────────────────┐
│    API REST     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Banco de Dados  │
└─────────────────┘
```

---

# ➕ Fluxo de cadastro

```text
Formulário
    │
    ▼
   POST
    │
    ▼
   API
    │
    ▼
Banco de Dados
    │
    ▼
   GET
    │
    ▼
Atualização da tabela
```

---

# ✏️ Fluxo de edição

```text
Botão Editar
    │
    ▼
Carrega os dados
    │
    ▼
Formulário
    │
    ▼
   PUT
    │
    ▼
   API
    │
    ▼
Banco de Dados
    │
    ▼
Atualização da lista
```

---

# 🗑️ Fluxo de exclusão

```text
Botão Excluir
    │
    ▼
Confirmação
    │
    ▼
  DELETE
    │
    ▼
   API
    │
    ▼
Banco de Dados
    │
    ▼
Atualização da lista
```

---

# 🗄️ Banco de Dados

O React não acessa diretamente o banco de dados.

A comunicação ocorre através do Backend:

```text
React
  ↓
Fetch API
  ↓
Backend
  ↓
API REST
  ↓
Banco de Dados
```

Essa separação permite organizar melhor as responsabilidades da aplicação.

---

# ⚠️ Solução de problemas

## API não encontrada

Caso apareça:

```text
Failed to fetch
```

verifique se o Backend está executando.

O endereço esperado é:

```text
http://localhost:3010
```

---

## Pessoas não aparecem na tabela

Teste o endpoint diretamente no navegador ou no Postman:

```text
http://localhost:3010/pessoas
```

A API deverá retornar um JSON semelhante a:

```json
[
  {
    "id": 1,
    "nome": "João da Silva",
    "cpf": "12345678900"
  },
  {
    "id": 2,
    "nome": "Maria Oliveira",
    "cpf": "98765432100"
  }
]
```

---

# 🔐 Boas práticas

Para projetos reais, recomenda-se utilizar variáveis de ambiente para armazenar a URL da API.

Arquivo `.e
