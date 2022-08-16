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
        if (this.IsEmail(contato.email) && this.IsFone(contato.telefone)) {
            this.repositorioContatos.inserir(contato);
            window.location.href = "contato.list.html";
        }
        else {
            console.log("Email ou telefone está inválidos");
        }
    }
    IsFone(numero) {
        var regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
        return regex.test(numero);
    }
    IsEmail(email) {
        var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return emailPattern.test(email);
    }
}
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage());
