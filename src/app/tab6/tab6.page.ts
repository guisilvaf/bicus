import { Component, OnInit } from '@angular/core';
import { CADASTROS } from "../listaCadastro";
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})

export class Tab6Page implements OnInit {
	public userData ={
		email: null,
		senha: null
	};
	private workerCPF;
	public workerData = [];
	
  
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { 

    this.route.params.subscribe(params => this.workerCPF = params.workerCPF);
  }

  ngOnInit() {

    let userCPF = localStorage.getItem('userId');
    this.getUser(userCPF);

  }  

  getUser(cpf) {
  	this.usersService.getUserByCPF(cpf)
  	.subscribe(user => this.userData = user);
  }

  recoveryPassword(){
  	this.usersService.recoveryPassword(this.userData.email, this.userData.senha)
  	.subscribe(() => {
  	 	alert("O email com sua senha foi enviado!");
  	});
  	console.log(this.userData.email);
  }
}