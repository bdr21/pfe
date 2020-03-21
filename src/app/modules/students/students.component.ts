import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/Student';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material'
import { DialogBoxComponent } from '../notes/dialog-box/dialog-box.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  student: Student = new Student();
  students: Array<Student>;
  students1: Array<Student>;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName','lastName','gender', 'classe' , 'filiere' , 'actions'];

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.httpClientService.getStudents().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    /*this.activatedRoute.queryParams.subscribe(
      (params) => {
        const selectedStudentId = params['id'];
        this.action = params['action'];
        if (selectedStudentId) {
          this.selectedStudent = this.students.find(student => student.id === + selectedStudentId);
        }
      }
    );*/
  }
  handleSuccessfulResponse(response) {
    this.students = new Array<Student>();
    this.students1 = response;
    for (const student of this.students1) {

      const student2 = new Student();
      student2.id = student.id;
      student2.firstName = student.firstName;
      student2.email = student.email;
      student2.classe = student.classe;
      student2.filiere = student.filiere;
      student2.gender = student.gender;
      student2.retrievedImage = 'data:image/jpeg;base64,' + student.picByte;
      student2.lastName = student.lastName;
      student2.picByte = student.picByte;
      this.students.push(student2);
      this.listData = new MatTableDataSource(this.students);
      console.log(this.listData);

    }

  }

  // viewStudent(id: number) {
  //   this.router.navigate(['main', 'students'], { queryParams: { id, action: 'view' } });
  //   this.openDialog() ;
  // }
  viewStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    localStorage.setItem("photo", student.retrievedImage);
    this.router.navigate(['main', 'students', 'student-details']);
  }

  editStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    this.router.navigate(['main', 'students', 'edit-student']);
  }

  deleteStudent(student: Student) {
    localStorage.setItem("id", student.id.toString());
    console.log(student.id);
    this.httpClientService.deleteStudent(student.id).subscribe(
      (student) => {
        localStorage.setItem("whichComponent","students") ;
        this.refreshData();
        this.dialog.open(DialogBoxComponent) ;
      }
    );

  }
  // openDialog() {
  //   this.dialog.open(StudentDetailsComponent);
  // }


}
