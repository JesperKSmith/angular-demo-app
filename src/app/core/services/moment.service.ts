import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class MomentService {

  public getMoment(): any {
    return moment;
  }
}
