<p align="center"><img src="img/social_banner.jpg"></p>
<h1 align="center">Shortcut Expert</h1>
<p align="center">Shortcut Expert is a platform for all application shortcuts.</p>
<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/giray123/shortcutexpert?style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/count/giray123/shortcutexpert?style=for-the-badge" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/giray123/shortcutexpert?style=for-the-badge">
  <a href="https://github.com/giray123/shortcutexpert/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/giray123/shortcutexpert?style=for-the-badge"></a>
<a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fgiray123%2Fshortcutexpert"><img alt="Twitter" src="https://img.shields.io/twitter/url?logo=twitter&style=for-the-badge&url=https%3A%2F%2Fgithub.com%2Fgiray123%2Fshortcutexpert"></a>
</p>

## Purpose

- :package:&nbsp; Gather all application shortcuts into a single platform
- :blush:&nbsp; Provide best user experience for shortcuts
- :necktie:&nbsp; Create universal shortcut standarts
- :globe_with_meridians:&nbsp; Make it super accessable worldwide

## Technologies

Shortcut Expert is build with [VueJS](https://vuejs.org/), [Gridsome](https://gridsome.org/) and [Vuetify](https://vuetifyjs.com/en/).

It is served with Netlify and it is statically generated, which means that every page is distrivuted through CDN and SEO friendly. Additionally, this makes the application blazing fast.

There is no database, once you fork it, you have all data necessary (including the application shortcuts) to run it locally.

## Contribution

You can fork the GitHub repo and create pull requests if you would like to add/update anything.

### Add a new application

All application data is in `src/data/applications`. Each `json` file represents an application. You need to prepare a `json` file for your application and create a pull request.

Preparing a `json` file for your application is pretty stratight forward.

#### Preferred Method (easy one)

First, create a Google Sheets file and prepare it as in [this example](https://docs.google.com/spreadsheets/u/2/d/1xGfSrETQto0kA-FGxeooDb08nuwHcO_THZ8H0DcyCQE/edit#gid=1240391001). You need to create a different sheet (tab) for each operating system and each tab needs to have below columns.

- group
- name
- shortcuts
- desciption

After you prepare your Google Sheets file, you can use our [Test Application](https://shortcutexpert.com/test-application) to test it out.

Once it is ready, use [Create Application](https://shortcutexpert.com/create-application) page to prepare a json file. Each required field is explained on the page.

Afterward, download your json file and create a pull request to add your application to `src/data/applications`. Once the pull request is merged, our server will generate a static page for the application and distribute it worldwide through Netlify CDN.

#### Manual Method

You can manually create `json` files. Just check out the examples in the `src/data/applications` folder.

### Update an existing application

Again, there are the manual and the preffered method.

#### Preferred Method (easy one)

Each application has a Google Sheet URL in its json file (additionally there is a link on each application page). Once you go to the URL, you can not edit that file since you do not have permissions. However, you can copy that Google Sheet to your own drive. After you copy, make the necessary updates and make sure that you publish your Google Sheet. Once you publish it, click the share button and make your file accessable for anyone on the web.

Again, you can use [Create Application](https://shortcutexpert.com/create-application) page to prepare a json file and create a pull request for your updates.

#### Manual Method

Just find the application `json` file in `src/data/applications` and create a pull request after your edit.

### Add a keyboard layout

Coming soon...

### Donate

Coming soon...
