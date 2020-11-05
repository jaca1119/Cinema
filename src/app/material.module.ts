import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule
    ],
    exports: [
        MatSliderModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule
    ]
})
export class MaterialModule { }
