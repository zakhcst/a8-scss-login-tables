import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewChecked
} from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { policiesI } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent
  implements OnInit, AfterViewChecked {
  policies: policiesI[];
  scrollbarWidth = 0;
  viewReady = false;

  @ViewChild('currentstatusheader', { static: true })
  currentStatusHeader: ElementRef;
  @ViewChild('currentstatuscontent', { static: true })
  currentStatusContent: ElementRef;
  @HostListener('window:resize', ['$event']) onResize() {
    this.hasScrollbar();
  }

  constructor(private api: DatastoreService, private route: ActivatedRoute) {}

  /* Page Tasks:
   *
   *  1) Connect and take the data from the API - use getPolicies function to retrieve the data
   *  2) Create one layer table witch will display the income data
   *  3) Table must contain the following columns:
   *
   *    ==> num, amount, description
   *
   *  3) Style the page;
   *  4) Header must be vissible for this page;
   *
   */

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.policies = data.policies;
    });
  }

  ngAfterViewChecked() {
    if (!this.viewReady) {
      this.hasScrollbar();
    }
  }

  hasScrollbar() {
    const headerFirstChild = this.currentStatusHeader.nativeElement
      .firstElementChild;
    const contentFirstChild = this.currentStatusContent.nativeElement
      .firstElementChild;
    if (headerFirstChild && contentFirstChild) {
      this.viewReady = true;
      setTimeout(() => {
        this.scrollbarWidth = headerFirstChild.clientWidth - contentFirstChild.clientWidth;
      }, 0);
    }
  }
}
