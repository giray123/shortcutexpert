// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = function(api) {
  api.chainWebpack((config, { isServer }) => {
    config.plugin("vuetify-loader").use(VuetifyLoaderPlugin);
  });
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  //   const applications = require('./src/data/application.json')
  //   const appCollection = addCollection({ typeName: "Applications" })
  //   applications.forEach(app=>{
  //     appCollection.addNode(app)
  //   })
  // });
  // api.createPages(async ({ graphql, createPage }) => {
  //   const { data } = await graphql(`
  //     {
  //       allApplications {
  //         edges {
  //           node {
  //             appname
  //           }
  //         }
  //       }
  //     }
  //   `);
  //   // for each content found create a page
  //   data.allApplications.edges.forEach(({ node }) => {
  //     createPage({
  //       path: `/shortcuts/${node.appname}`,
  //       component: "./src/templates/Application.vue",
  //       context: {
  //         appname: node.appname,
  //       },
  //     });
  //   });
  // });
};
