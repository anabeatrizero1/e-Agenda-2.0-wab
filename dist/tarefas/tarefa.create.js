import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefas.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
            if (tarefaSelecionada) {
                this.preencherFormulario(tarefaSelecionada);
            }
        }
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtDescricao.value = tarefaSelecionada.descricao;
        switch (tarefaSelecionada.prioridade) {
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Media:
                this.rdbPrioridade = document.querySelector("input[value='Média']");
                break;
            case Prioridade.Alta:
                this.rdbPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rdbPrioridade.checked = true;
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistro());
    }
    gravarRegistro() {
        const tarefa = this.obterDadosFormularario();
        if (!this.idSelecionado)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    obterDadosFormularario() {
        const descricao = this.txtDescricao.value;
        const prioridade = this.obterPrioridadeSelecionada();
        let tarefa = null;
        if (!this.idSelecionado)
            tarefa = new Tarefa(descricao, prioridade);
        else
            tarefa = new Tarefa(descricao, prioridade, this.idSelecionado);
        return tarefa;
    }
    obterPrioridadeSelecionada() {
        const rdbPrioridade = document.querySelector("input[type='radio']:checked");
        return rdbPrioridade.value;
    }
}
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);
