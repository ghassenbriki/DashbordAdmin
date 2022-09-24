import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostUrlService {
  url = 'http://localhost:5001/api/';

  constructor() {
  }
}
