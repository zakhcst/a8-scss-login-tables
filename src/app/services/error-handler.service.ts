import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector, private ngZone: NgZone) { }

  handleError(error) {
    const router = this.injector.get(Router);
    const message = 'Error: Contact support with the following message:';
    console.log(message);
    console.log(error);
    window.alert(message + error);

    this.ngZone.run(() => router.navigate(['log-in']));
  }
}
