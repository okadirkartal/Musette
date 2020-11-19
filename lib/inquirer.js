const inquirer = require("inquirer");
const minimist = require("minimist");
const files = require("./files");


module.exports = {
    askGitHubCredentials : () => {
        const questions = [
            {
                name:"username",
                type:"input",
                message:"Enter your Github username or e-mail address:",
                validate : function(value){
                    return value.length ? true : "Please enter your Github username or e-mail address";
                }
            },
            {
                name:"password",
                type:"password",
                message:"Enter your password:",
                validate : function(value){
                    return value.length ? true : "Please enter your password";
                }
            }, 
        ];
        return inquirer.prompt(questions);
    },
    askRepositoryDetails: ()=> {
        const argv = require("minimist")(process.argv.slice(2));
        const question = [
            {
                type:"input",
                name:"name",
                message:"Please enter a name for your repository:",
                default : argv._[0] || files.getCurrentDirectoryBase(),
                validate : function(value){
                    return value.length ? true : "Please enter a unique name for the repository";
                }
            },
            {
                type:"input",
                name:"description",
                default:  argv._[1] || null,
                message : "Now you can choose a description of the repository if you like(this is not a mandatory field)"
            },
            {
                type:"input",
                name:"visibility",
                message : "Would you like this repository to be set as public or private?:",
                choices : ["public","private"],
                default : "public"
            }
        ];
    },
    askIgnoreFiles : (fileList) => {
        const questions = [
            {
                type:"checkbox",
                name:"ignore",
                message:"Select the file and/or folders you wish to ignore:",
                choices:fileList,
                defauşt : ["node_modules"]
            }
        ];
        return inquirer.prompt(questions);
    }
}