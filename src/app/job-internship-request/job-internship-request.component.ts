import {Component, OnInit} from '@angular/core';
import {ListViewLoaderService} from '../list-view-loader.service';
import {JobInternshipRequestHttpService} from './job-internship-request-http.service';
import {JoinUsApplication} from '../shared/models/join-us-application.model';
import {HostUrlService} from '../shared/services/host-url.service';
import {ToastService} from '../shared/services/toast.service';

@Component({
  selector: 'app-job-internship-request',
  templateUrl: './job-internship-request.component.html',
  styleUrls: ['./job-internship-request.component.css']
})
export class JobInternshipRequestComponent implements OnInit {

  url = this.urlService.url;
  selectedElementIndex = 0;
  requestsArray: Array<JoinUsApplication> = [];

  constructor(
    private listViewLoaderService: ListViewLoaderService,
    private requestsHttp: JobInternshipRequestHttpService,
    public urlService: HostUrlService,
    private toaster: ToastService
  ) {
  }

  ngOnInit(): void {
    this.fetchApplications();
    this.listViewLoaderService.loadStylesheets();
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.listViewLoaderService.fireEventEditClicked();
  }

  fetchApplications() {
    this.requestsHttp.getAllJoinUsRequests().subscribe((res: Array<JoinUsApplication>) => {
      this.requestsArray = res.reverse();
      this.listViewLoaderService.loadDataListViewScript().then();
    }, () => {
      this.toaster.error('Cannot fetch applications', 'Error');
    });
  }

  getSelectedElement(): JoinUsApplication {
    return this.requestsArray[this.selectedElementIndex];
  }



  setScheduledDate(dateElement: HTMLInputElement): void {
    if (dateElement.value) {
      const interviewDate = new Date(dateElement.value);
      this.requestsArray[this.selectedElementIndex].interviewDate = interviewDate;
      this.requestsArray[this.selectedElementIndex].status = 'scheduled';
      this.requestsHttp.scheduleInterviewDate(interviewDate, this.getSelectedElement().id);
    } else {
      this.requestsArray[this.selectedElementIndex].interviewDate = null;
      this.requestsArray[this.selectedElementIndex].status = 'pending';
      this.requestsHttp.updateApplicationStatus('pending', this.getSelectedElement().id);

    }
    dateElement.value = null;
  }

  setApplicationStatus(status: string): void {
    this.requestsArray[this.selectedElementIndex].status = status;
    this.requestsHttp.updateApplicationStatus(status, this.getSelectedElement().id);
  }

  deleteApplication(): void {
    this.requestsHttp.deleteApplication(this.getSelectedElement().id);
    this.requestsArray.splice(this.selectedElementIndex, 1);
  }
}
