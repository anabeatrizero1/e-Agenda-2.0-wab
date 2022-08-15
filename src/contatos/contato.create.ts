import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.inerface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contatos.repository.local-storage.js";

class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement; 
  private txtTelefone: HTMLInputElement; 
  private txtEmpresa: HTMLInputElement; 
  private txtCargo: HTMLInputElement; 
  private btnSalvar: HTMLButtonElement;

  constructor(private repositorioContatos: IRepositorio<Contato>){
    this.configurarElementos();
  }
  
  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => this.gravarRegistro());
    

  }
  gravarRegistro(): void {
    const contato = new Contato
    ( this.txtNome.value, 
      this.txtEmail.value,
      this.txtTelefone.value,
      this.txtEmpresa.value,
      this.txtCargo.value );

      if(this.IsEmail(contato.email) && this.IsFone(contato.telefone) ){
        this.repositorioContatos.inserir(contato);
        window.location.href = "contato.list.html"
      }else{
        console.log("Email ou telefone está inválidos");

      }

  }

  private IsFone(numero: string) {
    var regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
    return regex.test(numero);
  }

  private IsEmail(email: string){
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email); 
  }
}
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage());