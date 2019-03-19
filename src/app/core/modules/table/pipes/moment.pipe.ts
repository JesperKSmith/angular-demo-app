import { Pipe, PipeTransform } from '@angular/core';
import { MomentService } from 'src/app/core/services/moment.service';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor(private momentService: MomentService) {

  }
  public transform(value: any, args?: any): Date | null {
    return value ? this.momentService.getMoment()(value).toDate() : null;
  }
}
