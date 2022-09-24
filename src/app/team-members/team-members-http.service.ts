import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersHttpService {
  url = this.urlService.url;

  constructor(private http: HttpClient, private urlService: HostUrlService) {
  }

  getAllTeamMembers() {
    return this.http.get(this.url + '/members/all');
  }

  deleteTeamMember(id: string) {
    return this.http.delete(this.url + '/members/' + id);
  }

  addTeamMember(form: FormGroup, files: Array<File>) {
    const formData = new FormData();
    formData.append('name', form.get('memberName').value);
    formData.append('post', form.get('memberPost').value);
    formData.append('image', files[0]);

    return this.http.post(this.url + '/members', formData);
  }

  updateTeamMember(id: string, form: FormGroup, files: Array<File>) {
    const formData = new FormData();
    formData.append('post', form.get('memberPost').value);
    formData.append('name', form.get('memberName').value);
    if (files.length > 0) {
      formData.append('image', files[0]);
    }

    return this.http.post(this.url + '/members-update/' + id, formData);
  }
}
