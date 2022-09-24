import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesRequestHttpService {
  url = this.urlService.url;

  constructor(private http: HttpClient, private urlService: HostUrlService) {
  }

  /*======================
  # Accessories items
    ======================*/
  getAllAccessories() {
    return this.http.get(this.url + '/accessories');
  }

  deleteAccessorie(id: string) {
    return this.http.delete(this.url + '/accessories/' + id);
  }

  updateAccessorie(id: string, values: any, files: File[]) {
    const formData = this.FormToFormData(values, files);
    return this.http.post(this.url + '/accessories-update/' + id, formData);
  }

  addAccessorie(values: any, files: File[]) {
    const formData = this.FormToFormData(values, files);
    return this.http.post(this.url + '/accessories', formData);
  }

  FormToFormData(values: any, files: File[]) {
    const formData = new FormData();
    formData.append('name', values.prodName);
    formData.append('description', values.prodDescription);
    formData.append('price', values.prodPrice);
    formData.append('availableQuantity', values.prodQuantity);
    if (files.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('image[]', files[i]);
      }
    }
    return formData;
  }


  /*======================
  # Accessories Orders
    ======================*/

  getAllAccessoriesOrders() {
    return this.http.get(this.url + '/accessories-order');
  }

  changeOrderStatus(status: string, id: string) {
    return this.http.post(this.url + '/accessories-order-update/' + id, {status});
  }

  deleteOrder(id: string) {
    return this.http.delete(this.url + '/accessories-order/' + id);
  }
}


