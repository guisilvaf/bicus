import { Component } from "@angular/core";
import { CADASTROS } from "../listaCadastro";
import { UsersService } from '../services/users.service';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})

export class Tab1Page {
  public workers: any = [];
  public srWorkers: any = [];

  constructor(private usersService: UsersService) {
    this.getWorkers();
  }
  
  filterEspeciality(ev: any){
    this.usersService.getWorkers();
    const val = ev.target.value;

    this.srWorkers = this.workers.filter((worker) => {
      return (worker.especialidade.toLowerCase().indexOf(val.toLowerCase())>-1);
    })

    if(!this.srWorkers.length) return this.srWorkers = this.workers;
  }
  
  getWorkers() {
    this.usersService.getWorkers()
    .subscribe(workers => {
      this.workers = workers;
      this.srWorkers = this.workers;
    });
  }
}