I dreamed to do an interesting app to store data about astronomical events, that we can see with naked eyes, like meteor showers, comets, solar and lunar eclipses, but unfortunately I didn't find an API with all the data I need. So< this App will contain the data about astronomical events I want to observe and at the end of the project it will send the API request to this API https://ssd-api.jpl.nasa.gov/doc/cad.html (for comets and asteroids) that will provide the info about the closest approach to Earth if the user will enter the right name for object for the period from now to 01/01/2100.
this request for comet Halley https://ssd-api.jpl.nasa.gov/cad.api?des=1P&date-min=2023-11-25&date-max=2100-01-01&dist-max=1

Another approach - to make API to store my coupons.

#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
