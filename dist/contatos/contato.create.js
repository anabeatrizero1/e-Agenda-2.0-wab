import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contatos.repository.local-storage.js";
class ContatoPaginaCadastro {
    constructor(repositorioContatos) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
    }
    configurarElementos() {
        this.txtNome = document.getElementById("txtNome");
        this.txtEmail = document.getElementById("txtEmail");
        this.txtTelefone = document.getElementById("txtTelefone");
        this.txtEmpresa = document.getElementById("txtEmpresa");
        this.txtCargo = document.getElementById("txtCargo");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistro());
    }
    gravarRegistro() {
        const contato = new Contato(this.txtNome.value, this.txtEmail.value, this.txtTelefone.value, this.txtEmpresa.value, this.txtCargo.value);
        this.repositorioContatos.inserir(contato);
        window.location.href = "contato.list.html";
    }
}
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage());
