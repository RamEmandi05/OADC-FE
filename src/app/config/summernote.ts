let summerNoteConfig = {
    airMode: false,
    tabDisable: true,
    popover: {
      table: [
        ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
        ["delete", ["deleteRow", "deleteCol", "deleteTable"]]
      ],
      image: [
        ["image", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
        ["float", ["floatLeft", "floatRight", "floatNone"]],
        ["remove", ["removeMedia"]]
      ],
      link: [["link", ["linkDialogShow", "unlink"]]],
      air: [
        [
          "font",
          [
            "normal",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "clear"
          ]
        ]
      ]
    },
    height: "200px",
    uploadImagePath: "/api/upload",
    toolbar: [
      ["misc", ["codeview", "undo", "redo", "codeBlock"]],
      [
        "font",
        [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "clear"
        ]
      ],
      ["fontsize", ["fontname", "fontsize", "color"]],
      ["para", ["style0", "ul", "ol", "paragraph", "height"]],
      ["insert", ["table", "picture", "link", "video", "hr"]],
      ["customButtons", ["testBtn"]]
    ],
  
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true
  };

export default summerNoteConfig;