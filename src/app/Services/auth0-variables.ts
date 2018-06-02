interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'KlmOcONNVmnRk8dgo6HHXMBcvRFkcOD5',
    domain: 'cloudproject.eu.auth0.com',
    callbackURL: 'http://localhost:4200/home'
  };
  