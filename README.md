# My Personal Syllabus
My Personal Syllabus is a multi-page pinterest for saving learning resources. You can create your own personal syllabus of books, tutorials, articles, videos, and blogs. 

Sign up and you will be able to see the entire database of resources. Registered users can like, rate, and comment on any existing resource. 

## Getting Started

1. Clone this repository
2. Install all dependencies using `npm install i` 
3. Edit the .env file and put in your own secret keys `KEY1 = <secretkey>` `KEY2 = <secret key>`
4. Install psql and `create database midterm`
5. Migrate the latest database version to create the tables using `knex migrate:latest`
6. To seed some sample data, run the command `knex seed:run`
7. Start the web server using `npm run local`. The app will be served at <http://localhost:8080/>
8. Go to <http://localhost:8080/>

## Final Product
All Resources:
!["Screenshot of All Resources"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/all-resources.png)
Landing Page:
!["Screenshot of Landing Page"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/landing-page.png)
Filtering Resources:
!["Screenshot of Filtering Resources"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/filter-resource.png)
My Resources:
!["Screenshot of My Resources"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/my-resources.png)
Update Profile:
!["Screenshot of Update Profile"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/update-profile.png)
Add New Resource:
!["Screenshot of Add New Resource"](https://github.com/mandysGit/LHL-midterm/blob/master/docs/add-new-resource.png)

## Dependencies

  - autosize: 4.0.0 or above
  - bcrypt: 1.0.3 or above
  - body-parser: 1.15.2 or above
  - cookie-session: 2.0.0-beta.3 or above
  - dotenv: 2.0.0 or above
  - ejs: 2.4.1 or above
  - express: 4.13.4 or above
  - knex: 0.11.7 or above
  - knex-logger: 0.1.0 or above
  - method-override: 2.3.10 or above
  - morgan: 1.7.0 or above
  - node-sass-middleware: 0.9.8 or above
  - pg: 6.0.2 or above
  - webshot: 0.18.0 or above
