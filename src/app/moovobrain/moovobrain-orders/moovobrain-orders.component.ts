import {Component, OnInit} from '@angular/core';
import {ListViewLoaderService} from '../../list-view-loader.service';
import {MoovobrainRequestHttpService} from '../moovobrain-request-http.service';
import {MoovobrainOrder} from '../../shared/models/moovobrain-order.model';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-moovobrain-orders',
  templateUrl: './moovobrain-orders.component.html',
  styleUrls: ['./moovobrain-orders.component.css']
})
export class MoovobrainOrdersComponent implements OnInit {
  selectedElementIndex = 0;
  ordersArray: MoovobrainOrder[] = [];
  // we provide this variable when the column is not specified
  none = 'not specified';
  isValidationLoading = false;
  isShippingLoading = false;

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private toaster: ToastService,
    private httpRequest: MoovobrainRequestHttpService) {
  }

  ngOnInit(): void {
    this.fetchOrders();
    this.listViewLoaderService.loadStylesheets();
    this.ordersArray.reverse();
  }

  getSelectedOrder(): MoovobrainOrder {
    return this.ordersArray[this.selectedElementIndex];
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }


  /*========================
    # HTTP requests
   =========================*/

  fetchOrders() {
    this.httpRequest.getAllOrders().subscribe((orders: MoovobrainOrder[]) => {
      this.ordersArray = orders.reverse();
      this.listViewLoaderService.loadDataListViewScript().then();
    }, () => {
      this.toaster.error('Unable to fetch orders', 'Error :');
    });
  }

  updateOrderStatus(status: string) {
    if (status === 'shipped') {
      this.isShippingLoading = true;
    }
    this.httpRequest.updateOrderStatus(this.getSelectedOrder().id, status).subscribe(() => {
      this.isShippingLoading = false;
      this.toaster.success('Order status updated', 'Done');
      this.getSelectedOrder().status = status;
    }, () => {
      this.isShippingLoading = false;
      this.toaster.error('Unable to update order status', 'Error :');
    });
  }

  validateOrder(shippingInput: HTMLInputElement, taxesInput: HTMLInputElement) {
    this.isValidationLoading = true;
    const selectedOrder = this.getSelectedOrder();
    this.httpRequest.validateOrder(selectedOrder.id, +shippingInput.value, +taxesInput.value).subscribe(() => {
      this.toaster.success('Order Validated', 'Done');
      this.isValidationLoading = false;
      selectedOrder.status = 'validated';
      selectedOrder.priceTotal = +shippingInput.value + +taxesInput.value + selectedOrder.pricePurchase;
    }, () => {
      this.isValidationLoading = false;
      this.toaster.error('Unable to validate order', 'Error :');
    });
  }

  deleteOrder() {
    this.httpRequest.deleteOrder(this.getSelectedOrder().id).subscribe(() => {
      this.toaster.success('Order deleted', 'Done');
      this.ordersArray.splice(this.selectedElementIndex, 1);
    }, () => {
      this.toaster.error('Unable to delete order', 'Error :');
    });
  }
}
