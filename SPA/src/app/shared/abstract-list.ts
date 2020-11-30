import { Subject } from "rxjs";

export interface IColumn{
  field:string;
  header:string;
  width:string;
}

export abstract class AbstractList  {
    public loading: boolean = true;
    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();
    public cols: IColumn[] =[];

    constructor(
        public pageTitle: string
    ) {
      // empty
    }

    public handleError(error): any {
        this.loading = false;
        this.errorMessageSubject.next(error);
        console.log(error);
     }

     abstract onListRetrieved(data: any): void;
}
