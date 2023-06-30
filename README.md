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

<ins>Must-have Features</ins>

1. Database to store past year materials: This will allow the web application to easily be able to access the files and for users to download/upload files (Done)
2. Login Page: Authentication allowing users to login to their account and be able to set profile picture, name and course details (Done)
3. Search Screen: Allow users to view all the available courses and to be able to search for courses through the text box (Done)
4. Upload Screen: Allow users to share and upload past year papers that are not on the web yet easing the process of finding a paper (Done)
5. Home Page Allow users to access all the features of the web application, and also view relevant information to them (Left newsfeed not finished)

<ins>Good to have Features</ins>

1. Web-based forum Allow users to ask, answer, vote and comment on questions. Display all questions, answers and comments
2. List of courses that users can favourite so that they can quick search to those courses (Done)
3. Newsfeed to notify if someone replied/liked/disliked a question or answer
4. Feedback system to allow users to voice any opinions to improve the web application

<ins>Tech Stack<ins>

1. HTML/CSS/Javascript/React
2. Python/Flask/Firebase

<ins>Software Engineering</ins>

1. Dynamic Routing when uploaded new paper
2. Reusable components

<ins>Development plan</ins>

3rd week of May: Finalised pitch for Orbital Lift-off, Pick up necessary technologies - HTML, CSS, Javascript, Python, SQL
4th week of May: Created Mockup, and Proof of concept
1st week of June: Create navigation to specific past year papers
2nd week of June: Create Profile for each user
3rd week of June: Run some testing and implement forum component

<ins>Set-up instruction</ins>

<ins>BACKEND</ins>
BACKEND:
install python online
pip install firebase-admin flask CORS flask_cors
(<b>FOR WINDOWS USER</b>)
If you ran npm start and error message stating that python not found, type python in command prompt and download python off the microsoft store
When installing these modules, if there is a prompt to add a certain file path to environment variable, please add if not you cannot run our web application

1. Search environment variables in search bar
2. Click on environment variables (bottom right)
3. Double click on PATH
4. Add the file path that the terminal prompt to add

FRONTEND:
install node.js online
check using node -v and npm -v
npm install create-react-app
npm install concurrently --save-dev
To Start Web Application run npm start in the root directory
