import { Component } from "@angular/core";
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab5",
  templateUrl: "tab5.page.html",
  styleUrls: ["tab5.page.scss"]
})
export class Tab5Page {
  public userData = {};

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    let userCPF = localStorage.getItem('userId');
    this.getUser(userCPF);
  }

  getUser(cpf) {
    this.usersService.getUserByCPF(cpf)
    .subscribe(user => this.userData = user);
  }
}