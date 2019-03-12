export class RegisterDto {
  first_name: string;
  last_name: string;

  username: string;
  email: string;
  password: string;

  constructor(first_name: string, last_name: string, username: string, email: string, password: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
