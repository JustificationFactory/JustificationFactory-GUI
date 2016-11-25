import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';
import { ActionsToolbarComponent } from './components/actions.toolbar.component';
import { DiagramComponent } from './components/diagram.component';
import { EditToolbarComponent } from './components/edit.toolbar.component';
import { LoadDiagramComponent } from './components/load.diagram.component';
import { MenuComponent } from './components/menu.component';
import { PropertiesComponent } from './components/properties.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        ActionsToolbarComponent,
        DiagramComponent,
        EditToolbarComponent,
        LoadDiagramComponent,
        MenuComponent,
        PropertiesComponent
    ],
    providers: [

    ],
    bootstrap: [
        ActionsToolbarComponent,
        DiagramComponent,
        EditToolbarComponent,
        LoadDiagramComponent,
        MenuComponent,
        PropertiesComponent
    ]
})
export class AppModule { }