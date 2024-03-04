import { Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { SubscriptionsManagerService } from '../../services/subscriptions-manager/subscriptions-manager.service';
import { tap } from 'rxjs';
import { UserInfoService } from '../../services/user-info/user-info.service';
import { environment } from 'src/environments/environment';
import { ColorService } from '../../services/color-service/color.service';

@Component({
  selector: 'auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnDestroy {
  // Inject the authentication service into your component through the constructor

  colorMenuButton!:string;
  objcolors = environment.colors

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private subsManager: SubscriptionsManagerService,
    private cs : ColorService,) {
      cs.color_msg.subscribe(color =>  {
        if (color=='azul') {
          this.colorMenuButton = this.objcolors.azul.colorMenuButton;
        }
        else if (color=='verde') {
          this.colorMenuButton = this.objcolors.verde.colorMenuButton;
        }
        else if (color=='naranjo') {

          this.colorMenuButton = this.objcolors.naranjo.colorMenuButton;
        }
      })
    }

  ngOnDestroy(): void {
    this.subsManager.unsubscribeAll();
  }

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home',
      },
    });
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
        target: '/formulario',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
