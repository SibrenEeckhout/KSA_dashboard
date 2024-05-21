export default class LocalStorageService {
    setToken(token){
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    removeToken(){
        localStorage.removeItem('token');
    }

    setUser(user){
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    removeUser(){
        localStorage.removeItem('user');
    }
}