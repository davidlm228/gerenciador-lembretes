import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authenticationService:AuthenticationService,
    private router: Router
  ) { }

  signOut() {
    this.authenticationService.SignOut();
    this.router.navigate(['']);
  }



  ngOnInit() {
  }

}
