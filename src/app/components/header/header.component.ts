import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserI } from 'src/app/app.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public routeLinks: Array<any>;
  subscription: Subscription;
  currentUser: UserI;


  constructor(private auth: AuthenticationService) {
    this.routeLinks = [
      { label: 'Current Status', link: 'current-status' },
      { label: 'Nested Data', link: 'nested-data' },
    ];
  }

  ngOnInit() {
    this.subscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  logout() {
    this.auth.logout();
  }
}
