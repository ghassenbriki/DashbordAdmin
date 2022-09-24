import {Component, OnInit} from '@angular/core';
import {ListViewLoaderService} from '../../list-view-loader.service';
import {AccessorieOrder} from '../../shared/models/accessorieOrder.model';
import {AccessoriesRequestHttpService} from '../accessories-request-http.service';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-accessories-orders',
  templateUrl: './accessories-orders.component.html',
  styleUrls: ['./accessories-orders.component.css']
})
export class AccessoriesOrdersComponent implements OnInit {
  selectedElementIndex = 0;

  ordersArray: Array<AccessorieOrder> = [];

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private httpRequest: AccessoriesRequestHttpService,
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    this.listViewLoaderService.loadStylesheets();
    this.fetchOrders();
  }

  getSelectedOrder(): AccessorieOrder {
    return this.ordersArray[this.selectedElementIndex];
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }

  /*=======================
  # Http requests
   =======================*/

  fetchOrders() {
    this.httpRequest.getAllAccessoriesOrders()
      .subscribe((res: Array<AccessorieOrder>) => {
        this.ordersArray = res.slice().reverse();
        this.listViewLoaderService.loadDataListViewScript().then();
      }, () => {
        this.toaster.error('Unable to fetch orders', 'Error :');
      });
  }

  changeOrderStatus(status: string) {
    this.httpRequest.changeOrderStatus(status, this.getSelectedOrder().id).subscribe(() => {
      this.ordersArray[this.selectedElementIndex].status = status;
    }, () => {
      this.toaster.error('Unable to change order status', 'Error :');
    });
  }

  deleteOrder() {
    this.httpRequest.deleteOrder(this.getSelectedOrder().id).subscribe(() => {
      this.ordersArray.splice(this.selectedElementIndex, 1);
    }, () => {
      this.toaster.error('Unable to delete order', 'Error :');
    });
  }


}
