import { Component, OnInit } from '@angular/core';
import { DatastoreService } from './services/datastore.service';
import { AuthenticationService } from './services/authentication.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { UserI } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Task';
  currentUser: UserI;

  constructor(
    private api: DatastoreService,
    private auth: AuthenticationService
  ) {
    this.auth.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    // this.api.apiData().subscribe(data => console.log('API Data => ', data));
  }
}
