# API Documentation

## /user/register

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The email address of the user. Must be a valid email address.
- `fullname` (object):
  - `firstname` (string): The first name of the user. Must be at least 2 characters long.
  - `lastname` (string): The last name of the user.
- `password` (string): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### Response

#### Success (201 Created)
If the user is successfully registered, the response will be a JSON object containing the user details and an authentication token.

Example:
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  },
  "token": "auth_token"
}
```

#### Error (400 Bad Request)
If there are validation errors in the request body, the response will be a JSON object containing the errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Enter a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## /user/login

### Description
This endpoint is used to log in an existing user.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The email address of the user. Must be a valid email address.
- `password` (string): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)
If the user is successfully logged in, the response will be a JSON object containing the user details and an authentication token.

Example:
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  },
  "token": "auth_token"
}
```

#### Error (400 Bad Request)
If there are validation errors in the request body, the response will be a JSON object containing the errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
If the email or password is incorrect, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Invalid email or password"
}
```

## /user/profile

### Description
This endpoint is used to get the profile of the authenticated user.

### Method
`GET`

### Headers
- `Authorization` (string): The authentication token of the user.

### Response

#### Success (200 OK)
If the user is successfully authenticated, the response will be a JSON object containing the user details.

Example:
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "user@example.com"
}
```

#### Error (401 Unauthorized)
If the user is not authenticated, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Unauthorized"
}
```

## /user/logout

### Description
This endpoint is used to log out the authenticated user.
Logs out the current user and blacklist the token provided in cookie or headers

### Method
`GET`

### Headers
- `Authorization` (string): The authentication token of the user.

### Response

#### Success (200 OK)
If the user is successfully logged out, the response will be a JSON object containing a success message.

Example:
```json
{
  "message": "User logged out successfully"
}
```

#### Error (401 Unauthorized)
If the user is not authenticated, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Unauthorized"
}
```

## /captain/register

### Description
This endpoint is used to register a new captain.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The email address of the captain. Must be a valid email address.
- `fullname` (object):
  - `firstname` (string): The first name of the captain. Must be at least 2 characters long.
  - `lastname` (string): The last name of the captain.
- `password` (string): The password for the captain. Must be at least 6 characters long.
- `vehicle` (object):
  - `color` (string): The color of the vehicle. Must be at least 1 character long.
  - `plate` (string): The plate number of the vehicle. Must be at least 3 characters long.
  - `capacity` (number): The capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string): The type of the vehicle. Must be one of `car`, `motorcycle`, or `auto`.

Example:
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success (201 Created)
If the captain is successfully registered, the response will be a JSON object containing the captain details and an authentication token.

Example:
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "auth_token"
}
```

#### Error (400 Bad Request)
If there are validation errors in the request body, the response will be a JSON object containing the errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Enter a valid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 1 character long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## /captain/login

### Description
This endpoint is used to log in an existing captain.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The email address of the captain. Must be a valid email address.
- `password` (string): The password for the captain. Must be at least 6 characters long.

Example:
```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)
If the captain is successfully logged in, the response will be a JSON object containing the captain details and an authentication token.

Example:
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "auth_token"
}
```

#### Error (400 Bad Request)
If there are validation errors in the request body, the response will be a JSON object containing the errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
If the email or password is incorrect, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Invalid email or password"
}
```

## /captain/profile

### Description
This endpoint is used to get the profile of the authenticated captain.

### Method
`GET`

### Headers
- `Authorization` (string): The authentication token of the captain.

### Response

#### Success (200 OK)
If the captain is successfully authenticated, the response will be a JSON object containing the captain details.

Example:
```json
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Error (401 Unauthorized)
If the captain is not authenticated, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Unauthorized"
}
```

## /captain/logout

### Description
This endpoint is used to log out the authenticated captain.
Logs out the current captain and blacklist the token provided in cookie or headers

### Method
`GET`

### Headers
- `Authorization` (string): The authentication token of the captain.

### Response

#### Success (200 OK)
If the captain is successfully logged out, the response will be a JSON object containing a success message.

Example:
```json
{
  "message": "Captain logged out successfully"
}
```

#### Error (401 Unauthorized)
If the captain is not authenticated, the response will be a JSON object containing an error message.

Example:
```json
{
  "error": "Unauthorized"
}
```
