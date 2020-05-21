import { Component } from "@angular/core";
import { CADASTROS } from "../listaCadastro";
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  public workers = [];

  constructor(private usersService: UsersService) {
    this.getWorkers();
  }

  getWorkers() {
    this.usersService.getWorkers()
    .subscribe(workers => {
      this.workers = workers;
    });
  }
}
