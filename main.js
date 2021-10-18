(function () {

    var fuzzyResult = 'No search was made yet.';
    document.getElementById("result").innerHTML = fuzzyResult;

    let isCaseSensitive = document.getElementById("case").checked;

    document.getElementById("case").addEventListener("click", (function(){
        if (document.getElementById("case").checked){
            isCaseSensitive = true;
        } else {
            isCaseSensitive = false;
        }
    }));

    document.getElementById("search-button").addEventListener("click", function(){
        let searchString = document.getElementById("string-picker").value;
        fuzzyResult = fuzzySearch(searchString, isCaseSensitive);
        createsResultField(fuzzyResult);
    });

    document.getElementById("string-picker").addEventListener("keypress", function(e){
        if(e.key == 'Enter'){
            let searchString = document.getElementById("string-picker").value;
            fuzzyResult = fuzzySearch(searchString, isCaseSensitive);
            createsResultField(fuzzyResult);
        }
    });

    function createsResultField (result) {
        if (result.length == 0) {
            $('#result').fadeOut(function() {
                document.getElementById("result").innerHTML = "No matches found."
            }).fadeIn();
            return;
        }

        if(result.length == 1){
            $('#result').fadeOut(function() {
                document.getElementById("result").innerHTML = `The resulting match is: ${result}`;    
            }).fadeIn();
            return;
        }

        let foundNames = [...result];
        let resultString = '';

        foundNames.forEach(function(name){
            resultString += `${name}, `;
        });
        resultString = resultString.slice(0, -2);

        $('#result').fadeOut(function() {
            document.getElementById("result").innerHTML = `The resulting matches are: ${resultString}` ;
        }).fadeIn();
        return;
    }



    fuzzySearch = function (entranceString, caseSensitive = false) {
        let names = ['Robson Steindorff Ceolin', 'Kelly Benitez', 'David Schreiber-Ranner']
        let result = [];

        if(entranceString == '') return result;

        let arrayFromEntranceString = [...entranceString];

        console.log("Input entered: ");
        console.log(arrayFromEntranceString);

        names.forEach(function (name){
            let originalName = name;
            let counter = 0;

            arrayFromEntranceString.forEach(function(individualLetter){
                if (!caseSensitive) {
                    individualLetter = individualLetter.toLowerCase();
                    name = name.toLowerCase();
                }

                let letterPosition = name.indexOf(individualLetter);
                if (letterPosition > -1) {
                    name = name.slice(letterPosition);
                    counter++;
                }
            });
            if (counter == arrayFromEntranceString.length) {
                result.push(originalName);
            }
        });

        console.log("---------");
        console.log("Result: ");
        console.log(result);
        return result;
    };

    



    

    return this;
})();