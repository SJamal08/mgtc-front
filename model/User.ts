export class User {
  id: number | undefined;
  uuid: string;
  username: string;
  email: string;

  constructor(uuid: string, username: string, email: string, id?: number) {
    this.id = id;
    this.uuid = uuid;
    this.username = username;
    this.email = email;
  }
}
