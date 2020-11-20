import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../authorize.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  public userID: Observable<string>;

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    console.log(this.authorizeService.getUser())
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
    this.userID = this.authorizeService.getUser().pipe(map(u => u && u.userId));
    console.log(this.userName);
  }
}
