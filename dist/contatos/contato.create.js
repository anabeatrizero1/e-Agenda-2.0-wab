import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contatos.repository.local-storage.js";
class ContatoPaginaCadastro {
    constructor(repositorioContatos, id) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);
            if (contatoSelecionado) {
                this.preencherFormulario(contatoSelecionado);
            }
        }
    }
    preencherFormulario(contatoSelecionado) {
        this.txtNome.value = contatoSelecionado.nome;
        this.txtEmail.value = contatoSelecionado.email;
        this.txtTelefone.value = contatoSelecionado.telefone;
        this.txtEmpresa.value = contatoSelecionado.empresa;
        this.txtCargo.value = contatoSelecionado.cargo;
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
        const contato = this.obterDadosFormularario();
        if (!this.idSelecionado)
            this.repositorioContatos.inserir(contato);
        else
            this.repositorioContatos.editar(contato.id, contato);
        window.location.href = "contato.list.html";
    }
    obterDadosFormularario() {
        const nome = this.txtNome.value;
        const email = this.txtEmail.value;
        const telefone = this.txtTelefone.value;
        const empresa = this.txtEmpresa.value;
        const cargo = this.txtCargo.value;
        let contato = null;
        if (!this.idSelecionado)
            contato = new Contato(nome, email, telefone, empresa, cargo);
        else
            contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);
        return contato;
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
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);
// function verificarRegistro(contato: Contato): boolean {
//   if (this.IsEmail(contato.email) && this.IsFone(contato.telefone)) {
//     return true;   
//   }else{
//     return false;
//   }
// }
