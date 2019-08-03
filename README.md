# This is a stater project for Angular6_PHP_MySQL


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Install dependicies
Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Install bootstrap
https://stackoverflow.com/questions/43557321/angular-4-how-to-include-bootstrap

## Fix bootstrap include error
https://stackoverflow.com/questions/45683192/angular-4-bootstrap-4-not-rendering-properly


## When deploy it, need add the code below to app.module.ts to switch to product mode

import {enableProdMode} from '@angular/core';
enableProdMode();




## Technologies

   Angular6, PHP, MySQL



## Commands to deploy angular app to server
   1. ng build --prod --build-optimizer
   2. after step 1, a dist folder will be generated, upload all files in dist folder to S3, make sure index.php is in the root directory.
   3. change the execution right of index.html to executable and change the base tag to point to the directory you want it to be the root of your website.


## Issues
   1. Caches issue solved after using post method instead of get method
   2. URL routing issue solved by adding { useHash: true } in app-routing.noudle.ts:

   @NgModule({
     imports: [ RouterModule.forRoot(routes, { useHash: true }) ], // "useHash: true" solves URL routing issue on http serve
     exports: [ RouterModule ]
   })
