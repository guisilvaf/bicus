import { Component } from "@angular/core";
import { CADASTROS } from "../listaCadastro";
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"]
})
export class Tab4Page {
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
