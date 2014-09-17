//class Player

// Properties //
Country.prototype.name = '';
Country.prototype.capital = '';
Country.prototype.latitude = '';
Country.prototype.longitude = '';
Country.prototype.region = '';
Country.prototype.subRegion = '';

// Constructor
function Country(name, capital, latitude, longitude, region, subRegion) {
    /// <field name="name" type="String">country name</field> 
    this.name = name;
    /// <field name="capital" type="String">country's capital</field> 
    this.capital = capital;
    /// <field name="latitude" type="Number">latitude co-ordinate</field> 
    this.latitude = latitude;
    /// <field name="longitude" type="Number">longitude co-ordinate</field> 
    this.longitude = longitude;
    /// <field name="region" type="String">country's region</field> 
    this.region = region;
    /// <field name="subRegion" type="String">country's sub region</field> 
    this.subRegion = subRegion;
}