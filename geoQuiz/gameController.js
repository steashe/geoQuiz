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
        remainingCountries: [],                           
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

    loadData: function () {
        /// <summary>load the json data from the file</summary>
        $.ajax({
            type: "get",
            dataType: "text",
            async: false,
            url: "countries.json",

            success: function (result) {
                //creating JavaScript object of the json data
                var countries = JSON.parse(result).countries;

                for (var x = 0; x < countries.length; x++) {
                    var name = countries[x].name.common;
                    var capital = countries[x].capital;
                    var latitude = countries[x].latlng[0];
                    var longitude = countries[x].latlng[1];
                    var region = countries[x].region;
                    var subRegion = countries[x].subregion;

                    if (capital != '') {
                        var nation = new Country(name, capital, latitude, longitude, region, subRegion);
                        gameController.Data.remainingCountries.push(nation);
                        gameController.Data.allAnswers.push(capital);
                    }   
                }
            },

            error: function (e) {
                alert('Please Refresh');
                console.log(e.status);
            }
        });
    },

    loadNextCountry: function () {
        /// <summary>load the next country</summary>
        //variable for amount of answers
        var numberOfWrongAnswers = 2;
        
        //copy the answers
        var copyOfAnswers = new Array();

        for (var x = 0; x < this.Data.allAnswers.length; x++){
            copyOfAnswers.push(this.Data.allAnswers[x]);
        }
        
        //get the answer for the question
        var answer = Math.floor(Math.random() * (this.Data.remainingCountries.length));
        var answerName = this.Data.remainingCountries[answer].name;
        var answerCapital = this.Data.remainingCountries[answer].capital;

        //cut the chosen country out
        this.Data.remainingCountries.splice(answer, 1);

        //remove the answer from the copy
        var c = 0;
        while (c < copyOfAnswers.length) {
            if (answerCapital === copyOfAnswers[c]) {
                copyOfAnswers.splice(c, 1);
                break;
            }
            c++;
        }

        $('#country').html(answerName);
        $('#options').html('<button id = "answer">' + answerCapital + '</button>');
        
        //select the amount of wrong answers
        var d = 0;
        while (d < numberOfWrongAnswers) {
            var random = Math.floor(Math.random() * (copyOfAnswers.length));
            var randomCapital = copyOfAnswers[random];
            //remove them also so no duplicates
            copyOfAnswers.splice(random, 1);

            $('#options').append('<button class = "option">' + randomCapital + '</button>');
            d++;
        }

        //shuffle answer buttons
        //try to make more clear
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

        
    },

    checkUserChoice: function (correct) {
        /// <summary>check the users selected answer</summary>
        /// <param name="correct" type="Boolean">correct boolean</param>
        if (correct) {
            this.increaseScore();
            this.loadNextCountry();
        } else {
            this.loseLife();
            if (this.checkGameOver()) {
                this.gameOver();
            }else{
                this.loadNextCountry();
            }
        }         
    },

    increaseScore: function () {
        /// <summary>increase the users score by one</summary>
        this.ScoreSheet.playerScore++;
        $('#score').html('Score: ' + this.ScoreSheet.playerScore);
    },

    loseLife: function () {
        /// <summary>the player loses a life</summary>
        $('#life' + this.ScoreSheet.playerLives).css('visibility', 'hidden');
        this.ScoreSheet.playerLives--;  
    },

    checkGameOver: function () {
        /// <summary>check if the player is out of lives or finished the game</summary>
        return this.ScoreSheet.playerLives === 0 || this.Data.remainingCountries.length === 0; 
    },

    gameOver: function () {
        alert('Game Over. You scored ' + this.ScoreSheet.playerScore + ' points.');
        this.reset();
        $('#newGame').css('visibility', 'visible');

        //empty arrays
        this.Data.remainingCountries = [];
        this.Data.allAnswers = [];

        $('#score').html('');
    },

    reset: function () {
        /// <summary>reset the html in specific IDs</summary>
        $('#country').html('');
        $('#options').html('');
    }
};