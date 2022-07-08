import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  @ViewChild('form') signUpForm: NgForm;
  editMode: boolean = false;
  id: number;
  dropdownList: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  genders: string[] = ['male', 'female'];
  hobbies: any = [
    {
      id: 1,
      name: 'singing',
      selected: false,
    },
    {
      id: 2,
      name: 'dancing',
      selected: false,
    },
    {
      id: 3,
      name: 'reading',
      selected: false,
    },
  ];
  profession: string[] = [
    'Chiropractor',
    'Dentist',
    'Optometrist',
    'Developer',
    'Tester',
  ];
  contact: any = [
    {
      id: 1,
      name: '',
      number: '',
    },
  ];
  phoneNum1 = '';
  phoneNum2 = '';
  phoneNum3 = '';

  user: object = {
    userid: this.userDataService.userData.length + 1,
    name: '',
    email: '',
    gender: '',
    dob: '',
    dp: '',
    hobbies: [],
    phoneNum: '',
    qualification: [],
    profession: '',
    description: '',
    contacts: [],
  };
  add: number;

  constructor(
    private userDataService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dropdownList = ['MCA', 'BCA', 'B.tech', 'M.tech', 'B.Com'];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
    };
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      const newUserData = this.userDataService.getUserData(this.id);
      const selectedHobby: string[] = newUserData['hobbies'];
      this.fetchSelectedHobby(selectedHobby);
      this.user['name'] = newUserData['name'];
      this.user['email'] = newUserData['email'];
      this.user['gender'] = newUserData['gender'];
      this.user['dob'] = newUserData['dob'];
      const phone = newUserData['phoneNum'].split('-');
      this.phoneNum1 = phone[0];
      this.phoneNum2 = phone[1];
      this.phoneNum3 = phone[2];
      this.user['qualification'] = newUserData['qualification'];
      this.user['profession'] = newUserData['profession'];
      this.user['description'] = newUserData['description'];
      this.contact = newUserData['contacts'];
    }
  }

  getSelectedHobby(): string[] {
    const selectedHobby = [];
    for (let e of this.hobbies) {
      if (this.signUpForm.value.userDataTwo[e.id]) {
        selectedHobby.push(e.name);
      }
    }
    return selectedHobby;
  }

  fetchSelectedHobby(selectedHobby: string[]) {
    const hobbyName = [];
    for (let hobby of selectedHobby) {
      for (let staticHobby of this.hobbies) {
        hobbyName.push(staticHobby['name']);
        if (hobby == staticHobby['name']) {
          staticHobby['selected'] = true;
        }
      }
      const uniqueHobbyName = [...new Set(hobbyName)];
      if (uniqueHobbyName.includes(hobby) == false) {
        this.hobbies.push({
          id: this.hobbies.length + 1,
          name: hobby,
          selected: true,
        });
      }
    }
  }

  addHobbies() {
    this.add = 1;
  }

  pushHobby(name: string) {
    this.hobbies.push({
      id: this.hobbies.length + 1,
      name: name,
      selected: false,
    });
    this.add = 0;
  }

  onAddContacts() {
    this.contact.push({
      id: this.contact.length + 1,
      name: '',
      number: '',
    });
  }

  onRemoveContacts(index: number) {
    this.contact.splice(index, 1);
  }
  onSubmit() {
    this.user['phoneNum'] =
      this.phoneNum1 + '-' + this.phoneNum2 + '-' + this.phoneNum3;
    this.user['hobbies'] = this.getSelectedHobby();
    this.user['contacts'] = this.contact;
    if (!this.editMode) {
      this.user['userid'] = this.user['userid']++;
      this.userDataService.addData(this.user);
    } else {
      this.userDataService.updateData(this.id, this.user);
    }
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
