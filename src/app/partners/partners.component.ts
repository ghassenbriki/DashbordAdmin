import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ScriptsLoaderService} from '../scripts-loader.service';
import {ClientRequestsHttpService} from '../clients/client-requests-http.service';
import {ToastService} from '../shared/services/toast.service';
import {ServiceRequest} from '../shared/models/service-request.model';
import {ListViewLoaderService} from '../list-view-loader.service';
import {PartnerRequestsHttpService} from './partner-requests-http.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partnersList: any;

  selectedElementIndex = 0;
  servicesArray: ServiceRequest[] = [];

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private httpRequest: PartnerRequestsHttpService,
    
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    // this way we guarantee that we load the scripts
    // every time we init this component and data is already fetched
    this.listViewLoaderService.loadDataListViewScript().then();
    this.listViewLoaderService.loadStylesheets();
    this.servicesArray = this.httpRequest.serviceRequestsArray;
    this.httpRequest.getAll().subscribe(partners =>{
      this.partnersList = partners;
      console.log(this.partnersList);
    });
  }

  getSelectedElement() {
    return this.partnersList[this.selectedElementIndex];
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }
  //
  // /*==================
  //   Http requests
  //   ==================*/
  //

  validatePartner() {
    this.httpRequest.validatePartner(this.getSelectedElement()._id).subscribe(val =>
      this.getSelectedElement().status = 'validated'
    );
  }

  rejectPartner() {
    this.httpRequest.rejectPartner(this.getSelectedElement()._id).subscribe(val =>
      this.getSelectedElement().status = 'rejected'
    );
  }

  deletePartner() { 
    this.httpRequest.deletePartner(this.getSelectedElement()._id).subscribe(val =>
      this.partnersList.splice(this.selectedElementIndex, 1)
    );
  }

}
