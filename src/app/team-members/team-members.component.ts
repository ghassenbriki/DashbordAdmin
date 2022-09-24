import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ListViewLoaderService} from '../list-view-loader.service';
import {TeamMembersHttpService} from './team-members-http.service';
import {TeamMember} from '../shared/models/team-member.model';
import {ToastService} from '../shared/services/toast.service';
import {HostUrlService} from '../shared/services/host-url.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  url = this.urlService.url;
  form: FormGroup;
  files: File[] = [];
  selectedElementIndex: number;
  membersArray: Array<TeamMember> = [];

  constructor(
    public urlService: HostUrlService,
    private httpRequest: TeamMembersHttpService,
    private listViewLoaderService: ListViewLoaderService,
    private toaster: ToastService) {
  }

  ngOnInit(): void {
    this.listViewLoaderService.loadStylesheets();
    this.getAllTeamMembers();
    this.initForm();
    this.listenToAddNew();
  }

  initForm(): void {
    this.form = new FormGroup({
      memberName: new FormControl(null),
      memberPost: new FormControl(null),
    });
  }

  setFormValues(): void {
    this.form.patchValue({
      memberName: this.membersArray[this.selectedElementIndex].name,
      memberPost: this.membersArray[this.selectedElementIndex].post
    });
  }

  listItemClicked(i: number) {
    this.selectedElementIndex = i;
    this.setFormValues();
    this.listViewLoaderService.fireEventEditClicked();
  }

  clearFormValues(): void {
    this.form.reset();
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /* =======================
     # http related functions
     =======================*/

  getSelectedTeamMember(): TeamMember {
    return this.membersArray[this.selectedElementIndex];
  }

  getAllTeamMembers(): void {
    this.httpRequest.getAllTeamMembers().subscribe((teamMembers: Array<TeamMember>) => {
      this.membersArray = teamMembers.slice().reverse();
      this.listViewLoaderService.loadDataListViewScript().then();
    }, () => {
      this.toaster.error('Unable to fetch team members', 'Error :');
    });
  }

  deleteTeamMember(): void {
    this.httpRequest.deleteTeamMember(this.getSelectedTeamMember().id).subscribe(() => {
      this.membersArray.splice(this.selectedElementIndex, 1);
      this.toaster.success('Team member deleted', 'Done :');
    }, () => {
      this.toaster.error('Unable to delete team member', 'Error :');
    });
  }

  addTeamMember() {
    this.httpRequest.addTeamMember(this.form, this.files).subscribe(() => {
      this.toaster.success('Reload this page to see changes', 'Member added :');
    }, () => {
      this.toaster.error('Unable to add team member', 'Error :');
    });
  }

  listenToAddNew() {
    document.addEventListener('add-new-clicked', () => {
      this.selectedElementIndex = -1;
      this.clearFormValues();
    });
  }

  updateTeamMember() {
    this.httpRequest.updateTeamMember(this.getSelectedTeamMember().id, this.form, this.files)
      .subscribe(() => {
        this.toaster.success('Reload page to see changes', 'Member edited');
      }, () => {
        this.toaster.error('Unable to edit member', 'Error :');
      });
  }

}
