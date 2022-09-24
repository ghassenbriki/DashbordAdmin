import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ListViewLoaderService} from '../list-view-loader.service';
import {ScriptsLoaderService} from '../scripts-loader.service';
import {Article} from '../shared/models/article.model';
import {ArticlesHttpServiceService} from './articles-http-service.service';
import {HostUrlService} from '../shared/services/host-url.service';
import {ToastService} from '../shared/services/toast.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, AfterViewInit {

  url = this.urlService.url;
  // when adding a new article we upload an image and push it to this.files array
  // we should empty that array when we're editing another article and we use this variable
  // to mark whether we should empty the array or not
  articleJustAdded = false;

  isDeleting = false;
  isLoading = false;
  isAddingNew = false;
  form: FormGroup;
  files: File[] = [];
  selectedElementIndex: number;
  placeHolderArticle: Article = {
    createdAt: null,
    updatedAt: null,
    id: '',
    description: '',
    about: '',
    author: '',
    title: '',
    imageURL: ''
  };
  articlesArray: Article[] = [];

  constructor(
    private scriptsLoaderService: ScriptsLoaderService,
    private listViewLoaderService: ListViewLoaderService,
    private httpRequest: ArticlesHttpServiceService,
    public urlService: HostUrlService,
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    this.getAllArticles();
    this.listViewLoaderService.loadStylesheets();
    this.initForm();
    this.listenToAddNew();
  }

  fixPagination() {
  }

  ngAfterViewInit() {
    this.loadQuillStylesheets();
  }

  loadQuillStylesheets(): void {
    this.scriptsLoaderService.addStylesheets(
      '/assets/vendors/css/editors/quill/katex.min.css',
      '/assets/vendors/css/editors/quill/monokai-sublime.min.css',
      '/assets/vendors/css/editors/quill/quill.snow.css'
    );
  }


  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      author: new FormControl(null),
      introduction: new FormControl(null),
      text: new FormControl(null),
    });
  }

  clearForm() {
    this.form.reset();
  }

  setFormValues(): void {
    this.listViewLoaderService.fireEventEditClicked();
    const article = this.getSelectedArticle();
    if (this.articleJustAdded) {
      this.files = [];
      this.articleJustAdded = false;
    }
    this.form.patchValue({
      title: article.title,
      author: article.author,
      introduction: article.about,
      text: article.description
    });
  }

  clearFormValues(): void {
    this.form.reset();
  }

  getSelectedArticle() {
    if (!this.isAddingNew) {
      return this.articlesArray[this.selectedElementIndex];
    } else {
      return this.placeHolderArticle;
    }
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  clearFiles() {
    this.files = [];
  }




  /*=======================
  # Http requests
   ========================*/

  getAllArticles(): void {
    this.httpRequest.fetchAllArticles().subscribe((response: Article[]) => {
      this.listViewLoaderService.loadDataListViewScript().then(() => {
        this.fixPagination();
      });
      this.articlesArray = response;
    });
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.httpRequest.deleteArticle(this.getSelectedArticle().id).subscribe(() => {
      this.isDeleting = false;
      this.articlesArray.splice(this.selectedElementIndex, 1);
    }, () => {
      this.isDeleting = false;
      this.toaster.error('Unable to delete Article', 'Network error :');
    });
  }

  updateArticle(): void {
    this.isLoading = true;
    this.httpRequest.updateArticle(this.getSelectedArticle().id, this.form.value, this.files).subscribe((updatedArticle: Article) => {
      this.isLoading = false;
      this.toaster.success('Article updated', 'Success');
      this.articlesArray[this.selectedElementIndex] = updatedArticle;
    }, () => {
      this.isLoading = false;
      this.toaster.error('Unable to update', 'Network error :');
    });
  }

  // this function is listening to an event fired from /assets/js/scripts/ui/data-list-view.js
  // it is fired when "Add New" button is clicked , because the button is written in javascript
  listenToAddNew() {
    document.addEventListener('add-new-clicked', () => {
      this.selectedElementIndex = -1;
      this.isAddingNew = true;
      this.clearFiles();
      this.clearForm();
    });
  }

  addNewArticle() {
    this.httpRequest.addNewArticle(this.form.value, this.files).subscribe((response: Article) => {
      this.articlesArray.push(response);
      this.toaster.success('New article has been added', 'Success');
      this.articleJustAdded = true;
    }, () => {
      this.toaster.success('Unable to add article', 'Error :');
    });
  }
}
