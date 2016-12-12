import {NgModule, Renderer} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';

import { KeysPipe } from './pipes/KeysPipe';

import { ActionsToolbarComponent } from './components/actions.toolbar.component';
import { EditToolbarComponent } from './components/edit.toolbar.component';
import { PropertiesComponent } from './components/properties.component';
import { DiagramComponent } from './components/diagram.component';
import { MainComponent } from './components/main.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        KeysPipe,
        ActionsToolbarComponent,
        EditToolbarComponent,
        PropertiesComponent,
        DiagramComponent,
        MainComponent,

    ],
    providers: [
        ActionsToolbarComponent,
        EditToolbarComponent,
        PropertiesComponent,
        DiagramComponent,
        MainComponent,
        Renderer,
    ],
    bootstrap: [
        MainComponent
    ]
})
export class AppModule {

}