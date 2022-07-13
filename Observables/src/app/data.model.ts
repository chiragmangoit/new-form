export interface User {
  id?: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  dp: string;
  hobbies: [];
  phoneNum: string;
  qualification: [];
  profession: string;
  description: string;
  contacts: any;
}

export class StaticDataModel {
  
  genders: string[] = ["male", "female"];

  hobbies: any = [
    {
      id: 1,
      name: "singing",
      selected: false,
    },
    {
      id: 2,
      name: "dancing",
      selected: false,
    },
    {
      id: 3,
      name: "reading",
      selected: false,
    },
  ];

  profession: string[] = [
    "Chiropractor",
    "Dentist",
    "Optometrist",
    "Developer",
    "Tester",
  ];

  contact: any = [
    {
      id: 1,
      name: "",
      number: "",
    },
  ];

  dropdownList = ["MCA", "BCA", "B.tech", "M.tech", "B.Com"];

  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
  };

}
