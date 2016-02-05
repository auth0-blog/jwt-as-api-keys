# Use JWT as API keys sample

This is a sample that shows how you can use JWTs as API Keys. You can read more about this in [this amazing article](https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/).

## Explanation of this example

I want to be able to call the API of MyApp.com. For that, first I must login to MyApp.com with my user credentials. Once I'm logged in, I can then create the API Key to MyApp.com which I can then use to call its API.

## Endpoints

### POST `/login`

You must send the `username` as the payload when calling this method. This will Login that user and return a Token for that user authenticated.

### POST `/create-api-token`

You can create a new API token by calling this endpoint. In order to call it, the user must be first logged in. You can login by calling the `/login` endpoint and then sending the created JWT in the `Authorization` header when calling this endpoint. It'll return a JWT which is the API token with the requested scopes (By default this are 2 now)

### POST `/api/follow`

This endpoint mimis calling the Follow action. In order to call this endpoint, you need an API token that contains the `follow` scope.

### GET `/api/user/names`

This endpoint mimis calling the get user names action. In order to call this endpoint, you need an API token that contains the `read_users` and `read_names` scopes.

## Running it

Just download, `npm i` and then `node start.js` :boom:.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
