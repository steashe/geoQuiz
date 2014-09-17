/// <reference path="country.js" />
gameController = {
    ScoreSheet: {
        /// <field name="playerLives" type="Number">Player life count</field>
        playerLives: 3,
        /// <field name="playerScore" type="Number">Player score</field>
        playerScore: 0,
    },

    Data: {
        //stores all country objects
        allCountries: [],
        //stores all possible answers
        allAnswers: [],
    },

    init: function () {
        this.setup();
    },

    setup: function () {
        //adding event handler
        $('#newGame').click(function () {
            gameController.newGame();
        });
    },

    checkUserChoice: function (correct) {
        /// <summary>check the users selected answer</summary>
        /// <param name="correct" type="Boolean">correct boolean</param>
        if (correct) {
            this.increaseScore();
            this.reset();
            this.loadNextCountry();
        } else {
            this.reset();
            this.loseLife();
        }         
    },

    checkGameOver: function () {
        /// <summary>check if the player is out of lives or finished the game</summary>
        if (this.ScoreSheet.playerLives === 0 || this.Data.allCountries.length === 0) {
            alert('Game Over. You scored ' + this.ScoreSheet.playerScore + ' points.');
            this.reset();
            $('#newGame').css('visibility', 'visible');

            //empty arrays
            this.Data.allCountries = [];
            this.Data.allAnswers = [];

            $('#score').html('');
        } else {
            this.loadNextCountry();
        }
    },

    increaseScore: function () {
        /// <summary>increase the users score by one</summary>
        this.ScoreSheet.playerScore++;
        $('#score').html('');
        $('#score').append('Score: ' + this.ScoreSheet.playerScore);
    },

    loadData: function () {
        /// <summary>load the json data from the file</summary>
        $.ajax({
            type: "get",
            dataType: "text",
            async: false,
            url: "countries.json",

            success: function (result) {
                //creating JavaScript object of the json data
                var json = JSON.parse(result);

                for (var x = 0; x < json.countries.length; x++) {
                    var name = json.countries[x].name.common;
                    var capital = json.countries[x].capital;
                    var latitude = json.countries[x].latlng[0];
                    var longitude = json.countries[x].latlng[1];
                    var region = json.countries[x].region;
                    var subRegion = json.countries[x].subregion;

                    if (capital != '') {
                        var nation = new Country(name, capital, latitude, longitude, region, subRegion);
                        gameController.Data.allCountries.push(nation);
                        gameController.Data.allAnswers.push(capital);
                    }   
                }
            },

            error: function (e) {
                alert('Please Refresh');
            }
        });
    },

    loadNextCountry: function () {
        /// <summary>load the next country</summary>
        var answer = Math.floor(Math.random() * (this.Data.allCountries.length));
        var random = Math.floor(Math.random() * (this.Data.allAnswers.length));
        var random2 = Math.floor(Math.random() * (this.Data.allAnswers.length));




        //can still get 2 the same
        if (random === random2) {
            random2 = Math.floor(Math.random() * (this.Data.allAnswers.length));
        }

        if (answer === random || answer === random2) {
            answer = Math.floor(Math.random() * (this.Data.allCountries.length));
        }


        $('#country').append(this.Data.allCountries[answer].name);

        //create answer buttons
        $('#options').append('<button id = "answer">' + this.Data.allCountries[answer].capital + '</button>' + 
                             '<button class = "option">' + this.Data.allAnswers[random] + '</button>' +
                             '<button class = "option">' + this.Data.allAnswers[random2] + '</button>');

        //shuffle answer buttons
        var options = document.getElementById('options');
        for (var i = options.children.length; i >= 0; i--) {
            options.appendChild(options.children[Math.random() * i | 0]);
        }

        //add event handlers to the newly created buttons
        $('.option').click(function () {
            gameController.checkUserChoice(false);
        });

        $('#answer').click(function () {
            gameController.checkUserChoice(true);
        });

        //cut the chosen country out
        this.Data.allCountries.splice(answer, 1);
    },

    loseLife: function () {
        /// <summary>the player loses a life</summary>
        $('#life' + this.ScoreSheet.playerLives).css('visibility', 'hidden');
        this.ScoreSheet.playerLives--;
        this.checkGameOver();
    },

    reset: function () {
        /// <summary>reset the html in specific IDs</summary>
        $('#country').html('');
        $('#options').html('');
    },

    newGame: function () {
        /// <summary>create a new game</summary>
        this.ScoreSheet.playerLives = 3;
        this.ScoreSheet.playerScore = 0;

        $('#score').html('Score: 0');
        $('#newGame').css('visibility', 'hidden');
        $('img').css('visibility', 'visible');
        this.loadData();
        this.loadNextCountry();
    },
};