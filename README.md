# NodeJS-RESTAPI-JWTAuth

RestAPI used as a backend in my Angular JWT app. It has user login/signup functionalities using MongoDB and JWT as authentication. If you wanna know how to implement refresh tokens and set headers for the response, checkout ./jwt-auth. JWT verification is used as a middleware and will only be activated if the user hits a protected resource. 

*In order to access to access the response headers with the new tokens in the client side you need to set Access-Control-Expose-Headers: '*' aswell
