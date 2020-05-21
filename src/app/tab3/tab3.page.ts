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
    phone: null,
    speciality: null,
    preco: null,
    descricao: null,
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
  
  } else if(display === document.getElementById('profissional')){
      //abas disponíveis além das já existentes para cadastro como profissional.
      document.getElementById('atuação').style.display = 'block'
      document.getElementById('work').style.display = 'block';
      document.getElementById('preco').style.display = 'block';
      document.getElementById('descricao').style.display = 'block';
  }
}
}

