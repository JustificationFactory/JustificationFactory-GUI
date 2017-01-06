import { NgModule } from '@angular/core';
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
import { PaletteComponent } from './components/palette.component';
import { DialogAnchorDirective } from './components/dialoganchor.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        KeysPipe,
        ActionsToolbarComponent,
        EditToolbarComponent,
        PropertiesComponent,
        DiagramComponent,
        MainComponent,
        PaletteComponent,
        DialogAnchorDirective
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