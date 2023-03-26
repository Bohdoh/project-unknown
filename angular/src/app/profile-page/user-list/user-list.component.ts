import {Component, Input, OnInit} from '@angular/core';
import {Enduser} from "../../interfaces/enduser";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  @Input() username: string|any;
  users: Enduser[] = [];

  name:string|any;

constructor(private adminService: AdminService, private route: ActivatedRoute) {
}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.adminService.getUsers(this.username).subscribe(
      (data: Enduser[]) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );

    console.log(this.username)
  }


  upgrade(name: string) {
    this.adminService.upgrade(name).subscribe(() => {
      console.log(`Upgraded ${name}`);
    }, (error) => {
      console.error(error);
    });
  }

  downgrade(name: string) {
    this.adminService.downgrade(name).subscribe(() => {
      console.log(`Downgraded ${name}`);
    }, (error) => {
      console.error(error);
    });
  }



}
