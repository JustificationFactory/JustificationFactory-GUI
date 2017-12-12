import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class WsSenderService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  /* Features */
  private post<T>(path, payload): Observable<T> {
    const url = this.buildUrl(path);
    console.log('Sending post request to: ' + url + ' with payload:');
    console.log(payload);
    return this.http.post<T>(url, payload, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  // Need to make an alternate querry where we can add the response type
  private postForString(path, payload): Observable<string> {
    const url = this.buildUrl(path);
    console.log('Sending post request to: ' + url + ' with payload:');
    console.log(payload);
    return this.http.post(url, payload, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }

  private httpDelete(path): Observable<Object> {
    const url = this.buildUrl(path);
    console.log('Sending delete request to: ' + url);
    return this.http.delete(url,
      {
        headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
      });
  }

  /* Business */

  /* DELETE */
  public removeArgumentationSystem(id: string): Observable<Object> {
    return this.httpDelete(id);
  }

  public removeStepsInArgumentationSystem(id: string): Observable<Object> {
    return this.httpDelete(id + '/pattern');
  }

  /* POST */
  public registerArgumentationSystem(argSystem: IArgSystem): Observable<string> {
    return this.postForString('system', argSystem);
  }

  public registerPattern(argSystemId: string, pattern: IPattern): Observable<Object> {
    return this.postForString(argSystemId + '/pattern', pattern);
  }

  public constructStep(argSystemId: string, patternId: string, stepToCreate: StepToCreate): Observable<Object> {
    return this.post<string>(argSystemId + '/' + patternId + '/step', stepToCreate);
  }

}
