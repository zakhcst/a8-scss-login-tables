import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewChecked
} from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { policiesI, policiesDetailsI } from 'src/app/app.models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nested-data',
  templateUrl: './nested-data.component.html',
  styleUrls: ['./nested-data.component.scss']
})
export class NestedDataComponent
  implements OnInit, AfterViewChecked {
  policies: policiesI[];
  subsciption: Subscription;
  scrollbarWidth = 0;
  viewReady = false;
  showDetails = {};
  policyDetails: policiesDetailsI[];
  selectedPolicyInd: number | null;

  @ViewChild('nesteddataheader', { static: true })
  nestedDataHeader: ElementRef;
  @ViewChild('nesteddatacontent', { static: true })
  nestedDataContent: ElementRef;
  @HostListener('window:resize', ['$event']) onResize() {
    this.hasScrollbar();
  }

  constructor(private api: DatastoreService, private route: ActivatedRoute) {}

  /* Page Tasks:
   *
   *  1) Connect and take the data from the API - use getPolicies function to retrieve the data
   *  2) Create 2 layers table witch will display the income data
   *
   *  3) Table must contain the following columns:
   *
   *    ==> Layer 1: num, amount, description
   *    ==> Layer 2: clientName, amount        ==> It may contain multiple rows
   *
   *   Description:
   *     Second layer must be hidden all the time, until the user select the row icon to expand the details.
   *     By expanding the details, correct and fresh data need to be retrieved from the api and displayed on the screen each time
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

  getDetails(polId: number, index: number) {
    this.nestedDataContent.nativeElement.style.overflow = 'auto';
    if (this.selectedPolicyInd) {
      this.selectedPolicyInd = null;
      this.hasScrollbar();
    } else {
      this.nestedDataContent.nativeElement.style.overflow = 'hidden';
      this.api.getPolicyDetails(polId).subscribe(policyDetails => {
        this.policyDetails = policyDetails;
        this.selectedPolicyInd = index;
        this.hasScrollbar();
      });
    }
  }

  hasScrollbar() {
    const headerFirstChild = this.nestedDataHeader.nativeElement
      .firstElementChild;
    const contentFirstChild = this.nestedDataContent.nativeElement
      .firstElementChild;
    if (headerFirstChild && contentFirstChild) {
      this.viewReady = true;
      setTimeout(() => {
        this.scrollbarWidth =
          headerFirstChild.clientWidth - contentFirstChild.clientWidth;
      }, 0);
    }
  }
}
