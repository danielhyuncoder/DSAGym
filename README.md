# DSAGym Introduction
This project was created using MongoDB Atlas and Express.js for the backend, along with Firebase auth, React.js, and Vanilla JS/CSS for the frontend code.
<h2>Requirements: </h2>
<ul>
  <li>React Router Dom</li>
  <li>Firebase</li>
  <li>Express.js</li>
  <li>Mongoose</li>
  <li>Cors</li>
  <li>Axios</li>
  <li>Dotenv</li>
</ul>
<br/>
<h2>Project Features: </h2>
<ul>
  <li>Admin CRUD operations (Both frontend and backend support).</li>
  <li>Own custom question rendering library (Allows for admins to create questions with unique visuals).</li>
</ul>
<br/>
<h2>Question creation documentation: </h2>
<ul>
  <li>%o(COLOR_TYPE)(BOLD_NOTBOLD) - Opens a "color box" where you can specify the color of the text within it, along with whether or not it is bold or not. COLOR_TYPE is required to be one character. So far the colors that are supported is Green(g), Purple(p), Red(r), Yellow(y), Black(b), White(w), Shadow(s). BOLD_NOTBOLD will either be "b" for bold and "f" for not bold. Example: %ogb (Opens a green bold color box) </li>
  <li>%co - Closes the closest color box.</li>
  <li>%b(COLOR_TYPE)(BOLD_NOTBOLD)(BACKGROUND_COLOR) - Opens a "filled up box" where you can specify the color of the text within it, the background color, along with whether or not it is bold or not. COLOR_TYPE and BACKGROUND_COLOR is required to be one character. So far the colors that are supported is Green(g), Purple(p), Red(r), Yellow(y), Black(b), White(w), Shadow(s). BOLD_NOTBOLD will either be "b" for bold and "f" for not bold. Example: %bwfs (Opens a shadow-color filled box with non-bold white text.) </li>
  <li>%cb - Closes the closest filled up box.</li>
</ul>
<br/>
<h2>Start:</h2>
<p>
  In order to start this project, you would first need to create a Mongodb cluster (Along with the connection uri) and a firebase project. Then in the .env file for server, where it says "MONGO_KEY", input the password of the uri string, and in "GLOT_KEY" input any Glot API key. The "API_KEY" environmental variable in the server can be anything of your choosing as long as it matches the "REACT_APP_KEY" of the .env file in the main directory. In "serviceKey.json" input your firebase admin serviceKey from your firebase project. In "firebase.js", replace the firebaseConfig with your firebase config provided to you by firebase.
</p>
<br/>

<h2>Demo/Preview: </h2>
<p>The demo/preview of this project can be found here: <a href="https://dsagym.vercel.app/">Project</a></p>
