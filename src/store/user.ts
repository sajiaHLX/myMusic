import { observable } from "mobx";

class User {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}

export default User;