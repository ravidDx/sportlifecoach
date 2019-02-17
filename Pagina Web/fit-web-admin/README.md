# WebAdmin
Admin for https://tsq.me. By this webapp, you can manage all your media assets easily.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## Files

```javascript
web-admin
    |-- src
        |-- app
            |-- auth 
                |-- auth.css                        # css style for all auth component
                |-- forgotpassword.component.*      # component for forgotpassword 
                |-- resetpassword.component.*       # component for resetpassword
                |-- signin.component.*              # component for signin 
                |-- signup.component.*              # component for signup 
            |-- dashboard   
                |-- amount.component.*              # component for media amount
                |-- dashboard.component.*           # component for dashboard
                |-- modelEditor.component.*         # component for assets edit
                |-- modelTable.component.*          # component for assets list
                |-- user.component.*                # component for user
            |-- guard
                |-- auth.guard.ts                   # protect all dashboard component
            |-- pipe    
                |-- filter.ts                       # pipe for filter table list
                |-- truncate.ts                     # pipe for truncate string
            |-- service
                |-- base64.service.ts               # tool for base64 password
                |-- model.repository.ts             # repo service for all model
                |-- rest.datasource.ts              # http service
            |-- app.component.ts                    # entry component
            |-- app.module.ts                       # bootstrap module
            |-- app-routing.module.ts               # router config
        |-- assets
        |-- environments
        |-- favicon.ico
        |-- index.html
        |-- main.ts
        |-- polyfills.ts 
        |-- styles.css 
        |-- tsconfig.json 
    |-- .angular-cli.json
    |-- .editorconfig
    |-- .gitignore
    |-- gulpfile.js                                 # add autofixer and replace assets prefixer to cdn link
    |-- package.json
    |-- README.md
    |-- tslint.json
```

## NPM scripts

```shell
npm start               # for dev
npm run build           # for production
```
