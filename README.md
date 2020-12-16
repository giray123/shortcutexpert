<p align="center"><img src="static/img/share.png"></p>
<h1 align="center">Shortcut Expert</h1>
<p align="center">Shortcut Expert is a platform for all application shortcuts.</p>
<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/giray123/shortcutexpert?style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/count/giray123/shortcutexpert?style=for-the-badge" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/giray123/shortcutexpert?style=for-the-badge">
  <a href="https://github.com/giray123/shortcutexpert/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/giray123/shortcutexpert?style=for-the-badge"></a>
<a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fgiray123%2Fshortcutexpert"><img alt="Twitter" src="https://img.shields.io/twitter/url?logo=twitter&style=for-the-badge&url=https%3A%2F%2Fgithub.com%2Fgiray123%2Fshortcutexpert"></a>
</p>

## :heart:&nbsp; Purpose

- :package:&nbsp; Gather all application shortcuts into a single platform
- :blush:&nbsp; Provide best user experience for shortcuts
- :necktie:&nbsp; Create universal shortcut standarts
- :globe_with_meridians:&nbsp; Make it super accessable worldwide

## :hammer:&nbsp; Technologies

Shortcut Expert is build with <a href="https://vuejs.org/">VueJS</a>, <a href="https://gridsome.org/">Gridsome</a> and <a href="https://vuetifyjs.com/en/">Vuetify</a>.

It is served with Netlify and it is statically generated, which means that every page is distrivuted through CDN and SEO friendly. Additionally, this makes the application blazing fast.

There is no database, once you fork it, you have all the data necessary to run it locally(including the application shortcuts).

## :gift:&nbsp; Contribution

You can fork the GitHub repo and create pull requests for anything. However, below are some common contributions:

### Add a new application

All application data is in `src/data/applications`. Each `json` file represents an application. You need to prepare a `json` file for your application and create a pull request.

Preparing a `json` file for your application is pretty stratight forward. There are a manual and a preffered way to do that.

#### Preferred Method (easy one)

First, create a Google Sheets file and prepare it as in <a href="https://docs.google.com/spreadsheets/u/2/d/1xGfSrETQto0kA-FGxeooDb08nuwHcO_THZ8H0DcyCQE/edit#gid=1240391001">this example</a>. You need to create a different sheet (tab) for each operating system and each tab needs to have below columns.

| group   | name | shortcuts | desciption              |
| ------- | ---- | --------- | ----------------------- |
| editing | copy | ctrl + c  | copy text for later use |
| ...     | ...  | ...       | ...                     |

After you prepare your Google Sheets file, you can use our <a href="https://shortcutexpert.com/test-application">Test Application Page</a> to test it out.

Once it is ready, use <a href="https://shortcutexpert.com/create-application">Create Application Page</a> to prepare a json file. Details for each field is explained on the page.

Afterward, download your json file and create a pull request to add your application to `src/data/applications`. Once the pull request is merged, our server will generate a static page for the application and distribute it worldwide through Netlify CDN.

#### Manual Method

You can manually create `json` files. Just check out the examples in the `src/data/applications` folder.

### Update an existing application

Again, there are the manual and the preffered method.

#### Preferred Method (easy one)

Each application has a Google Sheet URL in its json file (additionally there is a link pointing to that file on each application page). Once you go to the URL, you can not edit that file since you do not have permissions. However, you can copy that Google Sheet to your own drive. After you copy, make the necessary updates and make sure that you publish your Google Sheet. Once you publish it, click the share button and make your file accessable for anyone on the web.

Again, you can use <a href="https://shortcutexpert.com/create-application">Create Application Page</a> to prepare a json file and create a pull request for your updates.

#### Manual Method

Just find the application `json` file in `src/data/applications` and create a pull request after your edit.

### Add a keyboard layout

Coming soon...

## :moneybag:&nbsp; Donate

Coming soon...

## :bookmark:&nbsp; License

You can contribute to this repo, however you can not use any variant for commercial purposes.
