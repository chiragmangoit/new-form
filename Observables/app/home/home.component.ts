import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../data.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  usersData: User[];
  subscription: Subscription;
  loading: boolean = true;
  editMode: boolean = false;
  constructor(private userservice: UserService) {}

  ngOnInit() {
    this.subscription = this.userservice.getData().subscribe((data) => {
      this.usersData = data;
      this.loading = false;
    });
  }
  onDelete(userId: string) {
    this.userservice.deleteData(userId).subscribe(() => {
      this.userservice.getData().subscribe((data) => {
        this.usersData = data;
        this.loading = false;
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
