import { Component, OnInit } from '@angular/core';
import { CADASTROS } from "../listaCadastro";
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})

export class Tab6Page {
	public data = {
    cpf: null
  };
	
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { }  

  recoveryPassword(){
    this.usersService.getUserByCPF(this.data.cpf)
  	.subscribe(user => {
      this.usersService.recoveryPassword(user.email, user.senha)
      .subscribe(() => {
       	alert("O email com sua senha foi enviado!");
      });
    });
  }
}