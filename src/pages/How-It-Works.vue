<template>
  <Layout toolbar>
    <v-container fluid class="pa-0">
      <v-row no-gutters :style="{ 'min-height': '100vh' }">
        <v-col
          cols="12"
          md="8"
          offset-md="2"
          lg="6"
          offset-lg="3"
          xl="4"
          offset-xl="4"
          class="pa-3"
        >
          <div class="mt-10">
            <h1 class="text-xs-h4 text-sm-h3 text-center mb-10 text-center">
              How It Works?
            </h1>

            <p>Shortcut Expert is a platform for all application shortcuts.</p>

            <div>
              <h2>Purpose</h2>

              <ul>
                <li>Gather all application shortcuts into a single platform</li>
                <li>Provide best user experience for application shortcuts</li>
                <li>Create universal shortcut standarts</li>
                <li>Make it super accessable worldwide</li>
              </ul>

              <h2>General Flow</h2>

              <p>
                All application data is in <code>src/data/applications</code>.
                Each file has everything necessary for a specific application.
                Although JSON files can be manually created / edited, there is
                an easier way, which is preferred and more error-free. You can
                prepare JSON files using Google Sheets! Shortcut Expert can
                fetch data from your Google Sheets file to prepare the
                application data.
              </p>

              <h2>Google Sheet Files</h2>

              <p>
                You need to follow some standarts as you prepare your Google
                Sheets file.
              </p>

              <h3>Sheets (Tabs)</h3>
              <p>
                You need to create a different sheet (tab) for each operating
                system. Available options are: <code>macos</code> and
                <code>windows</code> for now. More will come in the future.
              </p>

              <h3>Tables</h3>
              <p>
                Each sheet (tab) needs to have 4 columns as the below example.
                You can also check this
                <a
                  href="https://docs.google.com/spreadsheets/d/1xGfSrETQto0kA-FGxeooDb08nuwHcO_THZ8H0DcyCQE/edit#gid=1240391001"
                  target="_blank"
                  >example Google Sheets file
                </a>
              </p>

              <v-simple-table class="my-10">
                <thead>
                  <tr>
                    <th>group</th>
                    <th>name</th>
                    <th>shortcuts</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>editing</td>
                    <td>copy</td>
                    <td>ctrl + c</td>
                    <td>copy text for later use</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </v-simple-table>

              <p>Note that column names are case insensitive.</p>

              <p>Column Descriptions:</p>
              <ul>
                <li><strong>group:</strong> we use to group the shortcuts</li>
                <li><strong>name:</strong> short name for the shortcut</li>
                <li>
                  <strong>shortcuts:</strong> Special text to represent timely
                  shortcuts. More info below
                </li>
                <li>
                  <strong>description:</strong> details / descriptions for the
                  shortcut
                </li>
              </ul>

              <h3>Shortcuts</h3>

              <p>Shortcuts has a special syntax. Below is a complex example:</p>

              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/shortcuts.png"
              ></g-image>

              <p>
                Special Operators (you need to type the symbol not the text):
              </p>

              <v-simple-table class="my-10">
                <thead>
                  <tr>
                    <th>Operator</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Plus (+)</td>
                    <td>Press Together</td>
                  </tr>
                  <tr>
                    <td>Dash (-)</td>
                    <td>Press after a delay</td>
                  </tr>
                  <tr>
                    <td>Vertical Line (|)</td>
                    <td>Release and press after a delay</td>
                  </tr>
                </tbody>
              </v-simple-table>

              <p>Other things to consider for Shortcuts cells:</p>
              <ul>
                <li>
                  <b>Capitalization</b> matters: `a` and `A` will be displayed
                  differently on Shortcut Expert. Test them out.
                </li>
                <li><b>Spaces</b> are not important</li>
                <li>
                  You can add multiple <b>shortcuts</b> for a line, just use a
                  new line for each. You can add a new line to any cell by
                  `option + enter` in Google Sheets
                </li>
                <li>
                  You can add a <b>tooltip</b> to any shortcut by adding a text
                  between paranthesis at the end of each line.
                </li>
              </ul>

              <h3>Access</h3>

              <p>
                In order for Shortcut Expert to fetch data from your Google
                Sheets file you need to make your file
                <strong>published to the web</strong> and
                <strong>public</strong>. Other users will be able to see your
                table and copy it if they want to make an edit. Here are the
                steps to make a file <strong>published</strong> and
                <strong>public</strong>:
              </p>

              <p>Click on <em>File > Publish to the web</em></p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/publish1.png"
              ></g-image>

              <p>Click on <em>Publish</em> (options are not important)</p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/publish2.png"
              ></g-image>

              <p>
                Beware that once published the link on the same window is not
                the one we will use to fetch the data. So, you can close that
                window.
              </p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/publish3.png"
              ></g-image>

              <p>Click on <em>Share</em> button.</p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/share1.png"
              ></g-image>

              <p>
                Make your file
                <em>Anyone on the internet with this link can view</em>. And
                click on <em>Copy link</em>. We will use this link to fetch data
                into Shortcut Expert.
              </p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/share2.png"
              ></g-image>

              <h2>Editing Existing Applications</h2>

              <p>
                When you click EDIT on any application page, you can find the
                latest Google Sheets file URL that was used to create that
                application. Once you go to that Google Sheets file, you can not
                edit that file since you do not own it. However, you can copy
                that Google Sheet to your own drive by
                <em>File > Make a copy</em>.
              </p>
              <g-image
                class="elevation-3 m-auto"
                src="@/assets/img/tutorial/make-a-copy.png"
              ></g-image>

              <p></p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
export default {
  name: "Favorites",
  metaInfo: {
    title: "Shortcut Expert | How It Works?",
    description:
      "Learn how Shortcut Expert works. You can create your own applications and contribute to the existing ones.",
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 10px;
}

h3 {
  color: rgb(90, 90, 90);
  margin-top: 30px;
  margin-bottom: 0px;
}
p {
  text-align: justify;
}
img {
  display: block;
  margin: 40px auto;
  max-width: 100%;
}
</style>
