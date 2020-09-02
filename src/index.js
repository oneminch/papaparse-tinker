import { parse } from "papaparse";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

let tbl;

parse("/data/data.csv", {
  download: true,
  delimiter: "",
  complete: function(results) {
    tbl = new Grid({
      columns: [],
      data: []
    });

    let rows = [],
      cols = [...results.data[0]];

    for (let i = 1; i < results.data.length - 1; i++) {
      rows.push(results.data[i]);
    }

    tbl
      .updateConfig({
        columns: cols,
        data: [...rows]
      })
      .render(document.querySelector("#app"));
  }
});
