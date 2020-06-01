import { Component } from "@angular/core";
import { CADASTROS } from "../listaCadastro";
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab5",
  templateUrl: "tab5.page.html",
  styleUrls: ["tab5.page.scss"]
})
export class Tab5Page {
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