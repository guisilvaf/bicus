import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public data = {
    username: null,
    born: '1995-02-20',
    email: null,
    password: null,
    cell: null,
    phone: null
  };

  constructor(private usersService: UsersService) {
    this.usersService.getWorks()
    .subscribe(info => console.log(info));
  }

  signUp() {
    this.usersService.addUser(this.data)
    .subscribe();
  }

}
