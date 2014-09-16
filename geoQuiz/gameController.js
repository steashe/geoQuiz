/// <reference path="country.js" />
gameController = {
    ScoreSheet: {
        /// <field name="playerLives" type="Number">Player life count</field>
        playerLives: 3,
        /// <field name="playerScore" type="Number">Player score</field>
        playerScore: 0,
    },

    Data: {
        allCountries:[]
    },

    init: function () {
        this.setup();
        this.loadData();
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
            this.loseLife();
        }

        
    },

    checkGameOver: function () {
        if (this.ScoreSheet.playerLives === 0) {
            alert('Game Over. You scored ' + this.ScoreSheet.playerScore + ' points.');
            this.reset();
            $('#newGame').css('visibility', 'visible');
            
            $('#score').html('');
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

                    var nation = new Country(name, capital, latitude, longitude, region, subRegion);

                    gameController.Data.allCountries.push(nation);          
                }
            },

            error: function (e) {
                alert('Please Refresh');
            }
        });
    },

    loadNextCountry: function () {
        var actual = Math.floor(Math.random() * (this.Data.allCountries.length));
        /*var random = Math.floor(Math.random() * (this.Data.allCountries.length + 1));
        var random2 = Math.floor(Math.random() * (this.Data.allCountries.length + 1));*/

        $('#country').append(this.Data.allCountries[actual].name);

        $('#options').append('<button id = "answer">' + this.Data.allCountries[actual].capital + '</button>' +
                             '<button class = "option">' + this.Data.allCountries[0].capital + '</button>' +
                             '<button class = "option">' + this.Data.allCountries[1].capital + '</button>');

        $('.option').click(function () {
            gameController.checkUserChoice(false);
        });

        $('#answer').click(function () {
            gameController.checkUserChoice(true);
        })

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
        this.reset();

        $('#score').html('Score: 0');
        $('#newGame').css('visibility', 'hidden');
        $('img').css('visibility', 'visible');
        this.loadData();
        this.loadNextCountry();
    },
};