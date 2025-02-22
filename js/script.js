let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

document.addEventListener("DOMContentLoaded", () => {
  AdicionarReceitasPainel();
  AdicionarDespesasPainel();
  listarRegistros();
});

// Criar inputs para receitas
function AdicionarReceitasPainel() {
  document.getElementById("adicionarReceitas").innerHTML = `
    <h3>Receitas</h3>
    <input id="inp_descricao_receita" placeholder="Descrição">
    <input id="inp_valor_receita" type='number' placeholder="Valor">
    <input id="inp_data_receita" type="date">
    <button onclick="adicionarReceita()">Adicionar Receita</button>
  `;
}

// Criar inputs para despesas
function AdicionarDespesasPainel() {
  document.getElementById("adicionarDespesas").innerHTML = `
    <h3>Despesas</h3>
    <input id="inp_descricao_despesa" placeholder="Descrição">
    <input id="inp_valor_despesa" type='number' placeholder="Valor">
    <input id="inp_data_despesa" type="date">
    <button onclick="adicionarDespesa()">Adicionar Despesa</button>
  `;
}

// Adicionar Receita
function adicionarReceita() {
  let descricao = document.getElementById("inp_descricao_receita").value;
  let valor = Number(document.getElementById("inp_valor_receita").value);
  let data = document.getElementById("inp_data_receita").value;

  if (descricao && valor > 0 && data) {
    receitas.push({ descricao, valor, data });
    localStorage.setItem("receitas", JSON.stringify(receitas));
    listarRegistros();
  } else {
    alert("Preencha todos os campos corretamente!");
  }
}

// Adicionar Despesa
function adicionarDespesa() {
  let descricao = document.getElementById("inp_descricao_despesa").value;
  let valor = Number(document.getElementById("inp_valor_despesa").value);
  let data = document.getElementById("inp_data_despesa").value;

  if (descricao && valor > 0 && data) {
    despesas.push({ descricao, valor, data });
    localStorage.setItem("despesas", JSON.stringify(despesas));
    listarRegistros();
  } else {
    alert("Preencha todos os campos corretamente!");
  }
}

// Listar Registros com filtro por data
function listarRegistros() {
  let filtro = document.getElementById("filtro").value;
  let mostrarReceitas = document.getElementById("mostrarReceitas");
  let mostrarDespesas = document.getElementById("mostrarDespesas");
  let balanco = 0;

  mostrarReceitas.innerHTML = `<table class="table"><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Ações</th></tr>`;
  if (filtro === "tudo" || filtro === "receitas") {
    receitas.forEach((receita, i) => {
      balanco += receita.valor;
      mostrarReceitas.innerHTML += `
        <tr>
          <td>${receita.data}</td>
          <td>${receita.descricao}</td>
          <td>R$ ${receita.valor.toFixed(2)}</td>
          <td>
            <button onclick="excluirRegistro(${i}, 'receita')">Excluir</button>
          </td>
        </tr>`;
    });
  }
  mostrarReceitas.innerHTML += "</table>";

  mostrarDespesas.innerHTML = `<h3>Despesas</h3><table class="table"><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Ações</th></tr>`;
  if (filtro === "tudo" || filtro === "despesas") {
    despesas.forEach((despesa, i) => {
      balanco -= despesa.valor;
      mostrarDespesas.innerHTML += `
        <tr>
          <td>${despesa.data}</td>
          <td>${despesa.descricao}</td>
          <td>R$ ${despesa.valor.toFixed(2)}</td>
          <td>
            <button onclick="excluirRegistro(${i}, 'despesa')">Excluir</button>
          </td>
        </tr>`;
    });
  }
  mostrarDespesas.innerHTML += "</table>";

  document.getElementById("balanco").innerText = `R$ ${balanco.toFixed(2)}`;
}

// Excluir Registro
function excluirRegistro(index, tipo) {
  if (confirm("Tem certeza que deseja excluir este registro?")) {
    if (tipo === "receita") {
      receitas.splice(index, 1);
      localStorage.setItem("receitas", JSON.stringify(receitas));
    } else {
      despesas.splice(index, 1);
      localStorage.setItem("despesas", JSON.stringify(despesas));
    }
    listarRegistros();
  }
}
