import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: {}[] = [
    {
      userid: 1,
      name: 'tarun',
      email: 'tarun@gmail.com',
      gender: 'male',
      dob: '2000-09-24',
      dp: '',
      hobbies: ([] = ['singing']),
      phoneNum: '123-456-7890',
      qualification: ['MCA', 'BCA'],
      profession: 'Developer',
      description: 'lorem Ipsum',
      contacts: [
        {
          name: 'chirag',
          number: '123-456-7890',
        },
      ],
    },
    {
      userid: 2,
      name: 'bhawin',
      email: 'bhawin@gmail.com',
      gender: 'male',
      dob: '2000-06-01',
      dp: '',
      hobbies: ([] = ['singing', 'dancing']),
      phoneNum: '123-456-7890',
      qualification: ['MCA', 'BCA'],
      profession: 'Developer',
      description: 'lorem Ipsum',
      contacts: [
        {
          name: 'chirag',
          number: '123-456-7890',
        },
        {
          name: 'ajay',
          number: '123-456-7890',
        },
      ],
    },
    {
      userid: 3,
      name: 'mohit',
      email: 'mohit@gmail.com',
      gender: 'male',
      dob: '2000-06-01',
      dp: '',
      hobbies: ([] = ['singing', 'dancing']),
      phoneNum: '123-456-7890',
      qualification: ['MCA', 'BCA'],
      profession: 'Developer',
      description: 'lorem Ipsum',
      contacts: [
        {
          name: 'chirag',
          number: '123-456-7890',
        },
        {
          name: 'ajay',
          number: '123-456-7890',
        },
      ],
    },
    {
      userid: 4,
      name: 'neeraj',
      email: 'neeraj@gmail.com',
      gender: 'male',
      dob: '2000-06-01',
      dp: '',
      hobbies: ([] = ['singing', 'dancing']),
      phoneNum: '123-456-7890',
      qualification: ['MCA', 'BCA'],
      profession: 'Developer',
      description: 'lorem Ipsum',
      contacts: [
        {
          name: 'chirag',
          number: '123-456-7890',
        },
        {
          name: 'ajay',
          number: '123-456-7890',
        },
      ],
    },
  ];
  constructor() {}
  dataUpdated = new Subject<{}[]>();
  getData() {
    return this.userData.slice();
  }

  getUserData(id: number) {
    return this.userData[id];
  }
  addData(newUserInfo: object) {
    this.userData.push(newUserInfo);
  }

  updateData(index: number, newUserData: object) {
    this.userData[index] = newUserData;
    this.dataUpdated.next(this.userData.slice());
  }

  deleteData(index: number) {
    this.userData.splice(index, 1);
    this.dataUpdated.next(this.userData.slice());
  }

  activatedEmitter = new Subject<boolean>();
}
