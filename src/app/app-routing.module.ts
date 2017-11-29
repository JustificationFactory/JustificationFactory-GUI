import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OfflineWorkspaceComponent} from "./components/workspace/offline/offline-workspace.component";
import {OnlineWorkspaceComponent} from "./components/workspace/online/online-workspace.component";

const routes: Routes =[
  {path: 'offline', component:OfflineWorkspaceComponent},
  {path: 'online', component:OnlineWorkspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
