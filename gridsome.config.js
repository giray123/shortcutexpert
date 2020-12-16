// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Shortcut Expert | All Shortcuts in One Place",
  siteDescription:
    "Best way to learn application shortcuts. You can create your own shortcuts and keyboard layouts for your application. Completely open source!",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/data/applications/*.json",
        typeName: "Applications",
        route: "/shortcuts/:slug",
      },
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "G-GS3SZNCFVB",
      },
    },
  ],
};
