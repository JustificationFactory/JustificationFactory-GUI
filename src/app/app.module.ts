import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {PropertiesComponent} from './components/properties/properties.component';
import {DiagramComponent} from './components/diagram/diagram.component';
import {PaletteComponent} from './components/palette/palette.component';
import {HttpClientModule} from '@angular/common/http';
import {ConnectorComponent} from './components/connector/connector.component';
import {WsRetrieverService} from './services/webServices/ws-retriever.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OnlineWorkspaceComponent} from './components/workspace/online/online-workspace.component';
import {WsSenderService} from './services/webServices/ws-sender.service';
import { WorkspaceToolbarComponent } from './components/workspace/toolbar/workspace-toolbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewPatternFormComponent } from './components/workspace/forms/new-pattern-form/new-pattern-form.component';
import { NewStepFormComponent } from './components/workspace/forms/new-step-form/new-step-form.component';
import {IOTypeService} from './services/webServices/iotype.service';
import { ArrayPreprocessDirective } from './directives/array-preprocess.directive';


@NgModule({
  declarations: [
    PropertiesComponent,
    DiagramComponent,
    PaletteComponent,
    ConnectorComponent,
    AppComponent,
    OnlineWorkspaceComponent,
    WorkspaceToolbarComponent,
    NewPatternFormComponent,
    NewStepFormComponent,
    ArrayPreprocessDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    PropertiesComponent,
    DiagramComponent,
    PaletteComponent,
    ConnectorComponent,
    WsRetrieverService,
    WsSenderService,
    IOTypeService
  ],
  entryComponents: [
    NewPatternFormComponent,
    NewStepFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
