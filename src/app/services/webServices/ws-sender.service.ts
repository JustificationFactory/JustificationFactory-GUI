import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WsSenderService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  public post<T>(path, payload): Observable<T> {
    const url = this.buildUrl(path);
    console.log('Sending post request to: ' + url + ' with payload:');
    console.log(payload);
    return this.http.post<T>(url, payload);
  }

  public deletion(path): boolean {
    const url = this.buildUrl(path);
    console.log('Sending delete request to: ' + url);
    this.http.delete(path).subscribe(
      resp => {
        console.log('Deletion successful.');
        return true;
      },
        err => {
        console.log('Deletion failed.');
        return false;
        }
      );
    return;
  }

}
