import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
