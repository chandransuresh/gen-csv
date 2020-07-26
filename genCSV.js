const csv = require('csv');
const yargs = require('yargs').argv;

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isValidInput = true;

if (
  !yargs.cols ||
  !yargs.rows ||
  !isNumeric(yargs.cols) ||
  !isNumeric(yargs.rows)
) {
  isValidInput = false;
}

if (isValidInput) {
  csv
    .generate({
      columns: ['int', 'bool'],
      delimiter: '|',
      columns: yargs.cols,
      length: yargs.rows,
    })
    // Parse the records
    .pipe(
      csv.parse({
        delimiter: '|',
      })
    )
    // Transform each value into uppercase // add optional argument
    .pipe(
      csv.transform(function (record) {
        return record.map(function (value) {
          //return value.toUpperCase();
          return value;
        });
      })
    )
    // Convert the object into a stream
    .pipe(
      csv.stringify({
        quoted: true,
      })
    )
    // Print the CSV stream to stdout
    .pipe(process.stdout);
} else {
  console.log(`Invalid Input.
    Sample command 
    node genCSV --rows=5 --cols=6`);
}
