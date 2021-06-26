#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

const createNewproject = (name)=>{
  // getting the project's type
  inquirer
  .prompt([
    {
      type: "list",
      message: "👉 Project's type: ",
      name: "projectType",
      choices: ["HTML", "HTML + CSS", "HTML + CSS + JS"]
    }
  ])
  .then(({ projectType }) => {
    switch (projectType) {
      case "HTML":
        htmlOnly(name)        
        break;
      case "HTML + CSS":
        htmlCss(name)        
        break;
      case "HTML + CSS + JS":
        htmlCssJs(name)        
        break;
    
      default:
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

const makeDir = (name) => {
  fs.mkdir(path.join(__dirname, name), err=>{
    if (err) {
      console.log("❌❌" + err);
    }
  })
}
const htmlOnly = (name)=>{
  // using the project name to generate html file
  let htmlContent = fs.readFileSync("boilerPlate/index.html", "utf8")
  fs.writeFileSync(name+"/index.html", htmlContent)
  
}
const htmlCss = (name)=>{
  let htmlContent = fs.readFileSync("boilerPlate/index.html", "utf8")
  fs.writeFileSync(name+"/index.html", htmlContent)
  let cssContent = fs.readFileSync("boilerPlate/index.css", "utf8")
  fs.writeFileSync(name+"/index.css", cssContent)
}
const htmlCssJs = (name)=>{
  let htmlContent = fs.readFileSync("boilerPlate/index.html", "utf8")
  fs.writeFileSync(name+"/index.html", htmlContent)
  let cssContent = fs.readFileSync("boilerPlate/index.css", "utf8")
  fs.writeFileSync(name+"/index.css", cssContent)
  let jsContent = fs.readFileSync("boilerPlate/index.js", "utf8")
  fs.writeFileSync(name+"/index.js", jsContent)  
}

inquirer
// getting the project's name
  .prompt([
    {
      type: "input",
      message: "👉 Project's name: ",
      name: "projectName",
      default: "newProject"
    }
  ])
  .then(({ projectName }) => {
    // creating directory
    makeDir(projectName)
    createNewproject(projectName)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });