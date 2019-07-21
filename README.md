# capstoneProject

# TechDegree Project 12

### Recipes v.1.0.0
Simple Recipe Web Application that let you search and saved recipes.


# How to use
clone repo from github
```javascript
 git clone https://github.com/getJSEG/capstone-project.git
```
## back-end
install back-end dependencies
```javascript
  npm install
```

create a env. file with the fallowing variable and replace with valid with valid key's
```javascript
 GOOGLE_CLIENT_ID = "Replace with CLIENT_ID";
 GOOGLE_CLIENT_SECRETE = "Replace with CLIENT_SECRETE";

 FACEBOOK_CLIENT_ID = "Replace with CLIENT_ID";
 FACEBOOK_CLIENT_SECRETE = "Replace with CLIENT_SECRETE";
```
## front-end
install front-end dependencies
```javascript
 npm install-client
```
create a config.js file in the src directory of the front end
```javascript
 const YOUTUBE_API_KEY = "Repalce with YOUTUBE_API_KEY";
 export default YOUTUBE_API_KEY;
```
## Seed-mongodb
```
mongoimport --db recipe-test --collection recipes --file <filePath>/recipes.json --jsonarray
```

## In the client add a new file Name config.js
```
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE API_KEY';
export default YOUTUBE_API_KEY;
```
