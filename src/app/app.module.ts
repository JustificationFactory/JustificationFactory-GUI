import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {ActionsToolbarComponent} from './components/toolbars/actions/actions.toolbar.component';
import {EditToolbarComponent} from './components/toolbars/edit/edit.toolbar.component';
import {PropertiesComponent} from './components/properties/properties.component';
import {DiagramComponent} from './components/diagram/diagram.component';
import {OfflineWorkspaceComponent} from './components/workspace/offline/offline-workspace.component';
import {PaletteComponent} from './components/palette/palette.component';
import {HttpClientModule} from '@angular/common/http';
import {ConnectorComponent} from './components/connector/connector.component';
import {WsConnectorService} from './services/webServices/ws-connector.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnlineWorkspaceComponent } from './components/workspace/online/online-workspace.component';


@NgModule({
  declarations: [
    ActionsToolbarComponent,
    EditToolbarComponent,
    PropertiesComponent,
    DiagramComponent,
    OfflineWorkspaceComponent,
    PaletteComponent,
    ConnectorComponent,
    AppComponent,
    OnlineWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ActionsToolbarComponent,
    EditToolbarComponent,
    PropertiesComponent,
    DiagramComponent,
    OfflineWorkspaceComponent,
    PaletteComponent,
    ConnectorComponent,
    WsConnectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
