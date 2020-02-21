import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface StudentsTableItem {
  name: string;
  id: number;
  photo: string;
  gender: string;
  bday : string ;
  email: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: StudentsTableItem[] = [
  {id: 1, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Hydrogen'},
  {id: 2,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'phjuijoto' ,name: 'Helium'},
  {id: 3,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Lithium'},
  {id: 4,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'p5555hoto' ,name: 'Beryllium'},
  {id: 5,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Boron'},
  {id: 6,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'phot879897o' ,name: 'Carbon'},
  {id: 7,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Nitrogen'},
  {id: 8,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Oxygen'},
  {id: 9,  email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() , gender:'M', photo:'photo' ,name: 'Fluorine'},
  {id: 10, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Neon'},
  {id: 11, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Sodium'},
  {id: 12, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Magnesium'},
  {id: 13, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Aluminum'},
  {id: 14, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Silicon'},
  {id: 15, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Phosphorus'},
  {id: 16, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Sulfur'},
  {id: 17, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Chlorine'},
  {id: 18, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Argon'},
  {id: 19, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Potassium'},
  {id: 20, email :'ffdfd', bday : new Date("Fri Dec 08 2019 07:44:57").toDateString() ,  gender:'M', photo:'photo' , name: 'Calcium'},
];

/**
 * Data source for the StudentsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentsTableDataSource extends DataSource<StudentsTableItem> {
  data: StudentsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StudentsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StudentsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StudentsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
