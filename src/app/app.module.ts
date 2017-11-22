import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ActionsToolbarComponent } from './components/actions.toolbar.component';
import { EditToolbarComponent } from './components/edit.toolbar.component';
import { PropertiesComponent } from './components/properties.component';
import { DiagramComponent } from './components/diagram.component';
import { MainComponent } from './components/main.component';
import { PaletteComponent } from './components/palette.component';
import {HttpClientModule} from '@angular/common/http';
import { ConnectorComponent } from './components/connector/connector.component';
import {WsConnectorService} from './services/connector/ws-connector.service';


@NgModule({
  declarations: [
    ActionsToolbarComponent,
    EditToolbarComponent,
    PropertiesComponent,
    DiagramComponent,
    MainComponent,
    PaletteComponent,
    ConnectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ActionsToolbarComponent,
    EditToolbarComponent,
    PropertiesComponent,
    DiagramComponent,
    MainComponent,
    PaletteComponent,
    ConnectorComponent,
    WsConnectorService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }