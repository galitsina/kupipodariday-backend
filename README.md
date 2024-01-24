# KupiPodariDay (Wishlist API)

This project involves the development of an API for a wishlist service. In this system, each registered user has the ability to share their desired gifts and contribute towards a gift for another user, specifying the amount they are willing to spend.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: Database management system for storing and retrieving data.
- **Class Validator and Class Transformer**: Libraries for validation and transformation of objects.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **@nestjs/typeorm and pg**: Modules for database interaction in Nest.js with PostgreSQL.
- **Passport.js and Authentication Strategies**: Passport.js for authentication, with strategies such as passport-jwt, passport-local, and necessary type packages (@types/passport-jwt, @types/passport-local).
- **bcrypt**: Module for hashing user passwords, with associated type definitions (@types/bcrypt).

## Getting Started

To set up and run the project locally, follow these steps:

1. Install Node.js and PostgreSQL on your machine.
2. Clone this repository.
3. Install project dependencies using `npm install`.
4. Configure the PostgreSQL connection in the project.
5. Run the application using `npm start`.

## API Endpoints

### Users

- **GET /users/me**
  - Retrieve the profile of the authenticated user.

- **PATCH /users/me**
  - Update the profile information of the authenticated user.

- **GET /users/me/wishes**
  - Retrieve the wishlist of the authenticated user.

- **GET /users/{username}**
  - Retrieve the profile information of a user by their username.

- **GET /users/{username}/wishes**
  - Retrieve the wishlist of a user by their username.

- **POST /users/find**
  - Search for users based on certain criteria.

### Wishes

- **POST /wishes**
  - Create a new wish.

- **GET /wishes/last**
  - Retrieve the last added wishes.

- **GET /wishes/top**
  - Retrieve the top-rated wishes.

- **GET /wishes/{id}**
  - Retrieve a specific wish by its ID.

- **PATCH /wishes/{id}**
  - Update a specific wish by its ID.

- **DELETE /wishes/{id}**
  - Delete a specific wish by its ID.

- **POST /wishes/{id}/copy**
  - Create a copy of a specific wish.

### Offers

- **POST /offers**
  - Create a new offer.

- **GET /offers**
  - Retrieve all offers.

- **GET /offers/{id}**
  - Retrieve a specific offer by its ID.

### Wishlist Lists

- **GET /wishlistlists**
  - Retrieve all wishlist lists.

- **POST /wishlistlists**
  - Create a new wishlist list.

- **GET /wishlistlists/{id}**
  - Retrieve a specific wishlist list by its ID.

- **PATCH /wishlistlists/{id}**
  - Update a specific wishlist list by its ID.

- **DELETE /wishlistlists/{id}**
  - Delete a specific wishlist list by its ID.

## Authentication

- **POST /auth/signin**
  - Sign in a user.

- **POST /auth/signup**
  - Sign up a new user.


## Frontend Repository

Find the frontend code for this project on GitHub:

[Project Frontend Repository](https://github.com/yandex-praktikum/kupipodariday-frontend)
