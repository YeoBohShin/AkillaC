# AkillaC

Proposal for Orbital 23

<ins>Team Name</ins>

AkillaC

<ins>Proposed Level of Achievement</ins>

Project Gemini

<ins>Motivation</ins>

Searching up cheatsheets/exam papers usually end up with students on studuco studying through poorly documented past year papers, with answer sheets being another ordeal where students have to search thoroughly to find. Hence, a new NUS based system where students can upload cheatsheets, past year papers and answer sheets will alleviate this problem.

Each semester’s module classes will typically create a separate telegram group chat where students co learn and share knowledge with one another. However, this information typically does not get passed down to future generations of the same module, which will result in a lot of valuable information lost. Hence by consolidating the forum pages of each module, we will enable these information to be trickled down and benefit future students of the same module.

<ins>Aim</ins>

We hope to make a discussion forum and database which is friendly, easy to access and efficient.
We hope to make the platform have functions that can store past year materials for students to revise.

<ins>User Stories</ins>

Users can view past year exam papers and answers.

Users can answer questions posted by other users.

Users can ask questions about certain exam papers / concepts of the module.

Users can search for a module and view related modules.

Users can report troll answers.

Administrators can issue warnings and ban users who are reported by others.

<ins>Features and Timeline</ins>

A Web-based/Database for students to ask questions/browse past year papers for all modules in NUS.

Features to be completed by the mid of June:

1. Database to store past year materials
    This will allow the web application to easily be able to access the files and for users to download/upload files

2. Login Page
    Allow users to login to their account and be able to set profile picture, name and course details

3. Search Screen
    Allow users to view all the available courses and to be able to search for courses through the text box

4. Home Page
    Allow users to access all the features of the web application, and also view relevant information to them


Features to be completed by the mid of July:

1. Gamification system
   Reward users with points for good questions and answers

2. Achievement system
   Give users some form of recognition
3. Providing recommendations with machine learning

4. Feedback system for users to sound out on how to improve the forum

5. Reporting system to alert administrators about possible disruptors on the forum

6. Web-based forum
   Allow users to ask, answer, vote and comment on questions
   Display all questions, answers and comments

Tech Stack

1. HTML/CSS/Javascript/React
2. Python/Flask/Firebase

Development plan

3rd week of May: Finalized pitch for Orbital Lift-off, Pick up necessary technologies - HTML, CSS, Javascript, Python, SQL

4th week of May: Created Mockup, and Proof of concept

Set-up instruction

BACKEND
install python online

pip install firebase-admin
pip install flask
pip install CORS

Alternatively, you could cd into BACKEND folder and run source venv/bin/activate 

FRONTEND
install node.js online
check using node -v and npm -v
npm install react
npm install concurrently --save-dev


To Start Web Application
run npm start in the root directory
