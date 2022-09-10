
# iRecharge - Coding exercise

## Overview

### The objective of this test is to help us ascertain the following;
- Your understanding of what a RESTful API is.
- To know how well you understand relationships in SQL.
- Your ability to write clean and well-documented code. This may include the use of
docblocks, how you name your variables and methods, how you separate concerns, etc.
- The use of an API client (like Postman) for interacting and documenting your API.
- Your ability to use a version control system like Git.
- Your ability to interact and integrate third-party APIs.
What you are expected to do
Before you proceed, kindly note that you are not expected to use any form of authentication or
authorization. Therefore, one is not likely to sign up or log in to access your API.
1. You are expected to create the following endpoints;
a. An endpoint to create a customer.
b. An endpoint to charge a customer’s card and pass the card details to
Flutterwave for processing (note you are to use your Flutterwave’s test keys)
c. An endpoint to fetch a single customer and all the payments made by the
customer.
d. An endpoint to fetch all the customers.

e. An endpoint to fetch all the payments related to a customer using the
customer’s ID.

2. Write an integration test using any Javascript test tool to test the following;
a. The creation of a new customer
b. Charging of a customer’s card
3. Document your endpoints on Postman and share a link to the documentation.
4. Outline step-by-step instructions on setting up the take-home on a development
environment in your README.md file.

## Documentation link
    https://documenter.getpostman.com/view/17053588/VVdnVgv7

## Run Locally

Clone the project

```
  git clone https://github.com/Temidayomichael/irecharge-exercise
```

Go to the project directory

```
  cd irecharge-exercise
```
install all dependencies

```
  npm i
```
run project locally

```
  npm run migrate:dev
```
```
  npm run start:dev
```

Run tests with

```
  npm run test
```

## Enviroment variables
```
DATABASE_URL

APP_URL

JWT_SECRET
REFRESH_TOKEN_SECRET

NODE_ENV='dev'

FLUTTERWAVE_PUBLICKEY
FLUTTERWAVE_SECRETKEY
FLUTTERWAVE_ENCRYPTIONKEY
```