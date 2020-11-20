import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import {ServiceService} from '../api-authorization/service.service';
import { ContactsComponent } from './contacts/contacts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule,MatToolbarModule,MatIconModule,MatTabsModule  } from '@angular/material';
// import { MaterialContactComponent } from '.c:/Users/krish/source/repos/AuthenticationWithAng8/AuthenticationWithAng8/ClientApp/src/MaterialContact/MaterialContact.component';
// import { MyComponentComponent } from '.c:/Users/krish/source/repos/AuthenticationWithAng8/AuthenticationWithAng8/ClientApp/src/my-component/my-component.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,

    HomeComponent,
    CounterComponent,
    FetchDataComponent,
      ContactsComponent
      // MaterialContactComponent,
,      // MyComponentComponent
         ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule ,
    FormsModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: 'contacts', component: ContactsComponent, canActivate: [AuthorizeGuard] },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },


      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },

    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
