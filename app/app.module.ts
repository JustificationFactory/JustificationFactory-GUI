import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';
import { MainComponent } from './components/main.component';
import { ActionsToolbarComponent } from './components/actions.toolbar.component';
import { DiagramComponent } from './components/diagram.component';
import { EditToolbarComponent } from './components/edit.toolbar.component';
import { PropertiesComponent } from './components/properties.component';

import { KeysPipe } from './pipes/KeysPipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        MainComponent,
        ActionsToolbarComponent,
        DiagramComponent,
        EditToolbarComponent,
        PropertiesComponent,
        KeysPipe

    ],
    providers: [
        MainComponent,
        ActionsToolbarComponent,
        DiagramComponent,
        EditToolbarComponent,
        PropertiesComponent
    ],
    bootstrap: [
        MainComponent,
        ActionsToolbarComponent,
        DiagramComponent,
        EditToolbarComponent,
        PropertiesComponent
    ]
})
export class AppModule { }