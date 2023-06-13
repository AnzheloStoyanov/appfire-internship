class Comment {
    constructor(text) {
        this.id = Date.now() + Math.floor(Math.random() * 10000); // Generate comment ID
        this.date = new Date().toLocaleString(); // Current date and time
        this.text = text;
    }
}

class Task {
    constructor(title, description, variant, term, userName) {
        this.currentDate = new Date().toLocaleString()
        this.title = title;
        this.description = description;
        this.variant = variant;
        this.comments = [];
        this.term = term;
        this.id = Date.now() + Math.floor(Math.random() * 10000);
        this.userName = userName;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.tasksHistory = JSON.parse(localStorage.getItem("tasksHistory")) || [];
    }


    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("tasksHistory", JSON.stringify(this.tasksHistory));
    }

    getTasksByUserId(userName) {
        const tasks = this.tasks.filter((task) => task.userName === userName);
        const tasksHistory = this.tasksHistory.filter((task) => task.userName === userName);
        return { tasks, tasksHistory };
    }

    addTask(title, description, variant, term, userName) {
        const task = new Task(title, description, variant, term, userName);
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
        console.log(task)
        return task;
    }

    addCommentToTask(taskId, text) {
        const task = this.findTaskById(taskId);
        if (task) {
            const comment = new Comment(text);
            task.comments.push(comment);
            this.saveTasksToLocalStorage();
            console.log("Comment added successfully.");
        } else {
            console.log("Task not found.");
        }
    }

    deleteCommentFromTask(taskId, commentId) {
        const task = this.findTaskById(taskId);
        if (task) {
            const commentIndex = task.comments.findIndex((comment) => comment.id === commentId);
            if (commentIndex !== -1) {
                task.comments.splice(commentIndex, 1);
                this.saveTasksToLocalStorage();
                console.log("Comment deleted successfully.");
            } else {
                console.log("Comment not found.");
            }
        } else {
            console.log("Task not found.");
        }
    }

    deleteTask(taskId) {
        const index = this.findTaskIndexById(taskId);
        if (index !== -1) {
            const task = this.tasks.splice(index, 1)[0];

            this.saveTasksToLocalStorage();
            console.log("Task deleted successfully.");
        } else {
            console.log("Task not found.");
        }
    }
    deleteHistoryTask(taskId) {
        const index = this.findHistoryTaskIndexById(taskId);
        if (index !== -1) {
            const task = this.tasksHistory.splice(index, 1)[0];
            this.saveTasksToLocalStorage();
            console.log("Task deleted successfully.");
        } else {
            console.log("Task not found.")
            console.log(this.tasksHistory);
        }
    }

    completeTask(taskId) {
        const index = this.findTaskIndexById(taskId);
        if (index !== -1) {
            const task = this.tasks.splice(index, 1)[0];
            this.tasksHistory.push({ ...task, completed: true });
            this.saveTasksToLocalStorage();
            console.log("Task marked as completed and deleted.");
        } else {
            console.log("Task not found.");
        }
    }

    cancelTask(taskId) {
        const index = this.findTaskIndexById(taskId);
        if (index !== -1) {
            const task = this.tasks.splice(index, 1)[0];
            this.tasksHistory.push({ ...task, completed: false });
            this.saveTasksToLocalStorage();
            console.log("Task marked as canceled and deleted.");
        } else {
            console.log("Task not found.");
        }
    }
    editTaskTitle = (taskId, newTitle) => {
        const task = this.findTaskById(taskId);
        if (task) {
            task.title = newTitle;
            this.saveTasksToLocalStorage();
            console.log("Task title updated successfully.");
        } else {
            console.log("Task not found.");
        }
    }
    editTaskDescription = (taskId, newDescription) => {
        const task = this.findTaskById(taskId);
        if (task) {
            task.description = newDescription;
            this.saveTasksToLocalStorage();
            console.log("Task description updated successfully.");
        } else {
            console.log("Task not found.");
        }
    }
    editTaskDate = (taskId, newDate) => {
        const task = this.findTaskById(taskId);
        if (task) {
            task.term = newDate;
            this.saveTasksToLocalStorage();
            console.log("Task date updated successfully.");
        } else {
            console.log("Task not found.");
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

const taskManager = new TaskManager();
export default taskManager;



