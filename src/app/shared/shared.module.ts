import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  FormlyFieldInputComponent,
} from '@core/forms/formly-field-input/formly-field-input-component';
import { IonicModule } from '@ionic/angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import {
  AddRecordComponent,
} from './components/add-record/add-record.component';
import { MapComponent } from './components/map/map.component';
import { PopoverComponent } from './components/popover/popover.component';
import {
  QrScannerComponent,
} from './components/qr-scanner/qr-scanner.component';
import {
  ShopScannerComponent,
} from './components/shop-scanner/shop-scanner.component';

@NgModule({
  entryComponents: [
    AddRecordComponent,
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ],
  declarations: [
    AddRecordComponent,
    MapComponent,
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
    FormlyFieldInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'customInput', component: FormlyFieldInputComponent },
      ],
    }),
    FormlyIonicModule,
    LeafletModule,
  ],
  exports: [
    AddRecordComponent,
    MapComponent,
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ]
})
export class SharedModule { }
