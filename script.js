let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(parseInt(matrix[i][col]));
    }
    return column;
}

input.addEventListener('change', () => {
    let files = input.files;

    if (files.length == 0) return;
    var file = files[0];
    let reader = new FileReader();
    var array = [];
    reader.onload = (e) => {
        var file = e.target.result;
        var lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
        array = CSVToArray(file, ';');
        console.log(array[0][0]);
        makeGraph(array);
    };





    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

    function makeGraph(array) {

        var ax = [getCol(array, 0), getCol(array, 1), getCol(array, 2)];
        console.log(ax);


        
        const data = {
            labels: ax[0],
            datasets: [{
                label: 'accel',
                data: ax[1],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'accel2',
                data: ax[2],
                fill: false,
                borderColor: 'rgb(75, 76, 192)',
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            };

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, config);



    }

});


//------------------------------------------------------------------------------------------

/*let input = document.querySelector('input');
let textarea = document.querySelector('textarea');*/

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(parseInt(matrix[i][col]));
    }
    return column;
}

input.addEventListener('change', () => {
    let files = input.files;

    if (files.length == 0) return;
    var file = files[0];
    let reader = new FileReader();
    var array = [];
    reader.onload = (e) => {
        var file = e.target.result;
        var lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
        array = CSVToArray(file, ';');
        console.log(array[0][0]);
        makeGraph(array);
    };





    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

    function makeGraph(array) {

        var ax = [getCol(array, 0), getCol(array, 4), getCol(array, 5)];
        console.log(ax);


        
        const data = {
            labels: ax[0],
            datasets: [{
                label: 'gyro',
                data: ax[1],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'gyro2',
                data: ax[2],
                fill: false,
                borderColor: 'rgb(75, 76, 192)',
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            };

        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, config);



    }

});
