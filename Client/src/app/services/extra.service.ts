import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor() { }

  private user = new BehaviorSubject<any>([1,2,3,4])
  cartUser = this.user.asObservable();

}
