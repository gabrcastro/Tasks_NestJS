export class User {
  id: string;
  fullName: string;
  email: string;
  password: string;

  constructor(id: string, fullName: string, email: string, password: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
