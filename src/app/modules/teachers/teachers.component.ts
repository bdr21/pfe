import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/Teacher';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { DialogBoxComponent } from '../notes/dialog-box/dialog-box.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teacher : Teacher = new Teacher() ;
  teachers: Array<Teacher>;
  teachers1: Array<Teacher>;
  selectedTeacher: Teacher;
  listData : MatTableDataSource<any> ;
  displayedColumns : string[] = ['firstName','email','lastName','gender','actions'];

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.httpClientService.getTeachers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response) {
    this.teachers = new Array<Teacher>();
    this.teachers1 = response;
    for (const teacher of this.teachers1) {
      
      const teacher2 = new Teacher();
      teacher2.id = teacher.id;
      teacher2.firstName = teacher.firstName;
      teacher2.email = teacher.email;
      teacher2.gender = teacher.gender;
      teacher2.retrievedImage = 'data:image/jpeg;base64,' + teacher.picByte;
      teacher2.lastName = teacher.lastName;
      teacher2.picByte = teacher.picByte;
      this.teachers.push(teacher2);
      this.listData = new MatTableDataSource(this.teachers);
      console.log(this.listData);
      
    }

  }

  viewTeacher(teacher : Teacher) {
    localStorage.setItem("id",teacher.id.toString()) ;
    localStorage.setItem("photo",teacher.retrievedImage) ;
    this.router.navigate(['main', 'teachers', 'teacher-details']);
  }

  editTeacher(teacher: Teacher) {
    localStorage.setItem("id", teacher.id.toString());
    this.router.navigate(['main', 'teachers', 'edit-teacher']);
  }

  deleteTeacher(teacher: Teacher) {
    localStorage.setItem("id", teacher.id.toString());
    console.log(teacher.id);
    this.httpClientService.deleteTeacher(teacher.id).subscribe(
      (teacher) => {
        localStorage.setItem("whichComponent","teachers") ;
        this.refreshData();
        this.dialog.open(DialogBoxComponent) ;
      }
    );

  }

}
  

  
