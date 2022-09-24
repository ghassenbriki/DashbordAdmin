import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from './host-url.service';
import {MissionModel} from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  url = this.urlService.url + 'Admin/missions/';
  constructor(private http: HttpClient, private urlService: HostUrlService ) { }
  getAllMissions() {
  return  this.http.get<MissionModel[]>(this.url);
  }
}
