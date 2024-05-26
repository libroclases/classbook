import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { DOCUMENT } from '@angular/common';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { SubscriptionsManagerService } from '../../services/subscriptions-manager/subscriptions-manager.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  // Inject the authentication service into your component through the constructor

  colorMenuButton!:string;
  objcolors = environment.colors

  color!:string;
  url!:string;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  constructor(
    public auth: AuthService,
    private subsManager: SubscriptionsManagerService,
    ) {


    }
  ngOnInit(): void {
    const getColor = (color:string | null) => {
      
      if (color=='primary' || !color) {
        this.colorMenuButton = this.objcolors.primary.colorMenuButton;
      }
      else if (color=='success') {
        this.colorMenuButton = this.objcolors.success.colorMenuButton;
      }
      else if (color=='info') {

        this.colorMenuButton = this.objcolors.info.colorMenuButton;
      }

    }
    this.usuario$.subscribe((info:any) => {
      if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
      else { getColor(localStorage.getItem('Color')) }
    }
   )
  }


  ngOnDestroy(): void {
    this.subsManager.unsubscribeAll();
  }

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home',
      },
    })
  }

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/registro_usuario',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
