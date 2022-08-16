import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.inerface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositoryLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel {
  private readonly localStorage: Storage;

  private readonly contatos: Contato[];
  
  constructor(){
    this.localStorage = window.localStorage;

    this.contatos = this.selecionarTodos();
  }
  
  public gravar(): void {
    const contatosJsonString = JSON.stringify(this.contatos);

    this.localStorage.setItem("contatos", contatosJsonString);
  }
  public inserir(registro: Contato): void {
    this.contatos.push(registro);
    this.gravar();
  }
  public selecionarTodos(): Contato[] {
    const dados = this.localStorage.getItem("contatos");

    if(!dados)
      return [];

    return JSON.parse(dados);
  }

  selecionarPorId(id: string): Contato | undefined {
    return this.contatos.find(x => x.id === id);
  }
}