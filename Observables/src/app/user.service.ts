import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./data.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get<{ [key: string]: User }>(
        "https://getting-started-http-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map((responseData) => {
          const user: User[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              user.push({ ...responseData[key], id: key });
            }
          }
          return user;
        })
      );
  }

  getUserData(userId: string) {
    return this.http
      .get(
        "https://getting-started-http-default-rtdb.firebaseio.com/posts/" +
          userId +
          ".json"
      )
      .pipe(
        map((responseData) => {
          let specificUser: {} = {};
          specificUser = responseData;
          return specificUser;
        })
      );
  }

  addData(newUserInfo: User) {
    this.http
      .post(
        "https://getting-started-http-default-rtdb.firebaseio.com/posts.json",
        newUserInfo
      )
      .subscribe();
  }

  updateData(userId: string, newUserData: User) {
    return this.http.put(
      "https://getting-started-http-default-rtdb.firebaseio.com/posts/" +
        userId +
        ".json",
      newUserData
    );
  }

  deleteData(userId: string) {
    return this.http.delete(
      "https://getting-started-http-default-rtdb.firebaseio.com/posts/" +
        userId +
        ".json"
    );
  }

  activatedEmitter = new Subject<boolean>();
}
