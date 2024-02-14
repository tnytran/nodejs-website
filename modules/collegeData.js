const { Sign } = require('node:crypto');
const fs = require('node:fs');


//Create a constructor class:
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}


function initialize() {
'This function will read the contents of the json files and assign them to the variable dataCollection.'

    return new Promise(
        function(resolve, reject){

            //Read the contents of the "./data/students.json" file:
            // fs.readFile('./data/students.json', 'utf8', (err1, data1) => {
            fs.readFile('W:/Courses/8. WEB700/Week 4/assignment3/web700-app/data/students.json', 'utf8', (err1, data1) => {
                if (err1) {
                    reject(`Error: ${err1}`);
                    return;
                }

                // Convert the JSON from the file into an array of objects:
                let studentDataFromFile = JSON.parse(data1); 

                //Continue to read the contents of the "./data/courses.json" file:
                fs.readFile('W:/Courses/8. WEB700/Week 4/assignment3/web700-app/data/courses.json', 'utf8', (err2, data2) => {
                    if (err2) {
                        reject(`Error: ${err2}`);
                        return;
                    }

                    // Convert the JSON from the file into an array of objects:
                    let courseDataFromFile = JSON.parse(data2); 

                    //Declare a variable that holds an instance of the "Data" class once its created:
                    var dataCollection = new Data(studentDataFromFile, courseDataFromFile);

                    //Invoke the resolve method for the promise to communicate back to a2.js that the operation was a success:
                    resolve(dataCollection);
                });
            });
        }
    )
}


function getAllStudents(dataCollection){
'This function will provide the full array of "student" objects using the resolve method of the returned promise.'

    return new Promise(
        function(resolve, reject){
            //If the array of students is 0, display error message. Else return the full array of students:
            if(dataCollection.students.length == 0){
                reject("Error: No results returned");
            } else {
                resolve(dataCollection.students)
            }
        }
    )
}


function getTAs(dataCollection){
'This function will provide an array of "student" objects whose TA property is true using the resolve method of the returned promise.'

    return new Promise(
        function(resolve, reject){
            const needTA = [];

            //Add any student with TA property is true to the needTA list above:
            for (const student of dataCollection.students) {
                if(student.TA == true){
                    needTA.push(student);
                }
            }
            
            //If there is no student needed TA:
            if(needTA.length == 0){
                reject("No results returned");
            } else {
                resolve(needTA);
            }
        }
    )
}


function getCourses(dataCollection){
'This function will provide the full array of "course" objects using the resolve method of the returned promise.'

    return new Promise(
        function(resolve, reject){
            //If the array of courses is 0, display error message. Else return the full array of courses:
            if(dataCollection.courses.length == 0){
                reject("Error: No results returned");
            } else {
                resolve(dataCollection.courses)
            }
        }
    )
}


function getStudentsByCourse(dataCollection,course){
'This function will provide an array of "student" objects whose course property matches the input using the resolve method of the returned promise. If the course does not exist, display error message.'
    return new Promise(
        function(resolve, reject){

            //Check if the course exists in the dataCollection. This is to cover for the case where the course does not exist:
            let foundCourse = false;
            for (const singleCourse of dataCollection.courses) {
                if(singleCourse.courseId == course){
                    foundCourse = true;
                    break;
                }
            }

            //If the course exists, find the students who are taking the course:
            if (foundCourse){
                matchedCourses = [];
                for (const student of dataCollection.students) {
                    if(student.course == course){
                        matchedCourses.push(student.studentNum);
                    }
                };

                //If the array of students is 0, display error message. Else return the matched array of students:
                if(matchedCourses.length == 0){
                    reject("Error: No student studied this course.");
                } else {
                    resolve(matchedCourses)
                }
            } 

            //If the course does not exist, display error message:
            else {
                reject("Error: No results returned.");
            }
        }
    )
}


function getStudentByNum(dataCollection,num){
'This function will provide the "student" object whose student number matches the input using the resolve method of the returned promise. If the student number does not exist, display error message.'
    return new Promise(
        function(resolve, reject){
            //Find the student with the student number matching the input:
            for (const singleStudent of dataCollection.students) {
                if(singleStudent.studentNum == num){
                    resolve(singleStudent);
                }
            }
            reject("Error: No results returned");
        }
    )
}

//Export the following functions so that they can be called in a2.js:
module.exports = { initialize, getAllStudents, getTAs, getCourses, getStudentsByCourse, getStudentByNum };