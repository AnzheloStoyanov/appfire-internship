class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  class MockStorage {
    storage = {};
  
    getItem(key) {
      return this.storage[key] || null;
    }
  
    setItem(key, value) {
      this.storage[key] = value;
    }
  
    removeItem(key) {
      delete this.storage[key];
    }
  }
  
  class UserManager {
    loggedUser = null;
    users = [];
    storage = new MockStorage();
  
    constructor() {
      this.loggedUser = JSON.parse(this.storage.getItem("loggedUser"));
      this.users = JSON.parse(this.storage.getItem("Users")) || [];
    }
  
    register = ({ username, password }) => {
      return new Promise((resolve, reject) => {
        let foundUser = this.users.find(user => user.username === username);
  
        if (!foundUser) {
          let arrayOfUsers = this.users;
          arrayOfUsers.push(new User(username, password));
          this.storage.setItem("Users", JSON.stringify(arrayOfUsers));
          resolve(true);
        } else {
          resolve(false);
        }
      });
    };
  
    login = ({ username, pass }) => {
      return new Promise((resolve, reject) => {
        let foundUser = this.users.find(
          user => user.username === username && user.password === pass
        );
  
        if (foundUser) {
          this.loggedUser = foundUser;
          this.storage.setItem("isThereUser", JSON.stringify(this.loggedUser));
          resolve(true);
        } else {
          reject(false);
        }
      });
    };
  
    logout = () => {
      this.storage.removeItem("isThereUser");
    };
  }
  
  // Instantiate UserManager
  const userManager = new UserManager();
  
  // Test cases for the register function
  const testRegister = async () => {
    try {
      // Test registering a new user
      let result = await userManager.register({
        username: "john",
        password: "password123",
      });
      console.log("Test Register - New User:", result === true);
  
      // Test registering an existing user
      result = await userManager.register({
        username: "john",
        password: "password123",
      });
      console.log("Test Register - Existing User:", result === false);
    } catch (error) {
      console.error("Error in testRegister:", error);
    }
  };
  
  // Test cases for the login function
  const testLogin = async () => {
    try {
      // Test login with valid credentials
      let result = await userManager.login({
        username: "john",
        pass: "password123",
      });
      console.log("Test Login - Valid Credentials:", result === true);
  
      // Test login with invalid credentials
      result = await userManager.login({
        username: "john",
        pass: "wrongpassword",
      });
      console.log("Test Login - Invalid Credentials:", result === false);
    } catch (error) {
      console.error("Error in testLogin:", error);
    }
  };
  
  // Test case for the logout function
  const testLogout = () => {
    try {
      userManager.logout();
      const isThereUser = userManager.storage.getItem("isThereUser");
      console.log("Test Logout:", isThereUser === null);
    } catch (error) {
      console.error("Error in testLogout:", error);
    }
  };
  
  // Run the tests
  testRegister()
    .then(() => testLogin())
    .then(testLogout)
    .catch(error => {
      console.error("Unhandled Error:", error);
    });
  
    class Comment {
        constructor(text) {
          this.id = Date.now() + Math.floor(Math.random() * 10000);
          this.date = new Date().toLocaleString();
          this.text = text;
        }
      }
      
      class Task {
        constructor(title, description, variant, term, userName) {
          this.currentDate = new Date().toLocaleString();
          this.title = title;
          this.description = description;
          this.variant = variant;
          this.comments = [];
          this.term = term;
          this.id = Date.now() + Math.floor(Math.random() * 10000);
          this.userName = userName;
        }
      }
      
    //   class MockStorage {
    //     storage = {};
      
    //     getItem(key) {
    //       return this.storage[key] || null;
    //     }
      
    //     setItem(key, value) {
    //       this.storage[key] = value;
    //     }
      
    //     removeItem(key) {
    //       delete this.storage[key];
    //     }
    //   }
      
      class TaskManager {
        constructor() {
          this.storage = new MockStorage();
          this.tasks = JSON.parse(this.storage.getItem("tasks")) || [];
          this.tasksHistory = JSON.parse(this.storage.getItem("tasksHistory")) || [];
        }
      
        saveTasksToStorage() {
          this.storage.setItem("tasks", JSON.stringify(this.tasks));
          this.storage.setItem("tasksHistory", JSON.stringify(this.tasksHistory));
        }
      
        getTasksByUserId(userName) {
          const tasks = this.tasks.filter((task) => task.userName === userName);
          const tasksHistory = this.tasksHistory.filter((task) => task.userName === userName);
          return { tasks, tasksHistory };
        }
      
        addTask(title, description, variant, term, userName) {
            const task = new Task(title, description, variant, term, userName);
            this.tasks.push(task);
            this.saveTasksToStorage();
            return task;
          }
      
        addCommentToTask(taskId, text) {
          const task = this.findTaskById(taskId);
          if (task) {
            const comment = new Comment(text);
            task.comments.push(comment);
            this.saveTasksToStorage();
            return true;
          } else {
            return false;
          }
        }
      
        deleteCommentFromTask(taskId, commentId) {
          const task = this.findTaskById(taskId);
          if (task) {
            const commentIndex = task.comments.findIndex((comment) => comment.id === commentId);
            if (commentIndex !== -1) {
              task.comments.splice(commentIndex, 1);
              this.saveTasksToStorage();
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      
        deleteTask(taskId) {
          const index = this.findTaskIndexById(taskId);
          if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasksToStorage();
            return true;
          } else {
            return false;
          }
        }
      
        deleteHistoryTask(taskId) {
            const index = this.findHistoryTaskIndexById(taskId);
            if (index !== -1) {
              this.tasksHistory.splice(index, 1);
              this.saveTasksToStorage();
              return true;
            } else {
              return false;
            }
          }
      
          completeTask(taskId) {
            const index = this.findTaskIndexById(taskId);
            if (index !== -1) {
              const task = this.tasks.splice(index, 1)[0];
              this.tasksHistory.push({ ...task, completed: true });
              this.saveTasksToStorage();
              return true;
            } else {
              return false;
            }
          }

       editTaskTitle(taskId, newTitle) {
  const task = this.findTaskById(taskId);
  if (task) {
    task.title = newTitle;
    this.saveTasksToStorage();
    return true;
  } else {
    return false;
  }
}
cancelTask(taskId) {
    const index = this.findTaskIndexById(taskId);
    if (index !== -1) {
      const task = this.tasks.splice(index, 1)[0];
      this.tasksHistory.push({ ...task, completed: false });
      this.saveTasksToStorage();
      return true;
    } else {
      return false;
    }
}
      
        findTaskById(taskId) {
          return this.tasks.find((task) => task.id === taskId);
        }
      
        findTaskIndexById(taskId) {
          return this.tasks.findIndex((task) => task.id === taskId);
        }
      
        findHistoryTaskIndexById(taskId) {
          return this.tasksHistory.findIndex((task) => task.id === taskId);
        }
      }
      
      // Unit tests
      const taskManager = new TaskManager();
      
     // Test cases for the addTask function
const testAddTask = () => {
    try {
      const task = taskManager.addTask("Task 1", "Description 1", "Variant 1", "Term 1", "john");
      console.log("Test Add Task:", task.title === "Task 1");
    } catch (error) {
      console.error("Error in testAddTask:", error);
    }
  };
  
  // Test case for the addCommentToTask function
  const testAddCommentToTask = () => {
    try {
      const taskId = taskManager.tasks[0].id;
      const result = taskManager.addCommentToTask(taskId, "New comment");
      console.log("Test Add Comment to Task:", result === true);
    } catch (error) {
      console.error("Error in testAddCommentToTask:", error);
    }
  };
  
  // Test case for the deleteCommentFromTask function
  const testDeleteCommentFromTask = () => {
    try {
      const taskId = taskManager.tasks[0].id;
      const commentId = taskManager.tasks[0].comments[0].id;
      const result = taskManager.deleteCommentFromTask(taskId, commentId);
      console.log("Test Delete Comment from Task:", result === true);
    } catch (error) {
      console.error("Error in testDeleteCommentFromTask:", error);
    }
  };
  
  // Test case for the deleteTask function
  const testDeleteTask = () => {
    try {
      const taskId = taskManager.tasks[0].id;
      const result = taskManager.deleteTask(taskId);
      console.log("Test Delete Task:", result === true);
    } catch (error) {
      console.error("Error in testDeleteTask:", error);
    }
  };
  
  // Test case for the deleteHistoryTask function
  const testDeleteHistoryTask = () => {
    try {
      const taskId = taskManager.tasksHistory[0].id;
      const result = taskManager.deleteHistoryTask(taskId);
      console.log("Test Delete History Task:", result === true);
    } catch (error) {
      console.error("Error in testDeleteHistoryTask:", error);
    }
  };
  
  // Test case for the completeTask function
  const testCompleteTask = () => {
    try {
        console.log(taskManager.tasks)
      const taskId = taskManager.tasks[0].id;
      const result = taskManager.completeTask(taskId);
      console.log("Test Complete Task:", result === true);
    } catch (error) {
      console.error("Error in testCompleteTask:", error);
    }
  };
  
  // Test case for the editTaskTitle function
  const testEditTaskTitle = () => {
    try {
      const taskId = taskManager.tasks[0].id;
      const result = taskManager.editTaskTitle(taskId, "New Title");
      console.log("Test Edit Task Title:", result === true);
    } catch (error) {
      console.error("Error in testEditTaskTitle:", error);
    }
  };
  
  // Test case for the cancelTask function
  const testCancelTask = () => {
    try {
      const taskId = taskManager.tasks[0].id;
      const result = taskManager.cancelTask(taskId);
      console.log("Test Cancel Task:", result === true);
    } catch (error) {
      console.error("Error in testCancelTask:", error);
    }
  };
  
  // Run the tests
  testAddTask();
  testAddTask();
  testAddTask();
  testAddTask();
  testEditTaskTitle();
  testAddCommentToTask();
  testAddCommentToTask();
  testAddCommentToTask();
  testDeleteCommentFromTask();
  testDeleteTask();
  testCancelTask();
  testCompleteTask();
  testDeleteHistoryTask();
 
 
  