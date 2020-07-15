import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'resolveId'
})
export class ResolveIdPipe implements PipeTransform {

  transform(id: string, model: string): Observable<any> {
    return this.http.get(`/api/${model}/${id}`);
  }

  constructor(private http: HttpClient) { }
  
}
