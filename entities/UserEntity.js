class UserEntity {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }

    getFullName() {
      return `${this.name}`;
    }
  }

  module.exports = UserEntity;
