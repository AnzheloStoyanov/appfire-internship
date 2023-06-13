class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        //this.favourites=[] -- каквото и да е което искам да го има вски user

    }

}
class UserManager {
    
    loggedUser=null;
   
    users=[]

    constructor(){
        this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"));
        this.users=JSON.parse(localStorage.getItem("Users"))?JSON.parse(localStorage.getItem("Users")):[]
    }
    
    register = ({ username, password }) => {
        console.log("from userman")
        console.log(username, password)
        return new Promise((resolve, reject) => {
          let foundUser = this.users.find(user => user.username === username);
          console.log(!foundUser)
      
          if (!foundUser) {
            let arrayOfUsers = this.users;
            arrayOfUsers.push(new User(username,password));
            localStorage.setItem("Users", JSON.stringify(arrayOfUsers))      
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }

    login = ({ username, pass }) => {
        return new Promise((resolve, reject) => {
          let foundUser = this.users.find(user => user.username === username && user.password === pass);
         
          if (foundUser) {
            this.loggedUser = foundUser;
            localStorage.setItem('isThereUser', JSON.stringify(this.loggedUser));
            resolve(true);
          } else {
            console.log(username, pass)
            reject(false);
          }
        });
      };
      logout = () => {
        localStorage.removeItem('isThereUser');
    }
    }
    
    const userManager = new UserManager();

    export default userManager 
