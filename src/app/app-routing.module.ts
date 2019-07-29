import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CurrentStatusComponent } from './pages/current-status/current-status.component';
import { NestedDataComponent } from './pages/nested-data/nested-data.component';
import { LoggedInGuard } from './guard/logged-in.guard';
import { LoggedOutGuard } from './guard/logged-out.guard';
import { CurrentResolverService } from './resolvers/current.resolver.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedOutGuard],
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login', canActivate: [LoggedInGuard], component: LogInComponent },
  { path: 'sign-in', canActivate: [LoggedInGuard], component: SignInComponent },
  {
    path: 'current-status',
    canActivate: [LoggedOutGuard],
    component: CurrentStatusComponent,
    resolve: { policies: CurrentResolverService }
  },
  {
    path: 'nested-data',
    canActivate: [LoggedOutGuard],
    component: NestedDataComponent,
    resolve: { policies: CurrentResolverService }
  },
  { path: '**', canActivate: [LoggedOutGuard], redirectTo: 'current-status' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
