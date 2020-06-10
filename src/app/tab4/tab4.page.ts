import { Component } from "@angular/core";
import { CADASTROS } from "../listaCadastro";
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"]
})
export class Tab4Page {
  public userData = [];
  private workerCPF;
  public workerData = [];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { 
    // Pegar cpf passado pela url do trabalhador selecionado.
    this.route.params.subscribe(params => this.workerCPF = params.workerCPF);
  }

  ngOnInit() {
    if(!localStorage.getItem('userId')) {
      return location.href='tabs/tab2';
    }

    // Pegar dados do usuário logado.
    let userCPF = localStorage.getItem('userId');
    this.getUser(userCPF);

    // Pegar dados do trabalhador selecionado.
    this.getWorker(this.workerCPF);
  }  

  getUser(cpf) {
    this.usersService.getUserByCPF(cpf)
    .subscribe(user => this.userData = user);
  }

  getWorker(cpf) {
    this.usersService.getUserByCPF(cpf)
    .subscribe(user => this.workerData = user);
  }


}
