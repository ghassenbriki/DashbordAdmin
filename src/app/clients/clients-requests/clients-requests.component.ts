import {Component, OnInit} from '@angular/core';
import {ListViewLoaderService} from '../../list-view-loader.service';
import {ClientRequestsHttpService} from '../client-requests-http.service';
import {ServiceRequest} from '../../shared/models/service-request.model';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-clients-requests',
  templateUrl: './clients-requests.component.html',
  styleUrls: ['./clients-requests.component.css']
})
export class ClientsRequestsComponent implements OnInit {

  selectedElementIndex = 0;
  servicesArray: ServiceRequest[] = [];

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private httpRequest: ClientRequestsHttpService,
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    // this way we guarantee that we load the scripts
    // every time we init this component and data is already fetched
    if (this.httpRequest.requestsFetched >= 3) {
      this.listViewLoaderService.loadDataListViewScript().then();
    }
    this.listViewLoaderService.loadStylesheets();
    this.servicesArray = this.httpRequest.serviceRequestsArray;
    this.httpRequest.getAllServiceRequests();
  }

  getSelectedElement() {
    return this.servicesArray[this.selectedElementIndex];
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }

  /*==================
    Http requests
    ==================*/

  changeStatus(status: string) {
    switch (this.getSelectedElement().type) {
      case 'Training session' :
        this.changeStatusTrainingSession(status);
        break;
      case 'Maintenance' :
        this.changeMaintenanceStatus(status === 'validated' ? 'fixed' : 'rejected');
        break;
      case 'Quality control' :
        this.changeQualityControlStatus(status);
        break;
    }
  }

  changeStatusTrainingSession(status: string) {
    this.httpRequest.changeStatusTrainingSession(this.getSelectedElement().id, status).subscribe(() => {
      this.getSelectedElement().status = status;
      this.toaster.success('Service request updated', 'Done');
    }, () => {
      this.toaster.error('Unable to perform updates', 'Error :');
    });
  }

  changeMaintenanceStatus(status: string) {
    this.httpRequest.changeStatusMaintenance(this.getSelectedElement().id, status).subscribe(() => {
      this.getSelectedElement().status = status;
      this.toaster.success('Service request updated', 'Done');
    }, () => {
      this.toaster.error('Unable to perform updates', 'Error :');
    });
  }

  changeQualityControlStatus(status: string) {
    this.httpRequest.changeQualityControlStatus(this.getSelectedElement().id, status).subscribe(() => {
      this.toaster.success('Service request updated', 'Done');
      this.getSelectedElement().status = status;
    }, () => {
      this.toaster.error('Unable to perform updates', 'Error :');
    });
  }

  deleteServiceRequest() {
    this.httpRequest.deleteServiceRequest(this.getSelectedElement().id,
      this.getSelectedElement().type).subscribe(() => {
      this.servicesArray.splice(this.selectedElementIndex, 1);
      this.toaster.success('Service request deleted', 'Done');
    }, () => {
      this.toaster.error('Unable to delete service request', 'Error :');
    });
  }

}
