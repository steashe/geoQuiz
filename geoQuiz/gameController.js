//have to change alerts to actually doing something
gameController = {
    ScoreSheet: {
        /// <field name="playerLives" type="Number">Player life count</field>
        playerLives: 3,
        /// <field name="playerScore" type="Number">Player score</field>
        playerScore: 0,
    },

    init: function () {
        this.setup();
    },

    setup: function () {
        $('#newGame').click(function () {
            gameController.newGame();
        });
        
        $('#test').click(function () {
            gameController.checkUserChoice(false);
        });

        $('#test2').click(function () {
            gameController.checkUserChoice(true);
        });
    },

    checkUserChoice: function (correct){
        //then call loadNextData
        if (correct) {
            this.increaseScore();
        } else {
            this.loseLife();
        }
    },

    checkGameOver: function () {
        if (this.ScoreSheet.playerLives === 0) {
            alert('game over');
            //disable options
            $('#newGame').css('visibility', 'visible');
        }
    },

    increaseScore: function () {
        this.ScoreSheet.playerScore++;
        $('#score').html('');
        $('#score').append('Score: ' + this.ScoreSheet.playerScore);
        //could improved to include some kind of difficulty factor
    },

    loadNextData: function () {
        //site to load JSON data from
        $.getJSON("https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
            function (result) {
                $.each(result, function (i, field) {
                    $("#json").append(field + " ");
            });
        });
        //import data from JSON file and place into html
    },

    loseLife: function () {
        $('#life' + this.ScoreSheet.playerLives).css('visibility', 'hidden');
        this.ScoreSheet.playerLives--;
        this.checkGameOver();
    },

    newGame: function () {
        this.ScoreSheet.playerLives = 3;
        this.ScoreSheet.playerScore = 0;
        $('#score').html('');
        $('#score').html('Score: 0');
        $('#newGame').css('visibility', 'hidden');
        $('#score').css('visibility', 'visible');
        $('img').css('visibility', 'visible');
        this.loadNextData();
    },
};