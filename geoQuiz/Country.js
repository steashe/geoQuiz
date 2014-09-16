//class Player 

// Properties //
Country.prototype.name = '';
Country.prototype.capital = '';
Country.prototype.latitude = '';
Country.prototype.longitude = '';
Country.prototype.region = '';
Country.prototype.subRegion = '';
Country.prototype.callCode = '';


// Constructor
function Country(name, capital, latitude, longitude, region, subRegion, callCode) {
    /// <field name="name" type="String">player name</field> 
    this.name = name;

    this.capital = capital;

    this.latitude = latitude;

    this.longitude = longitude;

    this.region = region;

    this.subRegion = subRegion;

    this.callCode = callCode;
}

// Methods //
