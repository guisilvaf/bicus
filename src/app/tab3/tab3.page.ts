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
    image: null,
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
    value = value.replace(/[^\d]+/g,'');// retirando todos os caracteres adicinados pela máscara
    if( value.length != 11||
        value === '12345678909'||
        value === '00000000000'||
        value === '11111111111'||
        value === '22222222222'||
        value === '33333333333'||
        value === '44444444444'||
        value === '55555555555'||
        value === '66666666666'||
        value === '77777777777'||
        value === '88888888888'||
        value === '99999999999') {  return alert('CPF Inválido!!'); }

        //validando 1º dígito verificador do cpf
        let digitoVerificador;
        let divisaoResto;
        let calculo = 0;
        for(let i = 0; i < 9; i++) {
          calculo += parseInt(value.charAt(i)) * (10 - i);
          divisaoResto = calculo % 11;
          if (Math.trunc(divisaoResto) < 2){
            digitoVerificador = 0;
          }	else if( Math.trunc(divisaoResto) >= 2){
            digitoVerificador = 11 - divisaoResto;
          }
        }
        //validando 2º dígito verificador do cpf
        let digitoVerificador2;
        let divisaoResto2;
        let calculo2 = 0;
        for(let i = 0; i < 10; i++) {
          calculo2 += parseInt(value.charAt(i)) * (11 - i);
          divisaoResto2 = calculo2 % 11;
          if (Math.trunc(divisaoResto2) < 2){
            digitoVerificador2 = 0;
          }	else if( Math.trunc(divisaoResto2) >= 2){
            digitoVerificador2 = 11 - divisaoResto2;
          }
        }
        //Agora verificar se cpf é válido de acordo com o algoritmo.
        if(digitoVerificador !== parseInt(value.charAt(9)) && digitoVerificador2 !== parseInt(value.charAt(10))){
          alert('CPF Inválido!!');
        }	else {
          alert ('CPF Válido!!');
        }

  }
}
