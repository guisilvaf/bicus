import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public data = {
    email: null,
    password: null
  };

  constructor(private usersService: UsersService) {}

  public doLogin() {
    this.usersService.login(this.data)
    .subscribe(user => {
      if(!user) {
        return alert('Usuário ou senha incorreta.');
      }
      
      localStorage.setItem('userId', user.cpf);
      location.href='/tabs/tab5';
    });
  }
}
