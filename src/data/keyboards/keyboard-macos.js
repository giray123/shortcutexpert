exports.layout = [
  {
    row: 1,
    keys: [
      {
        stroke: "esc",
        texts: [
          { name: "esc", class: "key-text-sm key-text-bottom key-text-left" },
        ],
      },
      {
        stroke: "f1",
        texts: [{ name: "F1", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f2",
        texts: [{ name: "F2", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f3",
        texts: [{ name: "F3", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f4",
        texts: [{ name: "F4", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f5",
        texts: [{ name: "F5", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f6",
        texts: [{ name: "F6", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f7",
        texts: [{ name: "F7", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f8",
        texts: [{ name: "F8", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f9",
        texts: [{ name: "F9", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f10",
        texts: [{ name: "F10", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f11",
        texts: [{ name: "F11", class: "key-text-sm key-text-bottom" }],
      },
      {
        stroke: "f12",
        texts: [{ name: "F12", class: "key-text-sm key-text-bottom" }],
      },
      { stroke: "△", texts: [{ name: "△", class: "" }] },
    ],
  },
  {
    row: 2,
    keys: [
      { stroke: "`", stroke_shift: "~", texts: [{ name: "~" }, { name: "`" }] },
      { stroke: "1", stroke_shift: "!", texts: [{ name: "!" }, { name: "1" }] },
      { stroke: "2", stroke_shift: "@", texts: [{ name: "@" }, { name: "2" }] },
      { stroke: "3", stroke_shift: "#", texts: [{ name: "#" }, { name: "3" }] },
      { stroke: "4", stroke_shift: "$", texts: [{ name: "$" }, { name: "4" }] },
      { stroke: "5", stroke_shift: "%", texts: [{ name: "%" }, { name: "5" }] },
      { stroke: "6", stroke_shift: "^", texts: [{ name: "^" }, { name: "6" }] },
      { stroke: "7", stroke_shift: "&", texts: [{ name: "&" }, { name: "7" }] },
      { stroke: "8", stroke_shift: "*", texts: [{ name: "*" }, { name: "8" }] },
      { stroke: "9", stroke_shift: "(", texts: [{ name: "(" }, { name: "9" }] },
      { stroke: "0", stroke_shift: ")", texts: [{ name: ")" }, { name: "0" }] },
      { stroke: "-", stroke_shift: "_", texts: [{ name: "_" }, { name: "-" }] },
      { stroke: "=", stroke_shift: "=", texts: [{ name: "+" }, { name: "=" }] },
      {
        stroke: "delete",
        texts: [
          { name: "⌫", class: "key-text-sm key-text-top key-text-left" },
          {
            name: "delete",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
    ],
  },
  {
    row: 3,
    keys: [
      {
        stroke: "tab",
        texts: [
          { name: "⇥", class: "key-text-sm key-text-top key-text-right" },
          { name: "tab", class: "key-text-sm key-text-bottom key-text-left" },
        ],
      },
      { stroke: "q", stroke_shift: "Q", texts: [{ name: "Q" }] },
      { stroke: "w", stroke_shift: "W", texts: [{ name: "W" }] },
      { stroke: "e", stroke_shift: "E", texts: [{ name: "E" }] },
      { stroke: "r", stroke_shift: "R", texts: [{ name: "R" }] },
      { stroke: "t", stroke_shift: "T", texts: [{ name: "T" }] },
      { stroke: "y", stroke_shift: "Y", texts: [{ name: "Y" }] },
      { stroke: "u", stroke_shift: "U", texts: [{ name: "U" }] },
      { stroke: "i", stroke_shift: "I", texts: [{ name: "I" }] },
      { stroke: "o", stroke_shift: "O", texts: [{ name: "O" }] },
      { stroke: "p", stroke_shift: "P", texts: [{ name: "P" }] },
      { stroke: "[", stroke_shift: "{", texts: [{ name: "{" }, { name: "[" }] },
      { stroke: "]", stroke_shift: "}", texts: [{ name: "}" }, { name: "]" }] },
      {
        stroke: "\\",
        stroke_shift: "|",
        texts: [{ name: "|" }, { name: "\\" }],
      },
    ],
  },
  {
    row: 4,
    keys: [
      {
        stroke: "caps",
        texts: [
          { name: "⇪", class: "key-text-sm key-text-top key-text-right" },
          { name: "caps", class: "key-text-sm key-text-bottom key-text-left" },
        ],
      },
      { stroke: "a", stroke_shift: "A", texts: [{ name: "A" }] },
      { stroke: "s", stroke_shift: "S", texts: [{ name: "S" }] },
      { stroke: "d", stroke_shift: "D", texts: [{ name: "D" }] },
      { stroke: "f", stroke_shift: "F", texts: [{ name: "F" }] },
      { stroke: "g", stroke_shift: "G", texts: [{ name: "G" }] },
      { stroke: "h", stroke_shift: "H", texts: [{ name: "H" }] },
      { stroke: "j", stroke_shift: "J", texts: [{ name: "J" }] },
      { stroke: "k", stroke_shift: "K", texts: [{ name: "K" }] },
      { stroke: "l", stroke_shift: "L", texts: [{ name: "L" }] },
      { stroke: ";", stroke_shift: ":", texts: [{ name: ":" }, { name: ";" }] },
      { stroke: "'", stroke_shift: '"', texts: [{ name: '"' }, { name: "'" }] },
      {
        stroke: "return",
        texts: [
          {
            name: "return",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
    ],
  },
  {
    row: 5,
    keys: [
      {
        stroke: "shift",
        class: "orange--text text--lighten-2",
        texts: [
          { name: "⇧", class: "key-text-sm key-text-top key-text-right" },
          { name: "shift", class: "key-text-sm key-text-bottom key-text-left" },
        ],
      },
      { stroke: "z", stroke_shift: "Z", texts: [{ name: "Z" }] },
      { stroke: "x", stroke_shift: "X", texts: [{ name: "X" }] },
      { stroke: "c", stroke_shift: "C", texts: [{ name: "C" }] },
      { stroke: "v", stroke_shift: "V", texts: [{ name: "V" }] },
      { stroke: "b", stroke_shift: "B", texts: [{ name: "B" }] },
      { stroke: "n", stroke_shift: "N", texts: [{ name: "N" }] },
      { stroke: "m", stroke_shift: "M", texts: [{ name: "M" }] },
      { stroke: ",", stroke_shift: "<", texts: [{ name: "<" }, { name: "," }] },
      { stroke: ".", stroke_shift: ">", texts: [{ name: ">" }, { name: "." }] },
      { stroke: "/", stroke_shift: "?", texts: [{ name: "?" }, { name: "/" }] },
      {
        stroke: "shift2",
        class: "orange--text text--lighten-2",
        texts: [
          { name: "⇧", class: "key-text-sm key-text-top key-text-left" },
          {
            name: "shift",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
    ],
  },
  {
    row: 6,
    keys: [
      {
        stroke: "fn",
        texts: [
          { name: "fn", class: "key-text-sm key-text-bottom key-text-left" },
        ],
      },
      {
        stroke: "control",
        texts: [
          { name: "⌃", class: "key-text-sm key-text-top key-text-right" },
          {
            name: "control",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
      {
        stroke: "option",
        texts: [
          { name: "⌥", class: "key-text-sm key-text-top key-text-right" },
          { name: "alt", class: "key-text-sm key-text-top key-text-right" },
          {
            name: "option",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
      {
        stroke: "command",
        texts: [
          { name: "⌘", class: "key-text-sm key-text-top key-text-right" },
          {
            name: "command",
            class: "key-text-sm key-text-bottom key-text-right",
          },
        ],
      },
      { stroke: "space", texts: [{ name: "" }] },
      {
        stroke: "command2",
        texts: [
          { name: "⌘", class: "key-text-sm key-text-top key-text-left" },
          {
            name: "command",
            class: "key-text-sm key-text-bottom key-text-left",
          },
        ],
      },
      {
        stroke: "option2",
        texts: [
          { name: "⌥", class: "key-text-sm key-text-top key-text-left" },
          { name: "alt", class: "key-text-sm key-text-top key-text-left" },
          {
            name: "option",
            class: "key-text-sm key-text-bottom key-text-left",
          },
        ],
      },
      {
        stroke: "left",
        style: "grid-row-end: span 1; grid-area: 1 / 8 / 3 / 9",
        texts: [{ name: "◂" }],
      },
      {
        stroke: "up",
        style: "grid-row-end: span 1; grid-area: 1 / 9 / 2 / 10",
        class: "border-radius-bottom-none",
        texts: [{ name: "▲", class: "key-text-sm" }],
      },
      {
        stroke: "down",
        style: "grid-row-end: span 1; grid-area: 2 / 9 / 3 / 10",
        class: "border-radius-top-none",
        texts: [{ name: "▼", class: "key-text-sm" }],
      },
      {
        stroke: "right",
        style: "grid-row-end: span 1; grid-area: 1 / 10 / 3 / 11",
        texts: [{ name: "▸" }],
      },
    ],
  },
];
