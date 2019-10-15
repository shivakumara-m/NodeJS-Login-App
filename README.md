# NodeJS Login App

Demo Express-Node app with api to create login flow. Login can be done via pre created username/password combination or via mobile number and OTP.
The nodejs server in one docker container communicates to  postgres server running in another docker container.
The postgres db is prepopulated with a user email "shiva@us.com" and password "shiva123" for testing 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine 
### Prerequisites

This app is created run in a docker environment. Hence you need install docker on the machine where you want to run this app. 
```
Download and install docker from [Docker]https://www.docker.com/
```

### Installing

Clone the repo to your directory and then compose the node app first as follows
In the directory where this project is cloned run below command as it is, to build a docker image for nodejs app
```
 docker build -t "nodejs-login-app" .
```

And then run

```
docker-compose up

```

Now access port 3006 of your localhost to see the nodejs app running
```
http://localhost:3006
```
