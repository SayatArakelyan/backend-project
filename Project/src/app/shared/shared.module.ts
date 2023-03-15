import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzSliderModule} from 'ng-zorro-antd/slider';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {
  NzDatePickerModule,
  NzFormModule,
  NzModalModule,
  NzPageHeaderModule,
  NzRadioModule,
  NzSelectModule,
  NzUploadModule
} from 'ng-zorro-antd';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzSliderModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzInputModule,
    NzInputModule,
    NzFormModule,
    NzModalModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzUploadModule,
    NzDatePickerModule,
    NzRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NzSliderModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzInputModule,
    NzInputModule,
    NzFormModule,
    NzModalModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzUploadModule,
    NzDatePickerModule,
    NzRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
