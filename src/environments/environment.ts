// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  ApiUrl: "http://localhost:8080",
  API_AUTH: "http://arcasoftwares.com.br:8080/user-management",
  SOFTWARE_PUBLIC_KEY: "185a9998-c63e-4fb4-bc7b-27fddd2d0ffb",
  firebaseConfig: {
    apiKey: "AIzaSyDAU1K91a6tjARqUtncv5D0JBWO_iXbRI0",
    authDomain: "my-expenses-api.firebaseapp.com",
    databaseURL: "https://my-expenses-api-default-rtdb.firebaseio.com",
    projectId: "my-expenses-api",
    storageBucket: "my-expenses-api.appspot.com",
    messagingSenderId: "766379262212",
    appId: "1:766379262212:web:51db75c7ec00a0715b9051",
    measurementId: "G-8KPJFQ200Y",
  },
};
