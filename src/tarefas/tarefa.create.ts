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

  private idSelecionado: string;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?: string) {
    this.configurarElementos();

    if(id){
      this.idSelecionado = id;

      const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);

      if(tarefaSelecionada){
        this.preencherFormulario(tarefaSelecionada);
      }
    }
  }
  preencherFormulario(tarefaSelecionada: Tarefa) {
    this.txtDescricao.value = tarefaSelecionada.descricao;

    switch(tarefaSelecionada.prioridade){
      case Prioridade.Baixa:
        this.rdbPrioridade = document.querySelector("input[value='Baixa']") as HTMLInputElement;
        break;
      case Prioridade.Media:
        this.rdbPrioridade = document.querySelector("input[value='Média']") as HTMLInputElement;
        break;
      case Prioridade.Alta:
        this.rdbPrioridade = document.querySelector("input[value='Alta']") as HTMLInputElement;
        break;
    }
    this.rdbPrioridade.checked = true;
  }

  configurarElementos(): void {
    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => this.gravarRegistro());
  }
  
  gravarRegistro(): void {
    const tarefa = this.obterDadosFormularario();

    if(!this.idSelecionado)
      this.repositorioTarefas.inserir(tarefa);
    else
      this.repositorioTarefas.editar(tarefa.id, tarefa);
    
    window.location.href = "tarefa.list.html";
  }
 
  private obterDadosFormularario(): Tarefa{
    const descricao = this.txtDescricao.value;
    const prioridade = this.obterPrioridadeSelecionada();

    let tarefa = null;
 
    if(!this.idSelecionado)
      tarefa = new Tarefa(descricao, prioridade);
    else
      tarefa = new Tarefa(descricao,prioridade, this.idSelecionado);
    
    return tarefa;
  }

  private obterPrioridadeSelecionada(): Prioridade {
    const rdbPrioridade = document.querySelector("input[type='radio']:checked") as HTMLInputElement;

    return rdbPrioridade.value as Prioridade;
  }
}

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id") as (string);

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);
