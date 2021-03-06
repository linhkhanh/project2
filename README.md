# Social Network App Scope
- If you like to take photos, love something looks amazing, and want to share your images with other people, my application can satisfy you.
- In this application, you are able upload your images, see other wonderful images of all users. Beside that, you can interact with other users by leaving your comments on images or click love button on image.

## Table of Content
- [Project Demo](#Project-Demo)
- [Project Scope and Approach](#Project-Scope-and-Approach)
- [Technology utilized](#Technology-utilized)
- [Difficulties / Limitation](#Difficulties-/-Limitation)
- [User Stories and Wireframes](#User-Stories-and-Wireframes)
- [Extra Implementation](#Extra-Implementation)

## Project Demo
http://lico-project2-ga.herokuapp.com/lico/login <br />

## Project Scope and Approach
The scope of the project is creating an full CRUD app, user can create an account, log in to edit their profile, upload images, edit/delete their images. Also, they can be able to edit/delete their own comments.

## Database/Storage
* **MongoDB** is a document-oriented NoSQL database used for high volume data storage
* **Cloudinary** is a cloud service that offers a solution to a web application's entire image management pipeline.

## Technologies
* **EJS** is used to generate HTML with plain javascript to append to frontend.
* **Method-override** is used to to convert HTTP verbs such as PUT or DELETE in places where the client doesn't support it
* **shortid** is used to create amazingly short non-sequential url-friendly unique ids
* **Bcrypt** is used to hash and store passwords in database
* **Express-session** is used to store the user state with each given being assiged a unique session. 
* **MomentJS** is used as a wrapper to handle Date object
* **Multer** is used to handle multipart/form-data for images uploading 
* **Bootstrap Material Design** is used for CSS framework for HTML and CSS design templates

## Objective
The objective of the project is to build a working full **CRUD** (Create, Read, Update and Delete) application using **Node.js**, **MongoDB**, **Express** and **EJS** that adheres to **MVC** (Models, Views, and Controllers) file structure.

## Approaches Taken
* Set up a basic MVC structure with basic CRUD routes.
* Set up database with collections and schema validation in the MongoDB
* Built authentication page
* Linked the app to heroku
* Modular testing on the upload file with cloudinary and multer. 
    > Initially this is not in the full code, after basic functional test completed, implement it to the routes.
* Follow the initial wireframe design and user stories
  > Started with show route for list of all users, then all images, comments, like images and lastly users.
## Accomplishments
* The application is meeting the mininum viable product (MVP)'s requirements.
* Every user is able to upload image, view other users, view all images, love/unlove image, add comment, delete comment/image, edit comment/image   .
* The image file can be uploaded through local file. 

## Difficulties faced
* I used user name to link to images, comments, so user can not able to change user name. 
* When user changes avata, user's avata in comments is still old avata not new one.
    >  If I user id of user instead of user name, I can allow user to change user name, and I can update user's new avata in comment box.



## Wireframe Design and User Stories
* ### Login and Signup Page
![Image of login page](public/images/login-page.png)
- On mobile
![Image of login page](public/images/login-page-mobile.png)
* ### List of users
![Image of list of all users](public/images/home-page.png)
- On mobile
![Image of home page](public/images/home-page-mobile.png)
* ### All Images
![Image of index page](public/images/index-page.png)
- On mobile
![Image of index page](public/images/index-page-mobile.png)
* ### User Profile Page
![Image of show page](public/images/show-page.png)
- On mobile
![Image of login page](public/images/show-page-mobile.png)
* ### Image Modal
![Image of image modal](public/images/modal-popup.png)
* ### Image page
![Image of image page](public/images/image-page.png)
- On mobile
![Image of login page](public/images/image-page-mobile.png)

## Extra Implementation
* Build a better notification so that, when user comments at an image, if other users also comment at this image, user will get a notification about that.
* Create a two layers comment, in that, user can reply a comment.

