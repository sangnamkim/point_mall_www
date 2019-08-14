import { observable ,action ,computed} from 'mobx';


export default class AuthStore {
    BASE_URL = 'http://localhost:8003';

    @observable authToken = null ;

    constructor(rootStore) {
            this.rootStore = rootStore; 
            this.authToken = localStorage.getItem('auth_token');
    }

    @action setToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
        localStorage.setItem('refresh_token', token.refresh_token);
    }

    @action deleteToken() {
        this.rootStore.itemStore.clearCartItems();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        this.authToken = null;
    }

    @computed get IsLoggedIn() {
        return this.authToken != null;
    }

    get refreshToken() {
        return localStorage.getItem('refresh_token');
    }
}