import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FeedbackModel} from '../models/feedback.model';
import {HostUrlService} from './host-url.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url = this.urlService.url + 'Admin/feedbacks';

  constructor(private http: HttpClient, private urlService: HostUrlService) { }

  getAllFeedbacks() {
    return this.http.get<FeedbackModel[]>(this.url);
  }
}
