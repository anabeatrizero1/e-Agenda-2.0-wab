import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.inerface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefas.repository.local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtDescricao: HTMLInputElement;
  private rdbPrioridade: HTMLInputElement; 
  private btnSalvar: HTMLButtonElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa >) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => this.gravarRegistro());
  }
  
  gravarRegistro(): void {
    this.rdbPrioridade = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;

    const prioridade = this.rdbPrioridade.value as Prioridade;

    const tarefa = new Tarefa(this.txtDescricao.value, prioridade);

    this.repositorioTarefas.inserir(tarefa);

    window.location.href = "tarefa.list.html"
  }
}
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage());
