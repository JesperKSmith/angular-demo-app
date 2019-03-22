import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialTableComponent } from './material-table.component';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule } from '@angular/material';
import { TableStateService } from './services/table-state.service';
import { MomentPipe } from './pipes/moment.pipe';
import { CdkExpansionDirective } from './directives/cdk-expansion.directive';

@NgModule({
  declarations: [MaterialTableComponent, MomentPipe, CdkExpansionDirective],
  providers: [TableStateService],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [MaterialTableComponent, MomentPipe]
  
})
export class MaterialTableModule { }
