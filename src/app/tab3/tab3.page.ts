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
    phone: null,
    speciality: null
  };

  public works = [];

  constructor(private usersService: UsersService) {
    this.usersService.getWorks()
    .subscribe(works => this.works = works);
  }

  changeSpeciality(specialityId) {
    // Desmarcando especialidade.
    if(this.data.speciality == specialityId) {
      this.data.speciality = null;
      return;
    }

    this.data.speciality = specialityId;
  }

  signUp() {
    this.usersService.addUser(this.data)
    .subscribe();
  }

}
