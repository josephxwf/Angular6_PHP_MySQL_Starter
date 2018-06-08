import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' }) // inject UserService in root so any class can use it
export class UserService {

  //private usersUrl = 'api/users';  // URL to web api, https://stackoverflow.com/questions/45722848/angular-2-where-is-url-api-users-defined
  private urlGet = 'http://localhost:8888/get.php';
  private urlGetById = 'http://localhost:8888/getbyid.php';
  private urlInsert = 'http://localhost:8888/insert.php';
  private urlUpdate = 'http://localhost:8888/update.php';
  private urlDelete = 'http://localhost:8888/delete.php';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.urlGet)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.urlGet}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {

    //const url = `${this.urlGetById}/${id}`;

    ///////// if we use http post to send data, php file also need change ////////////////////
    /*
    return this.http.post<User>(this.urlGetById,{'id':id}).pipe(
      tap(_ => this.log(`fetched user id=${id}`)), //RxJS tap operator, which looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
    */
    ///////////////////////////////////////////////////////////////
//get method: https://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular
    return this.http.get<User>(this.urlGetById, {
      params: {id: id.toString() }
    }).pipe(
      tap(_ => this.log(`fetched user id=${id}`)), //RxJS tap operator, which looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]); //of(USERS) returns an Observable<User[]> that emits a single value, the array of mock users.
    }
    return this.http.get<User[]>(`${this.urlGet}/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.urlInsert, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id} name=${user.name}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    //const url = `${this.urlDelete}/${id}`;

    return this.http.delete<User>(this.urlDelete, {params: {id: id.toString()}
    }).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.urlUpdate, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }
}
