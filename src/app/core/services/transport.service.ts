import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TableProductInterface } from '../interfaces/table-product.interface';

@Injectable()
export class TransportService {

  public getAllUsers(): Observable<TableProductInterface[]> {
    return of(fakeData);
  }
}


const fakeData: TableProductInterface[] = [
  {
    "name": "Apple",
    "price": 5
  },
  {
    "name": "Banana",
    "price": 6
  },
  {
    "name": "Grape",
    "price": 7
  },
  {
    "name": "Orange",
    "price": 8
  }
];