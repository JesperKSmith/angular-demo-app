// // Angular
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// // Material
// import {
//   MatTableModule,
//   MatPaginatorModule,
//   MatSortModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatIconModule,
//   MatButtonModule,
//   MatProgressSpinnerModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
//   MatSelectModule,
//   MatTooltipModule
// } from '@angular/material';

// // import { ColumnFilterComponent } from './components/column-filter/column-filter.component';
// // import { FilterDdIconComponent } from './components/filter-dd-icon/filter-dd-icon.component';
// // import { FilterService } from './services/filter.service';
// // import { DatePickerModule } from '../../date-picker';
// // import {ViewService} from './services/view.service';
// // import { TranslateModule } from '@ngx-translate/core';
// // import {WtDatePickerModule} from '@shared/modules/wt-date-picker/wt-date-picker.module';
// // import {WtWeekdayModule} from "@dimensions/schedule-ui/modules/schedule-manager/src/components/common/wt-weekday.module";

// // import {LocalStorageService} from "@core/services/local-storage/local-storage.service";
// // import {TableStateService} from './services/table-state.service';
// // import { TableRowLinkComponent } from './components/table-row-link/table-row-link.component';
// // import {MomentPipe} from '@shared/modules/table-component/src/moment.pipe';

// import { CdkExpansionDirective } from './directives/cdk-expansion.directive';
// import { RowColorDirective } from './directives/row-color.directive';
// import { TableStateService } from './services/table-state.service';
// import { TableComponent } from './table.component';
// import { TableRowLinkComponent } from './components/table-row-link/table-row-link.component';
// import { ColumnFilterComponent } from './components/column-filter/column-filter.component';
// import { FilterDdIconComponent } from './components/filter-dd-icon/filter-dd-icon.component';
// import { MomentPipe } from './pipes/moment.pipe';
// import { RowLinkConstructorDirective } from './directives/row-link-constructor.directive';
// import { FilterService } from './services/filter.service';
// import { ViewService } from './services/view.service';
// // import { TableComponent } from './table.component';
// @NgModule({
//   imports: [
//     // DatePickerModule,
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     MatSelectModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//     MatTooltipModule,
//     MatProgressSpinnerModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     // TranslateModule.forChild(),
//     // WtDatePickerModule,
//     // WtWeekdayModule
//   ],
//   declarations: [
//     TableComponent,
//     // ColumnFilterComponent,
//     // FilterDdIconComponent,
//     CdkExpansionDirective,
//     RowColorDirective,
//     RowLinkConstructorDirective,
//     TableRowLinkComponent,
//     ColumnFilterComponent,
//     FilterDdIconComponent,
//     // TableRowLinkComponent,
//     MomentPipe
//   ],
//   exports: [
//     TableComponent,
//     MomentPipe
//   ],
//   // providers: [FilterService, ViewService, LocalStorageService, TableStateService]
//   providers: [TableStateService, FilterService, ViewService]
// })
// export class TableModule { }