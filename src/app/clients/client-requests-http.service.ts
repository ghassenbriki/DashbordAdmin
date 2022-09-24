import {Injectable} from '@angular/core';
import {HostUrlService} from '../shared/services/host-url.service';
import {HttpClient} from '@angular/common/http';
import {ServiceRequest} from '../shared/models/service-request.model';
import {ListViewLoaderService} from '../list-view-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestsHttpService {
  url = this.urlService.url;
  serviceRequestsArray: ServiceRequest[] = [];
  // we are fetching 3 type of services requests , this variable below will be incremented
  // when a type fetched and will have the value of 3 when all of them is fetched
  requestsFetched = 0;

  constructor(private urlService: HostUrlService, private http: HttpClient, private listViewLoaderService: ListViewLoaderService) {
  }

  getAllServiceRequests() {
    // if the requests are fetched we do not fetch them again
    if (this.requestsFetched === 3) {
      return;
    }
    this.http.get(this.url + '/services/maintenance').subscribe((response: ServiceRequest[]) => {
      this.serviceRequestsArray.push(...response);
      this.requestsFetched++;
      this.sortArrayByDate();
    });

    this.http.get(this.url + '/services/qualityControl').subscribe((response: ServiceRequest[]) => {
      this.serviceRequestsArray.push(...response);
      this.requestsFetched++;
      this.sortArrayByDate();
    });

    this.http.get(this.url + '/services/training').subscribe((response: ServiceRequest[]) => {
      this.serviceRequestsArray.push(...response);
      this.requestsFetched++;
      this.sortArrayByDate();
    });
  }

  sortArrayByDate() {
    if (this.requestsFetched >= 3) {
      // @ts-ignore
      this.serviceRequestsArray = this.serviceRequestsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.listViewLoaderService.loadDataListViewScript().then();
      this.serviceRequestsArray.reverse();
    }
  }

  changeStatusTrainingSession(id: string, status: string) {
    return this.http.post(this.url + '/services/training/' + id, {status});
  }

  changeStatusMaintenance(id: string, status: string) {
    return this.http.post(this.url + '/services/maintenance/fixed/' + id, {status});
  }

  changeQualityControlStatus(id: string, status: string) {
    return this.http.post(this.url + '/services/qualityControl/' + id, {status});
  }

  deleteServiceRequest(id: string, type: string) {
    let route: string;
    switch (type) {
      case 'Training session' :
        route = 'training';
        break;
      case 'Maintenance' :
        route = 'maintenance';
        break;
      case 'Quality control' :
        route = 'qualityControl';
        break;
    }
    return this.http.delete(this.url + '/services/' + route + '/' + id);
  }


  banClient(email: string) {
    return this.http.post(this.url + '/banClient', {email});
  }
}
