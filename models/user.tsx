export class User {
    name: string;
    picture: string;
    email: string;
  
    constructor({ name, picture, email }: { name: string; picture: string; email: string }) {
      this.name = name;
      this.picture = picture;
      this.email = email;
    }
  
    static fromJSON(json: any): User {
      return new User({
        name: json['given_name'] + ' ' + json['family_name'],
        picture: json['picture'],
        email: json['email'],
      });
    }
  
    toSerializable() {
      return {
        name: this.name,
        picture: this.picture,
        email: this.email,
      };
    }
  }