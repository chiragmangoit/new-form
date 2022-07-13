import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Subscription } from "rxjs";
import { StaticDataModel, User } from "../data.model";
import { UserService } from "../user.service";
import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.css"],
})
export class ReactiveFormComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  editMode: boolean = false;
  id: string;
  subscription:Subscription;
  selectedHobby: any = [];
  dropdownList: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  genders: string[];
  hobbies: any;
  profession: string[];
  add: number;
  newUserData:User;
  user: User = {
    name: "",
    email: "",
    gender: "",
    dob: "",
    dp: "",
    hobbies: ([] = []),
    phoneNum: "",
    qualification: [],
    profession: "",
    description: "",
    contacts: [],
  };

  constructor(
    private userDataService: UserService,
    private staticData:StaticDataModel,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.dropdownList = this.staticData.dropdownList;
    this.dropdownSettings = this.staticData.dropdownSettings;
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
      const phone = this.newUserData["phoneNum"].split("-");
      this.fetchSelectedHobby(selectedHobby);
      this.user["name"] = this.newUserData["name"];
      this.user["email"] = this.newUserData["email"];
      this.user["gender"] = this.newUserData["gender"];
      this.user["dob"] = this.newUserData["dob"];
      this.user["qualification"] = this.newUserData["qualification"];
      this.user["profession"] = this.newUserData["profession"];
      this.user["description"] = this.newUserData["description"];
      if (this.newUserData["contacts"]) {
        for (let info of this.newUserData["contacts"]) {
          this.user["contacts"].push(
            new FormGroup({
              name: new FormControl(info["name"], Validators.required),
              number: new FormControl(info["number"], [
                Validators.required,
                Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
              ]),
            })
          );
        }
      }
      this.regForm = new FormGroup({
        userDataOne: new FormGroup({
          name: new FormControl(this.user["name"], Validators.required),
          email: new FormControl(this.user["email"], [
            Validators.required,
            Validators.email,
          ]),
          gender: new FormControl(this.user["gender"], Validators.required),
          dob: new FormControl(this.user["dob"], Validators.required),
        }),
        userDataTwo: new FormGroup({
          phoneNum1: new FormControl(phone[0], [
            Validators.required,
            Validators.pattern("[0-9]{3}"),
          ]),
          phoneNum2: new FormControl(phone[1], [
            Validators.required,
            Validators.pattern("[0-9]{3}"),
          ]),
          phoneNum3: new FormControl(phone[2], [
            Validators.required,
            Validators.pattern("[0-9]{4}"),
          ]),
          hobbies: new FormArray(this.selectedHobby, Validators.required),
          newHobby: new FormControl("example"),
        }),
        userDataThree: new FormGroup({
          qualification: new FormControl(
            this.user["qualification"],
            Validators.required
          ),
          profession: new FormControl(
            this.user["profession"],
            Validators.required
          ),
          description: new FormControl(
            this.user["description"],
            Validators.required
          ),
          contacts: new FormArray(this.user["contacts"], Validators.required),
        }),
      });
    } else {
      this.regForm = new FormGroup({
        userDataOne: new FormGroup({
          name: new FormControl(this.user["name"], Validators.required),
          email: new FormControl(this.user["email"], [
            Validators.required,
            Validators.email,
          ]),
          gender: new FormControl(this.user["gender"], Validators.required),
          dob: new FormControl(this.user["dob"], Validators.required),
        }),
        userDataTwo: new FormGroup({
          dp: new FormControl(null, Validators.required),
          hobbies: new FormArray(this.user["hobbies"], Validators.required),
          newHobby: new FormControl(null),
          phoneNum1: new FormControl("", [
            Validators.required,
            Validators.pattern("[0-9]{3}"),
          ]),
          phoneNum2: new FormControl("", [
            Validators.required,
            Validators.pattern("[0-9]{3}"),
          ]),
          phoneNum3: new FormControl("", [
            Validators.required,
            Validators.pattern("[0-9]{4}"),
          ]),
        }),
        userDataThree: new FormGroup({
          qualification: new FormControl(
            this.user["qualification"],
            Validators.required
          ),
          profession: new FormControl(
            this.user["profession"],
            Validators.required
          ),
          description: new FormControl(
            this.user["description"],
            Validators.required
          ),
          contacts: new FormArray(
            [
              new FormGroup({
                name: new FormControl(
                  this.user["contacts"].name,
                  Validators.required
                ),
                number: new FormControl(this.user["contacts"].number, [
                  Validators.required,
                  Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
                ]),
              }),
            ],
            Validators.required
          ),
        }),
      });
    }
  }

  getSelectedHobby(event: any) {
    this.selectedHobby = this.regForm.get("userDataTwo.hobbies") as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.selectedHobby.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      this.selectedHobby.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          this.selectedHobby.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  fetchSelectedHobby(selectedHobby: string[]) {
    const hobbyName = [];
    for (let hobby of selectedHobby) {
      for (let staticHobby of this.hobbies) {
        hobbyName.push(staticHobby["name"]);
        if (hobby == staticHobby["name"]) {
          staticHobby["selected"] = true;
          this.selectedHobby.push(new FormControl(staticHobby["name"]));
        }
      }
      const uniqueHobbyName = [...new Set(hobbyName)];
      if (uniqueHobbyName.includes(hobby) == false) {
        this.selectedHobby.push(new FormControl(hobby));
        this.hobbies.push({
          id: this.hobbies.length + 1,
          name: hobby,
          selected: true,
        });
      }
    }
  }

  onAddContacts() {
    (<FormArray>this.regForm.get("userDataThree.contacts")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        number: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
        ]),
      })
    );
  }

  get controls() {
    // a getter!
    return (<FormArray>this.regForm.get("userDataThree.contacts")).controls;
  }

  onRemoveContacts(index: number) {
    (<FormArray>this.regForm.get("userDataThree.contacts")).removeAt(index);
  }

  addHobbies() {
    this.add = 1;
    this.regForm.get("userDataTwo.newHobby")!.setValidators(Validators.required);
    this.cdRef.detectChanges();
  }

  pushHobby() {
    this.hobbies.push({
      id: this.hobbies.length + 1,
      name: this.regForm.value.userDataTwo.newHobby,
      selected: false,
    });
    this.add = 0;
  }

  onCancel() {
    this.add = 0;
  }

  onSubmit() {
    this.user["name"] = this.regForm.value.userDataOne.name;
    this.user["email"] = this.regForm.value.userDataOne.email;
    this.user["gender"] = this.regForm.value.userDataOne.gender;
    this.user["dob"] = this.regForm.value.userDataOne.dob;
    this.user["dp"] = this.regForm.value.userDataTwo.dp;
    this.user["hobbies"] = this.regForm.value.userDataTwo.hobbies;
    this.user["phoneNum"] =
      this.regForm.value.userDataTwo.phoneNum1 +
      "-" +
      this.regForm.value.userDataTwo.phoneNum2 +
      "-" +
      this.regForm.value.userDataTwo.phoneNum3;
    this.user["qualification"] = this.regForm.value.userDataThree.qualification;
    this.user["profession"] = this.regForm.value.userDataThree.profession;
    this.user["description"] = this.regForm.value.userDataThree.description;
    this.user["contacts"] = this.regForm.value.userDataThree.contacts;

    if (!this.editMode) {
      this.userDataService.addData(this.user);
    } else {
      this.userDataService.updateData(this.id, this.user).subscribe();
    }
    this.userDataService.getData().subscribe();
    this.router.navigate(["/home"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
