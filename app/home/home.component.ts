import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { count } from 'rxjs-compat/operator/count';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  usersData: {}[] = [];
  subscription: Subscription;
  editMode: boolean = false;
  constructor(
    private userservice: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // const customIntervalObservable = new Observable((observe) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observe.next(count);
    //     if (count == 5) {
    //       observe.complete();
    //     }
    //     if (count > 3) {
    //       observe.error(new Error('count is greater than 3'));
    //     }
    //     count++;
    //   }, 1000);
    // });
    // this.subscription = customIntervalObservable
    //   .pipe(
    //     filter((data) => {
    //       return data > 0;
    //     }),
    //     map((data: number) => {
    //       return 'Round--' + data;
    //     })
    //   )
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (error) => {
    //       alert(error.message);
    //     },
    //     () => {
    //       console.log('observable complete');
    //     }
    //   );
    this.userservice.dataUpdated.subscribe((data) => {
      this.usersData = data;
    });
    this.usersData = this.userservice.getData();
  }
  onDelete(index: number) {
    this.userservice.deleteData(index);
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
