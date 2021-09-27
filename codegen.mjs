import fs from "fs";
import csv from "csv-parser";
import { CodeFile } from "@elg/tscodegen";

function addSlashes( str ) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

const promise = new Promise((resolve, reject) => {
  const result = [];
  const map = {};
  fs.createReadStream("US.txt")
    .pipe(
      csv({
        headers: [
          "country_code",
          "zip",
          "place_name",
          "name1",
          "code1",
          "name2",
          "code2",
          "name3",
          "code3",
          "lat",
          "long",
          "accuracy",
        ],
        separator: "\t",
      })
    )
    .on("data", (row) => {
      if (!map[row.zip]) {
        result.push(
            `'${addSlashes(row.zip)}': p('${addSlashes(row.code1)}','${addSlashes(
                row.place_name
            )}')`
        );
        map[row.zip] = true;
      } else {
        console.warn(`Duplicate zip code ${row.zip} in data file`)
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      resolve(result.join(","));
    });
});

const stateJS = await promise;

new CodeFile("./src/index.ts")
  .build((builder) =>
    builder
      .addLine(`const p = (city, state) => ({city, state})`)
      .addLine(`const map = { ${stateJS} }`)
      .addLine("export default map")
      .format()
  )
  .lock()
  .saveToFile();
