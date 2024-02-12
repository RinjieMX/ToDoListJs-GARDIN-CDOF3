const readline = require('readline-sync');
const fs = require('fs');

const MenuFunction = () => {
    const Menu = ` 
How to use :
$ 1 Display remaining items
$ 2 Add a new item
$ 3 Delete an item
$ 4 Complete an item
$ 5 Display done items

$ 6 Quit
`;

    console.log(Menu);
};

let running = true;

function addTaskCommand(newTask) {
    fs.appendFileSync('todo.txt', `\n${newTask}`);
    showTodoList();
}

function showTodoList() {
    try {
        const data = fs.readFileSync('todo.txt', 'utf-8');
        const tasks = data.split('\n');

        if (tasks.length > 1) { // Check if there is more than one line (title + tasks)
            console.log(tasks[0]); // Display the title without an index
            for (let index = 1; index < tasks.length; index++) {
                console.log(`${index}. ${tasks[index]}`);
            }
        } else {
            console.log('The to-do list is empty.');
        }
    } catch (error) {
        console.error('An error occurred while reading the todo.txt file:', error.message);
    }
}

function MarkAsComplete(index){
    try {
        const data = fs.readFileSync('todo.txt', 'utf-8');
        const tasks = data.split('\n');

        if (index <= 0 || index > tasks.length){
            console.log('The index is not correct.');
        }
        else{
            const item = tasks[index];
            fs.appendFileSync('done.txt', `\n${item}`);

            const removedTask = tasks.splice(index, 1)[0];
            const updatedTasks = tasks.join('\n');
            fs.writeFileSync('todo.txt', updatedTasks);
        }

        if (tasks.length > 1) {
            console.log(tasks[0]);
            for (let index = 1; index < tasks.length; index++) {
                console.log(`${index}. ${tasks[index]}`);
            }
        } else {
            console.log('The to-do list is empty.');
        }
    } catch (error) {
        console.error('An error occurred while reading the todo.txt file:', error.message);
    }
}

function deleteTask(index) {
    try {
        const data = fs.readFileSync('todo.txt', 'utf-8');
        const tasks = data.split('\n');

        if (index <= 0 || index > tasks.length){
            console.log('The index is not correct.');
        }
        else{
            const item = tasks[index];

            const removedTask = tasks.splice(index, 1)[0];
            const updatedTasks = tasks.join('\n');
            fs.writeFileSync('todo.txt', updatedTasks);
        }

        if (tasks.length > 1) {
            console.log(tasks[0]);
            for (let index = 1; index < tasks.length; index++) {
                console.log(`${index}. ${tasks[index]}`);
            }
        } else {
            console.log('The to-do list is empty.');
        }
    } catch (error) {
        console.error('An error occurred while reading the todo.txt file:', error.message);
    }
}

function showDoneList(){
    try {
        const data = fs.readFileSync('done.txt', 'utf-8');
        const tasks = data.split('\n');

        if (tasks.length > 1) { // Check if there is more than one line (title + tasks)
            console.log(tasks[0]); // Display the title without an index
            for (let index = 1; index < tasks.length; index++) {
                console.log(`${index}. ${tasks[index]}`);
            }
        } else {
            console.log('The done list is empty.');
        }
    } catch (error) {
        console.error('An error occurred while reading the done.txt file:', error.message);
    }
}

function main() {
    while (running){
        MenuFunction();

        const choice = readline.question('Choisissez une option: ');

        switch (choice) {
            case '1':
                showTodoList();
                break;
            case '2':
                showTodoList();
                const newTask = readline.question('Enter the new task: ');
                addTaskCommand(newTask);
                break;
            case '3':
                showTodoList();
                const delTask = readline.question('Enter the task you want to delete: ');
                deleteTask(delTask);
                break;
            case '4':
                showTodoList();
                const index_del = readline.question('Choose an item to mark as complete: ');
                MarkAsComplete(index_del);
                showDoneList();
                break;
            case '5':
                showDoneList();
                break;
            case '6':
                console.log('GoodBye');
                running = false ;
                break;
            default : //Case where the user gave the wrong input
                console.log('The input you entered is not valid. Please try again');
                main();
                break;
        }
    }
}

main();