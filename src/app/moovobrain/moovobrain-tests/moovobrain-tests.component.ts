import {Component, OnInit} from '@angular/core';
import {ListViewLoaderService} from '../../list-view-loader.service';
import {MoovobrainRequestHttpService} from '../moovobrain-request-http.service';
import {ToastService} from '../../shared/services/toast.service';
import {MoovobrainTest} from '../../shared/models/moovobrain-test.model';

@Component({
  selector: 'app-moovobrain-tests',
  templateUrl: './moovobrain-tests.component.html',
  styleUrls: ['./moovobrain-tests.component.css']
})
export class MoovobrainTestsComponent implements OnInit {


  selectedElementIndex = 0;
  testsArray: MoovobrainTest[] = [];

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private httpRequest: MoovobrainRequestHttpService,
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    this.fetchTests();
    this.listViewLoaderService.loadStylesheets();
  }

  setScheduledDate(dateElement: HTMLInputElement): void {
    if (dateElement.value) {
      this.testsArray[this.selectedElementIndex].scheduledDate = new Date(dateElement.value);
      this.testsArray[this.selectedElementIndex].status = 'scheduled';
      this.updateScheduledDate(this.testsArray[this.selectedElementIndex].scheduledDate);
    }
    // send request to server
    dateElement.value = null;
  }

  getSelectedTest() {
    return this.testsArray[this.selectedElementIndex];
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }


  /*===========================
    # Http requests
    ==========================*/

  fetchTests() {
    this.httpRequest.getAllTestRequests().subscribe((tests: MoovobrainTest[]) => {
      this.testsArray = tests.slice().reverse();
      this.listViewLoaderService.loadDataListViewScript().then();
    });
  }

  updateTestStatus(status: string) {
    this.httpRequest.updateTestStatus(this.getSelectedTest().id, status).subscribe(() => {
      this.getSelectedTest().status = status;
      this.toaster.success('Test request status updated', 'Done');
    }, () => {
      this.toaster.error('Unable to update test request status', 'Error :');
    });
  }

  updateScheduledDate(scheduledDate: Date) {
    this.httpRequest.scheduleTest(this.getSelectedTest().id, 'scheduled', scheduledDate)
      .subscribe(() => {
        this.toaster.success('Test scheduled', 'Done');
      }, () => {
        this.toaster.error('Unable to schedule date', 'Error :');
      });
  }

  deleteTest() {
    this.httpRequest.deleteTestRequest(this.getSelectedTest().id).subscribe(() => {
      this.toaster.success('Test request delete', 'Done');
      this.testsArray.splice(this.selectedElementIndex, 1);
    }, () => {
      this.toaster.error('Unable to delete test request', 'Error :');
    });
  }
}
