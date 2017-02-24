import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';

import { ActionsToolbarComponent } from './components/actions.toolbar.component';
import { EditToolbarComponent } from './components/edit.toolbar.component';
import { PropertiesComponent } from './components/properties.component';
import { DiagramComponent } from './components/diagram.component';
import { MainComponent } from './components/main.component';
import { PaletteComponent } from './components/palette.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        ActionsToolbarComponent,
        EditToolbarComponent,
        PropertiesComponent,
        DiagramComponent,
        MainComponent,
        PaletteComponent
    ],
    providers: [
        ActionsToolbarComponent,
        EditToolbarComponent,
        PropertiesComponent,
        DiagramComponent,
        MainComponent,
        PaletteComponent
    ],
    bootstrap: [
        MainComponent
    ]
})
export class AppModule {

}