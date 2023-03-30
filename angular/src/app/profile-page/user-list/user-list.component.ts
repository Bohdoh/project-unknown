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
  showFullTable: boolean = false; // add this flag
  isSortedAscending = true;
  constructor(private adminService: AdminService, private route: ActivatedRoute) {}
isAlphabeticSorted:boolean=false;

  ngOnInit(): void {
    this.adminService.getUsers(this.username).subscribe(
      (data: Enduser[]) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sortUsersByName() {
    this.isAlphabeticSorted=!this.isAlphabeticSorted;
    return this.users.sort((a,b)=>{
      if (a.username && b.username) {
        if (a.username.localeCompare(b.username) === -1) {
          return this.isAlphabeticSorted ? 1 : -1;
        }
        if (a.username.localeCompare(b.username) === 1) {
          return this.isAlphabeticSorted ? -1 : 1;
        }
        return 0;
      } else if (!a.username && b.username) {
        return this.isAlphabeticSorted ? -1 : 1;
      } else if (a.username && !b.username) {
        return this.isAlphabeticSorted ? 1 : -1;
      } else {
        return 0;
      }
    })

  }

  sortUsers() {
    this.isSortedAscending = !this.isSortedAscending;
    return this.users.sort((a, b) => {
      if (a.role && b.role) {
        if (a.role.localeCompare(b.role) === -1) {
          return this.isSortedAscending ? 1 : -1;
        }
        if (a.role.localeCompare(b.role) === 1) {
          return this.isSortedAscending ? -1 : 1;
        }
        return 0;
      } else if (!a.role && b.role) {
        return this.isSortedAscending ? -1 : 1;
      } else if (a.role && !b.role) {
        return this.isSortedAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
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

  toggleTableDisplay() {
    this.showFullTable = !this.showFullTable;
  }


}
