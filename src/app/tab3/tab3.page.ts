import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public data = {
    cpf: null,
    username: null,
    born: null,
    email: null,
    password: null,
    gender: 'masculino',
    civil: 'solteiro(a)',
    cell: null,
    bairro: null,
    city: null,
    uf: null,
    numero: null,
    complemento: null,
    phone: null,
    speciality: null,
    price: null,
    desc: null,
    availability: null,
    endereco: null,
    cep: null
  };

  public works = [];

  constructor(private usersService: UsersService) {
    this.usersService.getWorks()
    .subscribe(works => this.works = works);
  }

  changeSpeciality(specialityId) {
    // Desmarcando especialidade.
    if(this.data.speciality == specialityId) {
      this.data.speciality = null;
      return;
    }
    this.data.speciality = specialityId;
  }

  signUp() {
    console.log(this.data.cpf);
    this.usersService.addUser(this.data)
    .subscribe();
  }

  ocultarMostrarElemento(el) {
    let display = document.getElementById(el);
    if(display === document.getElementById('cliente')){
      //abas que serão ocultas ao se escolher cadastro como cliente.
      document.getElementById('atuação').style.display = 'none'
      document.getElementById('work').style.display = 'none'
      document.getElementById('preco').style.display = 'none'
      document.getElementById('descricao').style.display = 'none';
      document.getElementById('disponibilidade').style.display = 'none';
      document.getElementById('profissionais').style.display = 'none';
  
  } else if(display === document.getElementById('profissional')){
      //abas disponíveis além das já existentes para cadastro como profissional.
      document.getElementById('atuação').style.display = 'block'
      document.getElementById('work').style.display = 'block';
      document.getElementById('preco').style.display = 'block';
      document.getElementById('descricao').style.display = 'block';
      document.getElementById('disponibilidade').style.display = 'block';
      document.getElementById('profissionais').style.display = 'block';
  }
}

  validaCPF(){
    let value = (<HTMLSelectElement>document.getElementById('cpf')).value;
    if( value.length != 14||
        value === '123.456.789-09'||
        value === '000.000.000-00'|| 
        value === '111.111.111-11'||
        value === '222.222.222-22'||
        value === '333.333.333-33'||
        value === '444.444.444-44'||
        value === '555.555.555-55'||
        value === '666.666.666-66'||
        value === '777.777.777-77'||
        value === '888.888.888-88'||
        value === '999.999.999-99') {  alert("False CPF") }
  }
}