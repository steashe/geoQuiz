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
        
      /*  $('.option').click(function () {
            gameController.checkUserChoice(false);
        });

        $('#answer').click(function () {
            gameController.checkUserChoice(true);
        })*/
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
            //disable options

            $('#country').html('');
            $('#newGame').css('visibility', 'visible');
            $('#options').html('');
            $('#score').html('');
        }
    },

    increaseScore: function () {
        this.ScoreSheet.playerScore++;
        $('#score').html('');
        $('#score').append('Score: ' + this.ScoreSheet.playerScore);
        //could improved to include some kind of difficulty factor
    },

    loadData: function () {

        //site to load JSON data from
        $.ajax({
            url: 'countries2.json',
            success: function (result) {
                console.log('In here');
            },
            error: function(e){
               // console.log(e.);
            }
        });
    


        /*
        for (var c = 0; c < listOfCountries.countries.length; c++) {
            var name = listOfCountries.countries[c].name.common;
            var capital = listOfCountries.countries[c].capital;
            var latitude = listOfCountries.countries[c].latlng[0];
            var longitude = listOfCountries.countries[c].latlng[1];
            var region = listOfCountries.countries[c].region;
            var subRegion = listOfCountries.countries[c].subregion;

            var nation = new Country(name, capital, latitude, longitude, region, subRegion);

            this.Data.allCountries.push(nation);
        }*/
        alert(this.Data.allCountries.length);
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
        $('#score').css('visibility', 'visible');
        $('img').css('visibility', 'visible');
        this.loadNextCountry();
    },
};











var listOfCountries = {
    "countries":
    [
          {
              "name": {
                  "common": "Afghanistan",
                  "official": "Islamic Republic of Afghanistan",
                  "native": {
                      "common": "\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646",
                      "official": "\u062f \u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646 \u0627\u0633\u0644\u0627\u0645\u064a \u062c\u0645\u0647\u0648\u0631\u06cc\u062a"
                  }
              },
              "tld": [ ".af" ],
              "cca2": "AF",
              "ccn3": "004",
              "cca3": "AFG",
              "currency": [ "AFN" ],
              "callingCode": [ "93" ],
              "capital": "Kabul",
              "altSpellings": [ "AF", "Af\u0121\u0101nist\u0101n" ],
              "relevance": "0",
              "region": "Asia",
              "subregion": "Southern Asia",
              "nativeLanguage": "pus",
              "languages": {
                  "prs": "Dari",
                  "pus": "Pashto",
                  "tuk": "Turkmen"
              },
              "translations": {
                  "cym": "Affganistan",
                  "deu": "Afghanistan",
                  "fra": "Afghanistan",
                  "hrv": "Afganistan",
                  "ita": "Afghanistan",
                  "jpn": "\u30a2\u30d5\u30ac\u30cb\u30b9\u30bf\u30f3",
                  "nld": "Afghanistan",
                  "rus": "\u0410\u0444\u0433\u0430\u043d\u0438\u0441\u0442\u0430\u043d",
                  "spa": "Afganist\u00e1n"
              },
              "latlng": [ 33, 65 ],
              "demonym": "Afghan",
              "borders": [ "IRN", "PAK", "TKM", "UZB", "TJK", "CHN" ],
              "area": 652230
          },
          {
              "name": {
                  "common": "\u00c5land Islands",
                  "official": "\u00c5land Islands",
                  "native": {
                      "common": "\u00c5land",
                      "official": "Landskapet \u00c5land"
                  }
              },
              "tld": [ ".ax" ],
              "cca2": "AX",
              "ccn3": "248",
              "cca3": "ALA",
              "currency": [ "EUR" ],
              "callingCode": [ "358" ],
              "capital": "Mariehamn",
              "altSpellings": [ "AX", "Aaland", "Aland", "Ahvenanmaa" ],
              "relevance": "0",
              "region": "Europe",
              "subregion": "Northern Europe",
              "nativeLanguage": "swe",
              "languages": {
                  "swe": "Swedish"
              },
              "translations": {
                  "deu": "\u00c5land",
                  "fra": "\u00c5land",
                  "hrv": "\u00c5landski otoci",
                  "ita": "Isole Aland",
                  "jpn": "\u30aa\u30fc\u30e9\u30f3\u30c9\u8af8\u5cf6",
                  "nld": "\u00c5landeilanden",
                  "rus": "\u0410\u043b\u0430\u043d\u0434\u0441\u043a\u0438\u0435 \u043e\u0441\u0442\u0440\u043e\u0432\u0430",
                  "spa": "Alandia"
              },
              "latlng": [ 60.116667, 19.9 ],
              "demonym": "\u00c5landish",
              "borders": [ ],
              "area": -1
          },
          {
              "name": {
                  "common": "Albania",
                  "official": "Republic of Albania",
                  "native": {
                      "common": "Shqip\u00ebria",
                      "official": "Republika e Shqip\u00ebris\u00eb"
                  }
              },
              "tld": [ ".al" ],
              "cca2": "AL",
              "ccn3": "008",
              "cca3": "ALB",
              "currency": [ "ALL" ],
              "callingCode": [ "355" ],
              "capital": "Tirana",
              "altSpellings": [
                   "AL",
                   "Shqip\u00ebri",
                   "Shqip\u00ebria",
                   "Shqipnia"
              ],
              "relevance": "0",
              "region": "Europe",
              "subregion": "Southern Europe",
              "nativeLanguage": "sqi",
              "languages": {
                  "sqi": "Albanian"
              },
              "translations": {
                  "cym": "Albania",
                  "deu": "Albanien",
                  "fra": "Albanie",
                  "hrv": "Albanija",
                  "ita": "Albania",
                  "jpn": "\u30a2\u30eb\u30d0\u30cb\u30a2",
                  "nld": "Albani\u00eb",
                  "rus": "\u0410\u043b\u0431\u0430\u043d\u0438\u044f",
                  "spa": "Albania"
              },
              "latlng": [ 41, 20 ],
              "demonym": "Albanian",
              "borders": [ "MNE", "GRC", "MKD", "KOS" ],
              "area": 28748
          },
          {
              "name": {
                  "common": "Algeria",
                  "official": "People's Democratic Republic of Algeria",
                  "native": {
                      "common": "\u0627\u0644\u062c\u0632\u0627\u0626\u0631",
                      "official": "\u0627\u0644\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a\u0629 \u0627\u0644\u0634\u0639\u0628\u064a\u0629 \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u064a\u0629"
                  }
              },
              "tld": [ ".dz", "\u0627\u0644\u062c\u0632\u0627\u0626\u0631." ],
              "cca2": "DZ",
              "ccn3": "012",
              "cca3": "DZA",
              "currency": [ "DZD" ],
              "callingCode": [ "213" ],
              "capital": "Algiers",
              "altSpellings": [ "DZ", "Dzayer", "Alg\u00e9rie" ],
              "relevance": "0",
              "region": "Africa",
              "subregion": "Northern Africa",
              "nativeLanguage": "ara",
              "languages": {
                  "ara": "Arabic"
              },
              "translations": {
                  "cym": "Algeria",
                  "deu": "Algerien",
                  "fra": "Alg\u00e9rie",
                  "hrv": "Al\u017eir",
                  "ita": "Algeria",
                  "jpn": "\u30a2\u30eb\u30b8\u30a7\u30ea\u30a2",
                  "nld": "Algerije",
                  "rus": "\u0410\u043b\u0436\u0438\u0440",
                  "spa": "Argelia"
              },
              "latlng": [ 28, 3 ],
              "demonym": "Algerian",
              "borders": [ "TUN", "LBY", "NER", "ESH", "MRT", "MLI", "MAR" ],
              "area": 2381741
          },
          {
              "name": {
                  "common": "American Samoa",
                  "official": "American Samoa",
                  "native": {
                      "common": "American Samoa",
                      "official": "American Samoa"
                  }
              },
              "tld": [ ".as" ],
              "cca2": "AS",
              "ccn3": "016",
              "cca3": "ASM",
              "currency": [ "USD" ],
              "callingCode": [ "1684" ],
              "capital": "Pago Pago",
              "altSpellings": [ "AS", "Amerika S\u0101moa", "Amelika S\u0101moa", "S\u0101moa Amelika" ],
              "relevance": "0.5",
              "region": "Oceania",
              "subregion": "Polynesia",
              "nativeLanguage": "eng",
              "languages": {
                  "eng": "English",
                  "smo": "Samoan"
              },
              "translations": {
                  "deu": "Amerikanisch-Samoa",
                  "fra": "Samoa am\u00e9ricaines",
                  "hrv": "Ameri\u010dka Samoa",
                  "ita": "Samoa Americane",
                  "jpn": "\u30a2\u30e1\u30ea\u30ab\u9818\u30b5\u30e2\u30a2",
                  "nld": "Amerikaans Samoa",
                  "rus": "\u0410\u043c\u0435\u0440\u0438\u043a\u0430\u043d\u0441\u043a\u043e\u0435 \u0421\u0430\u043c\u043e\u0430",
                  "spa": "Samoa Americana"
              },
              "latlng": [ -14.33333333, -170 ],
              "demonym": "American Samoan",
              "borders": [ ],
              "area": 199
          },
          {
              "name": {
                  "common": "Andorra",
                  "official": "Principality of Andorra",
                  "native": {
                      "common": "Andorra",
                      "official": "Principat d'Andorra"
                  }
              },
              "tld": [ ".ad" ],
              "cca2": "AD",
              "ccn3": "020",
              "cca3": "AND",
              "currency": [ "EUR" ],
              "callingCode": [ "376" ],
              "capital": "Andorra la Vella",
              "altSpellings": [ "AD", "Principality of Andorra", "Principat d'Andorra" ],
              "relevance": "0.5",
              "region": "Europe",
              "subregion": "Southern Europe",
              "nativeLanguage": "cat",
              "languages": {
                  "cat": "Catalan"
              },
              "translations": {
                  "cym": "Andorra",
                  "deu": "Andorra",
                  "fra": "Andorre",
                  "hrv": "Andora",
                  "ita": "Andorra",
                  "jpn": "\u30a2\u30f3\u30c9\u30e9",
                  "nld": "Andorra",
                  "rus": "\u0410\u043d\u0434\u043e\u0440\u0440\u0430",
                  "spa": "Andorra"
              },
              "latlng": [ 42.5, 1.5 ],
              "demonym": "Andorran",
              "borders": [ "FRA", "ESP" ],
              "area": 468
          },
          {
              "name": {
                  "common": "Angola",
                  "official": "Republic of Angola",
                  "native": {
                      "common": "Angola",
                      "official": "Rep\u00fablica de Angola"
                  }
              },
              "tld": [ ".ao" ],
              "cca2": "AO",
              "ccn3": "024",
              "cca3": "AGO",
              "currency": [ "AOA" ],
              "callingCode": [ "244" ],
              "capital": "Luanda",
              "altSpellings": [ "AO", "Rep\u00fablica de Angola", "\u0281\u025bpublika de an'\u0261\u0254la" ],
              "relevance": "0",
              "region": "Africa",
              "subregion": "Middle Africa",
              "nativeLanguage": "por",
              "languages": {
                  "por": "Portuguese"
              },
              "translations": {
                  "cym": "Angola",
                  "deu": "Angola",
                  "fra": "Angola",
                  "hrv": "Angola",
                  "ita": "Angola",
                  "jpn": "\u30a2\u30f3\u30b4\u30e9",
                  "nld": "Angola",
                  "rus": "\u0410\u043d\u0433\u043e\u043b\u0430",
                  "spa": "Angola"
              },
              "latlng": [ -12.5, 18.5 ],
              "demonym": "Angolan",
              "borders": [ "COG", "COD", "ZMB", "NAM" ],
              "area": 1246700
          },
          {
              "name": {
                  "common": "Anguilla",
                  "official": "Anguilla",
                  "native": {
                      "common": "Anguilla",
                      "official": "Anguilla"
                  }
              },
              "tld": [ ".ai" ],
              "cca2": "AI",
              "ccn3": "660",
              "cca3": "AIA",
              "currency": [ "XCD" ],
              "callingCode": [ "1264" ],
              "capital": "The Valley",
              "altSpellings": [ "AI" ],
              "relevance": "0.5",
              "region": "Americas",
              "subregion": "Caribbean",
              "nativeLanguage": "eng",
              "languages": {
                  "eng": "English"
              },
              "translations": {
                  "deu": "Anguilla",
                  "fra": "Anguilla",
                  "hrv": "Angvila",
                  "ita": "Anguilla",
                  "jpn": "\u30a2\u30f3\u30ae\u30e9",
                  "nld": "Anguilla",
                  "rus": "\u0410\u043d\u0433\u0438\u043b\u044c\u044f",
                  "spa": "Anguilla"
              },
              "latlng": [ 18.25, -63.16666666 ],
              "demonym": "Anguillian",
              "borders": [ ],
              "area": 91
          }
    ]
};