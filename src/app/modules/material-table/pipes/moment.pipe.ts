import { Pipe, PipeTransform } from '@angular/core';
import { MomentService } from 'src/app/core/services/moment.service';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor(private momentService: MomentService) {

  }
  /**
   * @name transform
   * @description Transform the @param date to a Moment Date object 
   * @param {any} date - can be either a JS Date object or a string
   * @WIP Test if date | string works as intended
*/
  public transform(date: Date | string): Date | null {
    return date ? this.momentService.getMoment()(date).toDate() : null;
  }
}
