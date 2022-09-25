import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';


@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.css']
})
export class FormMissionComponent implements OnInit {


  public pageTitle = 'To can add missions from here ';
   fileForm = new FormGroup({
    coinsShare: new FormControl(''),
    coinsView: new FormControl(''),
    Sponsor: new FormControl(''),
    category:new FormControl('')


  });
  fileToUpload: any;
  

  
  constructor(private http:  HttpClient, private toast :ToastService) { }

  

  ngOnInit(): void {
  }

  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files[0];
  }
  saveFileInfo()
  {
    
    const formData: FormData = new FormData();
    formData.append('vidName', this.fileToUpload);
    formData.append('coinsShare', this.fileForm.value.coinsShare);
    formData.append('coinsView', this.fileForm.value.coinsView);
    formData.append('Sponsor', this.fileForm.value.Sponsor);
    formData.append('category', this.fileForm.value.category);
    return this.http.post('http://localhost:5001/api/Admin/mission', formData,
    {
      headers : new HttpHeaders({
       // 'Content-Type': 'multipart/form-data'
    })})
    .subscribe((res)=>this.toast.success("Mission added succefully !","succes"),(err)=>this.toast.error("the file size is bigger than 30 Mo","failed"))

}

}

