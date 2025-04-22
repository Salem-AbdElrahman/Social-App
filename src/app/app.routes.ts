import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { logUserGuard } from './core/gaurds/log-user.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { NotfoundComponent } from './pages/main/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logUserGuard],
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent),
        title: 'Login'
      },
      {
        path: 'signup',
        loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent),
        title: 'Register'
      },
      {
        path: 'forgot',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'forgotPassword'
      },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'timeline',
        loadComponent: () => import('./components/timeline/timeline.component').then(m => m.TimelineComponent),
        title: 'Timeline'
      },
      {
        path: 'post-details/:id',
        loadComponent: () => import('./components/post-details/post-details.component').then(m => m.PostDetailsComponent),
        title: 'Post Details'
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

