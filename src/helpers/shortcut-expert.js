const { nanoid } = require("nanoid");

async function fetchGoogleSlide(url) {
  try {
    const google_sheet_url_pattern = new RegExp(
      "https:\\/\\/docs\\.google\\.com\\/spreadsheets\\/d\\/(.*)\\/.*"
    );
    const url_match = url.match(google_sheet_url_pattern);
    var google_sheet_id = url_match ? url_match[1] : null;

    const config_url = `https://spreadsheets.google.com/feeds/worksheets/${google_sheet_id}/public/basic?alt=json`;

    /**
     * GET CONFiG
     */
    const response1 = await fetch(config_url);
    const config = await response1.json();

    const filename = config.feed.title.$t;
    const sheets = config.feed.entry.map((v) => {
      const pattern = new RegExp("^.*\\/(.*)$"); // get the value after last slash
      const url_match = v.id.$t.match(pattern);
      const id = url_match ? url_match[1] : null;
      return {
        name: v.title.$t,
        id: id,
        url: `https://spreadsheets.google.com/feeds/cells/${google_sheet_id}/${id}/public/values?alt=json`,
      };
    });

    /**
     * GET DATA
     */
    // get all sheets
    const data_responses = await Promise.all(sheets.map((v) => fetch(v.url)));
    // convert all sheet into json
    const data_json = await Promise.all(data_responses.map((v) => v.json()));
    // prepare all sheets
    const data_tables = data_json.map((json) => {
      return json.feed.entry.map((v) => {
        return {
          row: parseInt(v.gs$cell.row),
          col: parseInt(v.gs$cell.col),
          text: v.gs$cell.$t.trim(),
          cell: v.title.$t,
        };
      });
    });

    sheets.forEach((v, i) => {
      v.table = prepareFetchedSheet(data_tables[i]);
    });

    return {
      google_sheet_id: google_sheet_id,
      google_sheet_url: url,
      filename: filename,
      ops: sheets,
    };
  } catch (e) {
    console.log(e, "error");
    return {
      statusCode: 400, // bad request
      body: {
        status: "error",
        message: e.message,
      },
    };
  }
}

function prepareFetchedSheet(raw) {
  const columns = raw
    .filter((v) => v.row == 1)
    .map((v) => v.text.toLowerCase());
  const rows = raw
    .filter((v) => v.row != 1)
    .reduce((acc, v) => {
      // console.log(v, "v");
      // console.log(acc, "acc");
      const item_exists = acc.find((k) => k.row == v.row);
      if (item_exists) {
        item_exists[columns[v.col - 1]] = v.text;
      } else {
        acc.push({
          row: v.row,
          id: nanoid(),
          [columns[v.col - 1]]: v.text,
        });
      }

      return acc;
    }, []);

  return {
    columns: columns,
    rows: rows,
  };
}

function parseShortcutCell(str) {
  var shortcuts = str.split("\n");
  return shortcuts.map((v) => parseShortcutLine(v));
}

function parseShortcutLine(str) {
  // extract description
  var response = {};
  const description_pattern = new RegExp("\\((.*)\\)");
  const match = description_pattern.exec(str);
  response.info = match ? match[1] : null;
  const without_desciption = match ? str.slice(0, match.index) : str;
  response.distinct_keys = without_desciption
    .replace(/\s/g, "")
    .split(/[\\+\\|-]/);
  response.strokes = parseShortcut(without_desciption);
  return response;
}

function parseShortcut(str) {
  // console.log(str, "input")
  // trim white spaces
  str = str.replace(/\s/g, "");
  // convert escaped special chars
  str = str.replace(/'\+/g, "'plus");
  str = str.replace(/'-/g, "'dash");
  str = str.replace(/'\|/g, "'vertical");
  // console.log(str, "str");
  var response = [];
  var operator = "now"; // value of the first stroke
  var buffer = "";
  for (var i = 0; i < str.length; i++) {
    if (i === str.length - 1) {
      buffer += str[i];
      response.push({
        mode: operator,
        text: buffer.length == 1 ? buffer : buffer.toLowerCase(),
      });
    } else {
      if (["+", "-", "|"].includes(str[i])) {
        response.push({
          mode: operator,
          text: buffer.length == 1 ? buffer : buffer.toLowerCase(),
        });
        switch (str[i]) {
          case "+":
            operator = "now";
            break;
          case "-":
            operator = "next";
            break;
          case "|":
            operator = "reset";
            break;
          default:
            break;
        }
        buffer = "";
      } else {
        buffer += str[i];
      }
    }
  }
  // revert escaped special chars
  response.forEach((v) => {
    if (v.text === "'plus") v.text = "+";
    else if (v.text === "'dash") v.text = "-";
    else if (v.text === "'vertical") v.text = "|";
  });
  //   console.log(JSON.stringify(response, null, 2));
  // console.log(response, "output")
  return response;
}

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

exports.fetchGoogleSlide = fetchGoogleSlide;
exports.parseShortcutCell = parseShortcutCell;
exports.parseShortcutLine = parseShortcutLine;
exports.slugify = slugify;
