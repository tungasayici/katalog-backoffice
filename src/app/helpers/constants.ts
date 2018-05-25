export class Constants {

    public getEnvUrl():string{
        //return window.localStorage.getItem("url");
        return "https://katalog-backend.herokuapp.com"
    }

    public getUserName():string{
        //return window.localStorage.getItem("email");
        return "catalogAdmin"
    }

    public getPassword():string{
        //return window.localStorage.getItem("password");
        return "102030"
    }
}