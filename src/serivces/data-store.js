let instance = null;

class DataStore {
    constructor() {
        if(!instance) {
            instance = this;
        }
        return instance;
    }

    setCurrentUser = (user) => {
        this.currentUser = user;
        this.appCallback(this.currentUser);
    }

    setCurrentUserName = (userName) => {
        this.userName = userName;
    }

    getCurrentUser = () => {
        return this.currentUser;
    }

    setAppCallback = (callback) => {
        this.appCallback = callback;
    }
}

export default DataStore;