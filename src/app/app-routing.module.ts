import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnlineWorkspaceComponent} from './components/workspace/online/online-workspace.component';

const routes: Routes = [
  {path: '', component: OnlineWorkspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
