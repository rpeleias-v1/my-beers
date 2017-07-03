import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Beer } from '../models/beer';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BeerService {

  private apiUrl = 'api/beers';

  constructor(private http: Http) { }
  
  public get(id: number): Promise<Beer> {
    return this.http.get(`${this.apiUrl}/${id}`, this.headers)
      .toPromise()
      .then(response => response.json().data as Beer)
      .catch(this.handleError);
  }

  public getAll(): Promise<Beer[]> {
    return this.http.get(this.apiUrl, this.headers)
      .toPromise()
      .then(response => response.json().data as Beer[])
      .catch(this.handleError);
  }

  public post(beer: Beer): Promise<Response> {
    return this.http.post(this.apiUrl, JSON.stringify(beer), this.headers)
      .toPromise()
      .then(response => response as Response)
      .catch(this.handleError);
  }

  public put(id: number, beer: Beer): Promise<Response> {
    return this.http.put(`${this.apiUrl}/${id}`, JSON.stringify(beer), this.headers)
      .toPromise()
      .then(response => response as Response)
      .catch(this.handleError);
  }

  public delete(id: number): Promise<Response> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.headers)
      .toPromise()
      .then(response => response as Response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error.message | error);
  }

  private headers(): RequestOptions {
    let headers = new Headers({'Content-type': 'application/json'});
    let requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }
}
