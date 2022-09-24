import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FeedbackService} from '../shared/services/feedback.service';
import {FeedbackModel} from '../shared/models/feedback.model';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Id', 'message', 'date'];
  dataSource: MatTableDataSource<FeedbackModel>;
  constructor(private httpRequests: FeedbackService) {
  }

  ngOnInit(): void {
    this.httpRequests.getAllFeedbacks().subscribe((response: FeedbackModel[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort  = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
