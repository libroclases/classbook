import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuth0Loading$ = this.authService.isLoading$;
  isAuthenticated$ = this.authService.isAuthenticated$;
  title = 'ng-libro';



  constructor(private authService: AuthService, private router: Router ) {}
  ngOnInit(): void {
    // this.router.navigate(['home'])
  }

}
