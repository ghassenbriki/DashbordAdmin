import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesHttpServiceService {
  url = this.urlService.url;

  constructor(private http: HttpClient, private urlService: HostUrlService) {
  }

  fetchAllArticles() {
    return this.http.get(this.url + '/articles');
  }

  deleteArticle(id: string) {
    return this.http.delete(this.url + '/articles/' + id);
  }

  updateArticle(id: string, values: any, files: File[]) {
    const formData = this.formToFormData(values, files);
    return this.http.post(this.url + '/articles/update/' + id, formData);
  }

  addNewArticle(values: any, files: File[]) {
    const formData = this.formToFormData(values, files);
    return this.http.post(this.url + '/articles', formData);
  }

  formToFormData(values: any, files: File[]) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('about', values.introduction);
    formData.append('description', values.text);
    formData.append('author', values.author);
    if (files.length > 0) {
      formData.append('image', files[0]);
    }
    return formData;
  }
}
