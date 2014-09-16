/// <reference path="country.js" />
gameController = {
    ScoreSheet: {
        /// <field name="playerLives" type="Number">Player life count</field>
        playerLives: 3,
        /// <field name="playerScore" type="Number">Player score</field>
        playerScore: 0,
    },

    Data: {
        allCountries: [],
        allCapitals: []
    },

    init: function () {
        this.setup();
    },

    setup: function () {
        $('#newGame').click(function () {
            gameController.newGame();           
        });
    },

    checkUserChoice: function (correct){
        //then call loadNextData
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
        if (this.ScoreSheet.playerLives === 0 || this.Data.allCountries.length === 0) {
            alert('Game Over. You scored ' + this.ScoreSheet.playerScore + ' points.');
            this.reset();
            $('#newGame').css('visibility', 'visible');
            this.Data.allCountries = [];
            this.Data.allCapitals = [];
            $('#score').html('');
        } else {
            this.loadNextCountry();
        }
    },

    increaseScore: function () {
        this.ScoreSheet.playerScore++;
        $('#score').html('');
        $('#score').append('Score: ' + this.ScoreSheet.playerScore);
    },

    loadData: function () {
        $.ajax({
            type: "get",
            dataType: "text",
            async: false,
            url: "countries2.json",

            success: function (result) {
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
                        gameController.Data.allCapitals.push(capital);
                    }
                }
            },

            error: function (e) {
                alert('Please Refresh');
            }
        });
    },

    loadNextCountry: function () {
        var answer = Math.floor(Math.random() * (this.Data.allCountries.length));
        var random = Math.floor(Math.random() * (this.Data.allCapitals.length));
        var random2 = Math.floor(Math.random() * (this.Data.allCapitals.length));

        if (random === random2) {
            alert('in here');
            random2 = Math.floor(Math.random() * (this.Data.allCapitals.length));
        }

        if (answer === random) {
            random = Math.floor(Math.random() * (this.Data.allCapitals.length));
        }

        if (answer === random2) {
            random2 = Math.floor(Math.random() * (this.Data.allCapitals.length));
        }

        $('#country').append(this.Data.allCountries[answer].name);

        $('#options').append('<button id = "answer">' + this.Data.allCountries[answer].capital + '</button>' +
                             '<button class = "option">' + this.Data.allCapitals[random] + '</button>' +
                             '<button class = "option">' + this.Data.allCapitals[random2] + '</button>');



        var options = document.getElementById('options');
        for (var i = options.children.length; i >= 0; i--) {
            options.appendChild(options.children[Math.random() * i | 0]);
        }



        $('.option').click(function () {
            gameController.checkUserChoice(false);
        });

        $('#answer').click(function () {
            gameController.checkUserChoice(true);
        });

        //cut the chosen one out
        this.Data.allCountries.splice(answer, 1);
    },

    loseLife: function () {
        $('#life' + this.ScoreSheet.playerLives).css('visibility', 'hidden');
        this.ScoreSheet.playerLives--;
        this.checkGameOver();
    },

    reset: function () {
        $('#country').html('');
        $('#options').html('');
    },

    newGame: function () {
        this.ScoreSheet.playerLives = 3;
        this.ScoreSheet.playerScore = 0;

        $('#score').html('Score: 0');
        $('#newGame').css('visibility', 'hidden');
        $('img').css('visibility', 'visible');
        this.loadData();
        this.loadNextCountry();
    },
};