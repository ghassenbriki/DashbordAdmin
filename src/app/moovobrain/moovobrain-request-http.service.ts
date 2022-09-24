import {Injectable} from '@angular/core';
import {HostUrlService} from '../shared/services/host-url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoovobrainRequestHttpService {
  url = this.urlService.url;

  constructor(private urlService: HostUrlService, private http: HttpClient) {
  }

  /*=======================
  # Orders
   ========================*/

  getAllOrders() {
    return this.http.get(this.url + '/moovobrain');
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.post(this.url + '/moovobrain/' + id, {status});
  }

  validateOrder(id: string, priceShipping: number, priceTaxes: number) {
    return this.http.post(this.url + '/moovobrain-validate/' + id, {priceShipping, priceTaxes});
  }

  deleteOrder(id: string) {
    return this.http.delete(this.url + '/moovobrain/' + id);
  }

  /*=======================
  # Test requests
   ========================*/
  getAllTestRequests() {
    return this.http.get(this.url + '/tests');
  }

  // this function only handles : rejected , tested
  // the scheduled update is handled separately for less complexity and more maintainable code
  updateTestStatus(id: string, status: string) {
    return this.http.post(this.url + '/tests/update/' + id, {status});
  }

  scheduleTest(id: string, status: string, scheduledDate: Date) {
    return this.http.post(this.url + '/tests/update/' + id, {status, scheduledDate});
  }

  deleteTestRequest(id: string) {
    return this.http.delete(this.url + '/tests/' + id);
  }
}
