import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class JobInternshipRequestHttpService {
  url = this.urlService.url;

  constructor(private http: HttpClient, private urlService: HostUrlService) {
  }

  getAllJoinUsRequests() {
    return this.http.get(this.url + '/join-us/all');
  }

  updateApplicationStatus(status: string, id: string) {
    this.http.post(this.url + '/join-us/' + id, {status}).subscribe();
  }

  scheduleInterviewDate(interviewDate: Date, id: string) {
    const status = 'scheduled';
    this.http.post(this.url + '/join-us/' + id, {interviewDate, status}).subscribe();
  }

  deleteApplication(id: string) {
    this.http.delete(this.url + '/join-us/' + id).subscribe();
  }
}
