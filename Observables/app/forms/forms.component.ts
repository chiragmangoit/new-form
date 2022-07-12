import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Subscription } from "rxjs";
import { StaticDataModel, User } from "../data.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"],
})
export class FormsComponent implements OnInit, OnDestroy {
  @ViewChild("form") signUpForm: NgForm;
  editMode: boolean = false;
  id: string;
  subscription: Subscription;
  dropdownList: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  genders: string[];
  profession: string[];
  contact: any;
  phoneNum1 = "";
  phoneNum2 = "";
  phoneNum3 = "";
  hobbies: any = [];
  add: number;
  newUserData: User;
  user: any = {
    name: "",
    email: "",
    gender: "",
    dob: "",
    dp: "",
    hobbies: [],
    phoneNum: "",
    qualification: [],
    profession: "",
    description: "",
    contacts: [],
  };
  
  constructor(
    private userDataService: UserService,
    private staticData: StaticDataModel,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dropdownList = this.staticData.dropdownList;
    this.dropdownSettings = this.staticData.dropdownSettings;
    this.contact = this.staticData.contact;
    this.profession = this.staticData.profession;
    this.genders = this.staticData.genders;
    this.hobbies = this.staticData.hobbies;
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;
      this.fetchData();
    });
  }

  fetchData() {
    this.userDataService.getUserData(this.id).subscribe((data) => {
      this.newUserData = data;
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      const selectedHobby: string[] = this.newUserData["hobbies"];
      this.fetchSelectedHobby(selectedHobby);
      this.user["name"] = this.newUserData["name"];
      this.user["email"] = this.newUserData["email"];
      this.user["gender"] = this.newUserData["gender"];
      this.user["dob"] = this.newUserData["dob"];
      const phone = this.newUserData["phoneNum"].split("-");
      this.phoneNum1 = phone[0];
      this.phoneNum2 = phone[1];
      this.phoneNum3 = phone[2];
      this.user["qualification"] = this.newUserData["qualification"];
      this.user["profession"] = this.newUserData["profession"];
      this.user["description"] = this.newUserData["description"];
      this.contact = this.newUserData["contacts"];
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
        hobbyName.push(staticHobby["name"]);
        if (hobby == staticHobby["name"]) {
          staticHobby["selected"] = true;
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
      name: "",
      number: "",
    });
  }

  onRemoveContacts(index: number) {
    this.contact.splice(index, 1);
  }

  onSubmit() {
    this.user["phoneNum"] =
      this.phoneNum1 + "-" + this.phoneNum2 + "-" + this.phoneNum3;
    this.user["hobbies"] = this.getSelectedHobby();
    this.user["contacts"] = this.contact;
    if (!this.editMode) {
      this.userDataService.addData(this.user);
    } else {
      this.userDataService.updateData(this.id, this.user).subscribe();
    }
    this.subscription = this.userDataService.getData().subscribe();
    this.router.navigate(["/home"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
