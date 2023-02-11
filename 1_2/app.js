const docxConverter = require("docx-pdf");

docxConverter("./word.docx", "./example.pdf", function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log("result" + result);
});
