import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User }         from '../user';
import { UserService }  from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;//https://angular.io/tutorial/toh-pt3#users-component-template You used a property binding to give the parent UsersComponent control over the child UserDetailComponent.

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');//Route parameters are always strings. The JavaScript (+) operator converts the string to a number
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }
}
