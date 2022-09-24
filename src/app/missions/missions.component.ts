import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MissionModel} from '../shared/models/mission.model';
import {MissionService} from '../shared/services/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Id', 'Sponsor', 'Category', 'videoSource'];
  dataSource: MatTableDataSource<MissionModel>;
  constructor(private httpRequests: MissionService) {
  }
  ngOnInit(): void {
    this.httpRequests.getAllMissions().subscribe((response: MissionModel[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
