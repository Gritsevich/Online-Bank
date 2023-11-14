import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isFTwoA = false
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setIsFTwoA(bool) {
        this._isFTwoA = bool
    }

    get isFTwoA() {
        return this._isFTwoA
    }

    get isAuth() {
        return this._isAuth
    }
    
    get user() {
        return this._user
    }
}
