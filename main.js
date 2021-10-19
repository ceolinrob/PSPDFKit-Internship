(function () {

    var names = ['Robson Steindorff Ceolin', 'Kelly Benitez', 'David Schreiber-Ranner'];
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
        fuzzyResult = fuzzySearch(searchString, isCaseSensitive, names);
        createsResultField(fuzzyResult);
    });

    document.getElementById("string-picker").addEventListener("keypress", function(e){
        if(e.key == 'Enter'){
            let searchString = document.getElementById("string-picker").value;
            fuzzyResult = fuzzySearch(searchString, isCaseSensitive, names);
            createsResultField(fuzzyResult);
        }
    });

    function createsResultField (result) {
        if (!result) {
            $('#result').fadeOut(function() {
                document.getElementById("result").innerHTML = "Search cleared.";
            }).fadeIn();
            return;
        }

        if (result.length == 0) {
            $('#result').fadeOut(function() {
                document.getElementById("result").innerHTML = "No matches found.";
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
        resultString = resultString.slice(0, -2); //removes the trailing comma.

        $('#result').fadeOut(function() {
            document.getElementById("result").innerHTML = `The resulting matches are: ${resultString}` ;
        }).fadeIn();
        return;
    }



    fuzzySearch = function (entranceString, caseSensitive = false, names) {
        let result = [];

        if(entranceString == '') return false;

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
                    name = name.slice(letterPosition+1);
                    counter++;
                }
            });
            if (counter == arrayFromEntranceString.length) {
                result.push(originalName);
            }
        });

        console.log("Result: ");
        console.log(result);
        return result;
    };

    displaysAllNamesOnSide = function (names) {
        names.forEach(function(name){
            let innerName = $(`<li>${name}</li>`);
            $('#display-names').append(innerName);
        });
    }

    displaysAllNamesOnSide(names);



    

    return this;
})();