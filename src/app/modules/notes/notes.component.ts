import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Note } from 'src/app/model/Note';
import { HttpClientService } from 'src/app/services/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  note: Note = new Note();
  notes: Array<Note>;
  notes1: Array<Note>;
  selectedNote: Note;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['teacherFullName', 'studentFullName', 'value', 'classe', 'filiere', 'actions'];
  @ViewChild(MatSort, {static: false} ) sort : MatSort ;
  @ViewChild(MatPaginator, {static: false} ) paginator : MatPaginator ;
  searchKey: string;
  searchKey2: string;
  

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getNotes().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response) {
    this.notes = new Array<Note>();
    this.notes1 = response;
    for (const note of this.notes1) {

      const note2 = new Note();
      note2.id = note.id;
      note2.teacherFullName = note.teacherFullName;
      note2.studentFullName = note.studentFullName;
      note2.value = note.value;
      note2.classe = note.classe;
      note2.filiere = note.filiere;
      this.notes.push(note2);
      this.listData = new MatTableDataSource(this.notes);
      this.listData.sort = this.sort ;
      this.listData.paginator = this.paginator ;
      console.log(this.listData);

    }

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  onSearchClear2() {
    this.searchKey2 = "";
    this.applyFilter2();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  applyFilter2() {
    this.listData.filter = this.searchKey2.trim().toLowerCase();
  }

  viewNote(note: Note) {
    localStorage.setItem("id", note.id.toString());
    this.router.navigate(['main', 'notes', 'note-details']);
  }

}