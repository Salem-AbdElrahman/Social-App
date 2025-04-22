import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
private readonly usersService=inject(UsersService)

signOut():void{
this.usersService.logOut()
}
}
