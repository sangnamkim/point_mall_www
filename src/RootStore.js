
import ItemStore from "./ItemStore";
import AuthStore from "./AuthStore";

export default class RootStore {
    
    constructor() {
        this.authStore = new AuthStore();
        this.itemStore = new ItemStore();
    }
}