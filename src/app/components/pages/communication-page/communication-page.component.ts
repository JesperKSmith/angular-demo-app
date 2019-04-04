import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/core/services/transport.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'communication-page',
  templateUrl: './communication-page.component.html',
  styleUrls: ['./communication-page.component.sass']
})
export class CommunicationPageComponent implements OnInit {

  private destroyed$ = new Subject();

  constructor(private transportService: TransportService) { }

  ngOnInit() {
    this.transportService.getAllUsers().pipe(takeUntil(this.destroyed$))
    .subscribe(data => console.log('received data!', data) );
  }

  /*
  Demonstrate communication between:
    * Component Template ->
    * Component Controller ->
    * Component Service ->
    * Transport Service ->
    * <- HTTP Interceptor ->
  */
}
