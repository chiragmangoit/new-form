import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userActive = false;
  formValue = '';
  private ActiveSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.ActiveSub = this.userService.activatedEmitter.subscribe((value) => {
      this.userActive = value;
    });

    // const observable = new Observable((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    // });
    
    // observable.subscribe(
    //   (data) => {
    //     console.log("For first" + data);
    //   }
    // )
    
    // observable.subscribe(
    //   (data) => {
    //     console.log("For second" + data);
    //   }
    // )

    // const subject = new Subject<number>();

    // subject.next(1); // this is missed
    // subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`),
    // });
    // subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`),
    // });
    // subject.next(2);
    // subject.next(3);
  }

  showForm(value:string) {
    this.formValue = value;
  }

  ngOnDestroy(): void {
    this.ActiveSub.unsubscribe();
  }
}
