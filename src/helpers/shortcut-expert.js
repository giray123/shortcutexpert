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
    // console.log("sheets", sheets);

    /**
     * GET DATA
     */
    // get all sheets
    const data_responses = await Promise.all(sheets.map((v) => fetch(v.url)));
    // console.log("data_responses", data_responses);
    // convert all sheet into json
    const data_json = await Promise.all(data_responses.map((v) => v.json()));
    // console.log("data_json", data_json);
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
    console.error(e);
    throw new Error();
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
  // response.distinct_keys = without_desciption
  //   .replace(/\s/g, "")
  //   .split(/[\\+\\|-]/);
  response.strokes = parseShortcut(without_desciption);
  return response;
}

function trimShortcutText(str) {
  /**
   * trim start and end spaces
   * trim white spaces around the operators (do not replace all spaces since for example "ctrl + click menu")
   */
  return str.trim().replace(/\s*([\'?\+\-\|])\s*/g, "$1");
}

function parseShortcut(str) {
  // console.log(str, "input")

  /**
   * SPECIAL OPERATORS ARE:
   * plus(+)
   * dash(-)
   * vertical line (|)
   * single quote (') : escape operator
   */

  // trim string
  str = trimShortcutText(str);

  // convert escaped special chars
  str = str.replace(/'\+/g, "'plus"); // '+   ---->  'plus
  str = str.replace(/'-/g, "'dash"); // '-   ---->  'dash
  str = str.replace(/'\|/g, "'vertical"); // '|   ---->  'vertical

  // console.log(str, "str");
  var response = [];
  var operator = "now"; // value of the first stroke
  var buffer = "";

  // loop each char in the string
  for (var i = 0; i < str.length; i++) {
    // if last char, add to buffer and push to array
    if (i === str.length - 1) {
      buffer += str[i];
      response.push({
        mode: operator,
        text: buffer.length == 1 ? buffer : buffer.toLowerCase(),
      });
    } else {
      // if you encounter special operator, push buffer to array and change the operator for the next buffer push
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

function parseKey(str) {
  const multiple_pattern = new RegExp("^\\[.+\\]$");
  const multiple_pattern_match = str.match(multiple_pattern);
  if (str.match(/^\[.+\]$/)) {
    return str.split("").slice(1, -1);
  } else if (str.match(/^numbers$/i)) {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  } else if (str.match(/^arrow keys$/i)) {
    return ["left", "right", "up", "down"];
  } else if (str.match(/^click$/i)) {
    return ["left mouse click"];
  } else return str;
}

exports.fetchGoogleSlide = fetchGoogleSlide;
exports.parseShortcutCell = parseShortcutCell;
exports.parseShortcutLine = parseShortcutLine;
exports.slugify = slugify;
exports.parseKey = parseKey;
