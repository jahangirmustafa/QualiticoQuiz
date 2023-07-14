import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html'
})
export class DashboardComponent {

  constructor( private authService: AuthService, private userService: UserService) {
    
  }

  ngOnInit() {
    debugger;
    this.userService.getAllUser().subscribe((res) => {
      debugger;
    });
  }

}
