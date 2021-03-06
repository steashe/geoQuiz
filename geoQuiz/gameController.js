﻿/// <reference path="country.js" />
/// <reference path="endGameController.js" />

gameController = {

	ui: {
		view: '#container',
		newGame: '#newGame',
		country: '#container .text',
		score: '#score',
		hintBtn: '#hint'
	},

	hasInit: false,

	ScoreSheet: {
		/// <field name="playerLives" type="Number">Player life count</field>
		playerLives: 3,
		/// <field name="playerScore" type="Number">Player score</field>
		playerScore: 0,
		/// <field name="playerHints" type="Number">Player hints</field>
		playerHints: 3,
	},

	Data: {
		//stores all country objects
		remainingCountries: [],
		//stores all possible answers
		allAnswers: [],
	},

	init: function () {
		gameController.setupHandlers();
		gameController.hasInit = true;
	},

	load: function(){
		if (!gameController.hasInit) gameController.init();
		$(gameController.ui.view).show();
		$(gameController.ui.newGame).show();
	},

	setupHandlers: function () {
		//adding event handler
		$(gameController.ui.newGame).click(function () {
			gameController.newGame();
		});

		$(gameController.ui.hintBtn).click(function () {
			gameController.giveHint();
		});

		//adding click handlers to things not yet created
		$(document).on('click', '.option', function () {
			gameController.checkUserChoice(false);
		});

		$(document).on('click', '#answer', function () {
			gameController.checkUserChoice(true);
		});
	},

	newGame: function () {
		/// <summary>create a new game</summary>
		this.ScoreSheet.playerLives = 3;
		this.ScoreSheet.playerScore = 0;
		this.ScoreSheet.playerHints = 3;

		$(gameController.ui.country).show();
		$(gameController.ui.hintBtn).html('3 Hints');
		$(gameController.ui.hintBtn).removeAttr('disabled');
		$(gameController.ui.hintBtn).show();
		$(gameController.ui.score).html('Score: 0');
		$(gameController.ui.newGame).hide()
		$('img').show().fadeIn(100);
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

		this.reset();
		//variable for amount of answers
		var numberOfWrongAnswers = 2;

		//copy the answers
		var copyOfAnswers = new Array();

		for (var x = 0; x < this.Data.allAnswers.length; x++) {
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

		var answerOptions = [];

		var a1 = '<button id = "answer" class =  "choice">' + answerCapital + '</button>';
		answerOptions.push(a1);

		//select the amount of wrong answers
		var d = 0;
		while (d < numberOfWrongAnswers) {
			var random = Math.floor(Math.random() * (copyOfAnswers.length));
			var randomCapital = copyOfAnswers[random];
			//remove them also so no duplicates
			copyOfAnswers.splice(random, 1);
			//add to the array of answers
			var a = '<button class = "option choice">' + randomCapital + '</button>'
			answerOptions.push(a);
			d++;
		}

		//shuffle the array of answers
		this.shuffle(answerOptions);

		//add data to html
		$(gameController.ui.country).html(answerName);

		for (var n = 0; n < answerOptions.length ; n++) {
			$('#options').append(answerOptions[n]);
		}
	},

	shuffle: function (array) {
		/// <summary>shuffle the array of answers</summary>
		/// <param name="array" type="Array">the array to be shuffled</param>
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));

			//make the swap
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},

	checkUserChoice: function (correct) {
		/// <summary>check the users selected answer</summary>
		/// <param name="correct" type="Boolean">correct boolean</param>
		if (correct) {
			this.increaseScore();
			gameController.loadNextCountry();

		} else {
			this.loseLife();
			if (this.checkGameOver()) {
				this.gameOver();
			} else {
				gameController.loadNextCountry();
			}
		}
	},

	increaseScore: function () {
		/// <summary>increase the users score by one</summary>
		this.ScoreSheet.playerScore++;
		$(gameController.ui.score).html('Score: ' + this.ScoreSheet.playerScore);
	},

	loseLife: function () {
		/// <summary>the player loses a life</summary>
		$('#life' + this.ScoreSheet.playerLives).fadeOut(800);
		this.ScoreSheet.playerLives--;
	},

	checkGameOver: function () {
		/// <summary>check if the player is out of lives or finished the game</summary>
		return this.ScoreSheet.playerLives === 0 || this.Data.remainingCountries.length === 0;
	},

	gameOver: function () {
		/// <summary>player has run out of lives</summary>
		this.reset();
		$(gameController.ui.hintBtn).hide();
		$(gameController.ui.view).hide();
		endGameController.load();

		//empty arrays
		this.Data.remainingCountries = [];
		this.Data.allAnswers = [];

		$(gameController.ui.score).html('');
	},

	reset: function () {
		/// <summary>reset the html in specific IDs</summary>
		$(gameController.ui.country).html('');
		$('#options').html('');
	},

	giveHint: function () {
		/// <summary>remove an answer for the user</summary>
		var remove = Math.random();
		var wrongAnswers = $('.option').length;

		if (wrongAnswers > 1) {
			if (remove < 0.5) {
				$('.option').first().remove();
			} else {
				$('.option').last().remove();
			}
		} else if (wrongAnswers == 1) {
			$('.option').remove();
		} else {
			return false;
		}

		this.ScoreSheet.playerHints--;
		$(gameController.ui.hintBtn).html(this.ScoreSheet.playerHints + ' Hints');

		if (this.ScoreSheet.playerHints === 0) {
			$(gameController.ui.hintBtn).attr('disabled', 'disabled');
			$(gameController.ui.hintBtn).html('Out of Hints');
		}
	}
};