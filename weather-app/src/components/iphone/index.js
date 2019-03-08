// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import style_daily from '../daily/style_iphone';
import style_hourly from '../hourly/style_iphone';
import style_details from  '../details/style_iphone';
import style_clothing from '../clothing/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//import daily hourly buttons

import Daily from "../daily";
import Hourly from "../hourly";
import Details from "../details";
import Clothing from "../clothing";

//import images
import thunderstorm from "../../../icons/012-storm.png";
import drizzle from "../../../icons/015-cloud.png";
import rain from "../../../icons/010-raining.png";
import snow from "../../../icons/003-temperature.png";
import atmosphere from "../../../icons/015-cloud.png";
import clear from "../../../icons/016-sun.png";
import clouds from "../../../icons/015-cloud.png";

import hoodie from "../../../icons/hoodie.png";
import shirt from "../../../icons/shirt.png";
import shorts from "../../../icons/shorts.png";
import jeans from "../../../icons/jeans.png";
import coat from "../../../icons/coat.png";
import bigjacket from "../../../icons/bigjacket.png";
import womenshirt from "../../../icons/womenshirt.png";
import womenjeans from "../../../icons/womenjeans.png";
import womenjacket from "../../../icons/womenjacket.png";
import skirt from "../../../icons/skirt.png";


export default class Iphone extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		//first day of weekly forecast (one day after current day)
		this.setState({ onMainPage: true});
		//change daily or hourly forecast on bottom bar
		this.setState({showDaily: false});
		this.setState({showHourly: true});

		//SETTINGS PAGE

		//SETUP
		this.setState({ name: "Ariana"}); //TODO CHANGE THIS LATER
		this.setState({ gender: "female"});
    	this.setState({ locate: "London"});
		this.setState({genderArr: [true, false, false]});
		this.setState({farenheit: false});
		this.setState({celcius: true});

		//set range
    	this.setState({ hot: 29});
		this.setState({ hotHigh: 37});
		this.setState({ hotLow: 29});

		this.setState({ warmHigh: 29});
		this.setState({ warmLow: 22});
    	this.setState({ warm: 22});

		this.setState({ temperateHigh: 21});
		this.setState({ temperateLow: 12});
    	this.setState({ temperate: 12});

		this.setState({ coldHigh: 12});
		this.setState({ coldLow: 1});
    	this.setState({ cold: 1});

		this.setState({ freezingHigh: 0});
		this.setState({ freezingLow: -73});

		//written text
		this.setState({ details: "" });
		//show or hide written text
		this.setState({ showDetails : true });
		this.setState({ showClothes : false });
		this.setState({ showDetailsButton : true });
		this.setState({ showClothesButton : false });

		//get current time for weekly forecast
		let newDate = new Date();
		let hour = newDate.getHours();
		this.setState({currentHour : hour});

		this.fetchWeatherData();
	}
	// a call to fetch weather data (five days)
	fetchWeatherData = () => {
		let url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=7b318df401a487a9f365782e26ded481";
		if (this.state.locate == "London") {
			url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=7b318df401a487a9f365782e26ded481";
		}
		else if (this.state.locate == "México City") {
			url = "http://api.openweathermap.org/data/2.5/forecast?id=3530597&units=metric&APPID=7b318df401a487a9f365782e26ded481";
		}
		else if (this.state.locate == "New York") {
			url = "http://api.openweathermap.org/data/2.5/forecast?id=5128581&units=metric&APPID=7b318df401a487a9f365782e26ded481";
		}
		else if (this.state.locate == "Los Angeles") {
			url = "http://api.openweathermap.org/data/2.5/forecast?id=5368381&units=metric&APPID=7b318df401a487a9f365782e26ded481";
		}
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});

		// once the data grabbed, hide the button
		//this.setState({ display: false });
	}

	//switch pages
	switchPages = () => {
		if (this.state.onMainPage === true){
			this.setState({onMainPage: false});
			this.setState({showButtonDaily: false});
			this.setState({showButtonHourly : false});
			this.setState({showHourly : false});
			this.setState({showDaily : false});
			this.setState({showClothes : false});
			this.setState({showDetails : false});
			this.setState({showClothesButton : false});
			this.setState({showDetailsButton : false});
		}
		else {
			this.setState({onMainPage: true});
			this.setState({showButtonDaily: true});
			this.setState({showButtonHourly : true});
			this.setState({showHourly : true});
			this.setState({showDaily : false});
			this.setState({showClothes : true});
			this.setState({showDetails : false});
			this.setState({showClothesButton : false});
			this.setState({showDetailsButton : true});
		}
	}

	switchDaily = () => {
		if (this.state.showDaily !== true){
			this.setState({showDaily: true});
			this.setState({showHourly : false});
		}
	}

	switchHourly = () => {
		if (this.state.showDaily === true){
			this.setState({showDaily: false});
			this.setState({showHourly : true});
		}
	}

	switchDetails = () => {
		if (this.state.onMainPage === true){
			if (this.state.showDetails === true){
				this.setState({showClothes: true});
				this.setState({showDetails: false});
				this.setState({showClothesButton: false});
				this.setState({showDetailsButton : true});
			} else {
				this.setState({showClothes: false});
				this.setState({showDetails: true});
				this.setState({showClothesButton: true});
				this.setState({showDetailsButton : false});
			}

		}
	}
	 generateText = () => {
		var text = "";
		var timeOfDay = "";
		var conditions = "";
		var suggestion1 = "";
		var suggestion2 = "";
		var suggestion3 = "";
		var suggestion4 = "";


		//TIME OF DAY
		// time between 0 and 6
		if (this.state.currentHour >= 0 && this.state.currentHour <= 6){
			timeOfDay = "Hello, ";
		}
		//time between 6 and 12: morning
		if (this.state.currentHour > 6 && this.state.currentHour <= 12){
			timeOfDay = "Good morning, ";
		}
		//time between 12 and 17: afternoon
		if (this.state.currentHour > 12 && this.state.currentHour <= 17){
			timeOfDay = "Good afternoon, ";
		}
		//time between 17 and 0: evening
		if (this.state.currentHour > 17 && this.state.currentHour <= 23){
			timeOfDay = "Good evening, ";
		}


		//WEATHER CONDITIONS
		if (this.state.cond !== "") {
			if (this.state.cond === "Thunderstorm") {
				conditions = "Today it will thunderstorm. ";
				suggestion1 = "Make sure to bring a raincoat.";
			}
			else if (this.state.cond === "Drizzle") {
				conditions = "Today there will be light rain. ";
				suggestion1 = "Make sure to bring an umbrella. ";
			}
			else if (this.state.cond === "Rain") {
				conditions = "Today it will rain. ";
				suggestion1 = "Make sure to bring a raincoat or umbrella. ";
			}
			else if (this.state.cond === "Snow") {
				conditions = "Today it will snow. ";
				suggestion1 = "Make sure to wear snow boots and a heavy jacket. ";
			}
			else if (this.state.cond === "Atmosphere") {
				conditions = "It might be foggy with low visibility today. ";
				suggestion1 = "";
			}
			else if (this.state.cond === "Clear") {
				conditions = "It's a clear day today! ";
				suggestion1 = "";
			}
			else if (this.state.cond === "Clouds") {
				conditions = "Today it will be cloudy. ";
				suggestion1 = "";
			}
		}


		//SUGGESTIONS BASED ON TEMPERATURE
		if (this.state.temp > this.state.freezingLow && this.state.temp <= this.state.freezingHigh){
			suggestion2 = "Dress in layers today – pants, a heavy jacket, and a sweater will keep you warm. ";
		}
		if (this.state.temp > this.state.coldLow && this.state.temp <= this.state.coldHigh){
			suggestion2 = "It's cold, so dress in layers - a jacket, sweater, and pants are all good options. ";
		}
		if (this.state.temp > this.state.temperateLow && this.state.temp <= this.state.temperateHigh){
			if (this.state.gender === "female"){
				suggestion2 = "Light layers will be the most comfortable - a dress, sweater, skirt with stockings, or pants. ";
			} else {
				suggestion2 = "Light layers will be the most comfortable today. Be sure to wear a sweatshirt or sweater over your t-shirt, and pants.";
			}
		}
		if (this.state.temp > this.state.warmLow && this.state.temp <= this.state.warmHigh){
			if (this.state.gender === "female"){
				suggestion2 = "It's warm today, so you can wear a dress, skirt, or shorts with a short-sleeved shirt. ";
			} else if (this.state.gender == "male" || this.state.gender == "else") {
				suggestion2 = "It's warm today, so you can wear a t-shirt, shorts, or a light sweater. ";
			}
		}
		if (this.state.temp > this.state.hotLow && this.state.temp <= this.state.hotHigh){
			if (this.state.gender === "female"){
				suggestion2 = "It's hot today! Keep cool in a short-sleeved shirt, dress, skirt, or shorts. ";
			} else if (this.state.gender === "male" || this.state.gender == "else") {
				suggestion2 = "It's hot today! Keep cool in a short-sleeved shirt and shorts. ";
			}
		}


		text = timeOfDay + this.state.name + "! Right now it is "
			+ this.state.temp + "° C. The high is " +
			this.state.max2 + "°C and the low is " + this.state.min2 + "°C. "
			+ conditions + suggestion1 + suggestion2;

		this.state.details = text;
	 }
	// the main render method for the iphone component
	render() {
		// get next day in week for weekly forecast
		var timestamp = this.state.tsOneDay;
		var a = new Date(timestamp*1000);
		var days = ['sun','mon','tue','wed','thr','fri','sat'];
		// display all weather data
		this.generateText();

		return (

			<div class={this.state.onMainPage ? style.container : style.containerSettings }>
				<div class={ style.header }>
					<div class={style.topbar}>
						{/* settings button */}
						<div class = { style_iphone.container }>
							<Button class={ style_iphone.button } clickFunction={ this.switchPages }/>
						</div>
					</div>

			{/* SETTINGS PAGE */}
				<h2 class = {this.state.onMainPage ? style.no_display : style.title}>Settings</h2>
				<h3 class = {this.state.onMainPage ? style.no_display : style.subtitle_settings}>Personal details</h3>
				<h4 class = {this.state.onMainPage ? style.no_display : style.text}>name:</h4>
				<input type="text" class = {this.state.onMainPage ? style.no_display : style.input_settings} onChange={ this.setName }value = {this.state.name}></input>
				<h4 class = {this.state.onMainPage ? style.no_display : style.text}>clothing type:</h4>
				<div class = {this.state.onMainPage ? style.no_display : style.option_button_container}>
					<button class={this.state.genderArr[0] ? style.option_button_active : style.option_button} onClick={() => this.changeGender(0)}>female</button>
					<button class={this.state.genderArr[1] ? style.option_button_active : style.option_button} onClick={() => this.changeGender(1)}>male</button>
					<button class={this.state.genderArr[2] ? style.option_button_active : style.option_button} onClick={() => this.changeGender(2)}>other</button>
				</div>

        <h3 class = {this.state.onMainPage ? style.no_display : style.subtitle_settings}>Location</h3>

        <div class = {this.state.onMainPage ? style.no_display : ""}>
          <select class = {style.searchbar} onChange={this.changeCountry}>
            <option value="London" selected>London</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="México City">México City</option>
          </select>
        </div>

				<h3 class = {this.state.onMainPage ? style.no_display : style.subtitle_settings}>Temperature</h3>
				<div class = {this.state.onMainPage ? style.no_display : style.option_button_container}>
					<button class={this.state.celcius ? style.option_button_active : style.option_button} onClick={() => this.changeUnits('c')}>ºC</button>
					<button class={this.state.farenheit ? style.option_button_active : style.option_button} onClick={() => this.changeUnits('f')}>ºF</button>
				</div>

        <div class = {this.state.onMainPage ? style.no_display : style.sliders}>

          <div>
      			<h4 class = {style.text, style.color_hot}>hot:</h4>
            <div>
        			<p class = {style.firstP}>from </p>
        			<input type="number" name="quantity" value= {this.state.hot} min={this.state.warm} max="100" onChange={ this.setHot } ></input>
        			<p> to max</p>
            </div>
          </div>

          <div>
      			<h4 class = {style.text, style.color_warm}>warm:</h4>
            <div>
        			<p class = {style.firstP}>from </p>
        			<input type="number" name="quantity" value= {this.state.warm} min={this.state.temperate} max={this.state.hot} onChange={ this.setWarm }></input>
        			<p> to {this.state.hot}</p>
            </div>
          </div>

          <div>
      			<h4 class = {style.text, style.color_temp}>just right:</h4>
            <div>
        			<p class = {style.firstP}>from </p>
        			<input type="number" name="quantity" value= {this.state.temperate} min={this.state.cold} max={this.state.warm} onChange={ this.setTemp }></input>
        			<p> to {this.state.warm}</p>
            </div>
          </div>

          <div>
      			<h4 class = {style.text, style.color_cold}>cold:</h4>
            <div>
        			<p class = {style.firstP}>from </p>
        			<input type="number" name="quantity" value= {this.state.cold} min={this.state.freezing} max={this.state.temperate} onChange={ this.setCold }></input>
        			<p> to {this.state.temperate}</p>
            </div>
          </div>

          <div>
      			<h4 class = {style.text, style.color_freezing}>freezing:</h4>
      			<p class = {style.firstP}>from min to {this.state.cold}</p>
          </div>
  			</div>

			{/* MAIN PAGE */}
			<div class={ this.state.onMainPage ? style.icon : style.no_display }>
					{this.state.onMainPage ? <img src = {this.displayCondition(this.state.cond)} style = "width:100%; height:100%;"></img> : null }
			</div>
			<div class={ style.city }>{ this.state.onMainPage ? this.state.locate : null }</div>
			<div class={ style.conditions }>{ this.state.onMainPage ? this.state.cond : null }</div>
			<div class={ style.temp_min }> {this.state.onMainPage ? this.state.min : null }</div>
			<div class={ style.temperature }>{ this.state.onMainPage ? this.state.temp : null }{this.state.onMainPage ? <h style = "font-size: 20px; position: absolute; letter-spacing: 2px">°C</h> : null}</div>
			<div class={ style.temp_max }>{this.state.onMainPage ? this.state.max : null }</div>

			{/* details/clothing buttons */}
			<div class = { this.state.showDetailsButton ? style_details.details : style.no_display}> {this.state.onMainPage ? <Details class={this.state.onMainPage ? style_details.button : style.no_display } clickFunction = { this.switchDetails }/> : null}</div>
			<div class = {this.state.showClothesButton ? style_clothing.clothing : style.no_display}> {this.state.onMainPage ? <Clothing class={this.state.onMainPage ? style_clothing.button : style.no_display } clickFunction = {this.switchDetails }/> : null}</div>

			{/* clothing section */}
			<div class={ this.state.showClothes ? style.clothes : style.no_display }>
				<div style = "float:right;">
					<img src = {this.state.showClothes ? this.displayClothesTop(this.state.temp,this.state.coldHigh,this.state.warmHigh, this.state.gender, this.state.cond) : null} style = "width: 35%; margin-top: 11%;"></img>
				</div>
				<div style = "float:right;">
					<img src = {this.state.showClothes ? this.displayClothesBottom(this.state.temp,this.state.coldHigh,this.state.warmHigh, this.state.gender, this.state.cond) : null} style = "width: 50%;position: absolute; bottom: 20px; right: 25%;"></img>
				</div>
			</div>
			{/* details section */}
			<div class = {this.state.showDetails ? style.details : style.no_display}>{this.state.showDetails ? this.state.details : null}</div>

         	 {/* daily hourly button */}

				<div class = {this.state.onMainPage ? style_daily.daily : style.no_display }> {this.state.onMainPage ? <Daily class={style_daily.button} clickFunction = { this.switchDaily }/> : null}</div>
				<div class = {this.state.onMainPage ? style_hourly.hourly : style.no_display }> {this.state.onMainPage ? <Hourly class={style_hourly.button} clickFunction = { this.switchHourly }/> : null}</div>

				{/* WEEKLY FORECAST */}
				<div class={ this.state.onMainPage ? style.weekly : style.no_display }>
				{/* one day after */}
					<div class={style.weekOne}>{this.state.showDaily ? days[a.getDay()%7] : null}</div>
						<div class = {style.iconOne}> {this.state.showDaily ? <img src = {this.displayCondition(this.state.condOneDay)} style = "width:100%; height:100%;"></img> : null }</div>
					<div style="position:absolute; bottom: 20px; left: 5%; font-size: 15px;">{this.state.showDaily ? this.state.minOneDay : null}</div>
					<div style="position:absolute; bottom: 20px; left: 12.5%; font-size: 15px;">{this.state.showDaily ? this.state.maxOneDay : null}</div>
					{/* two days after */}
					<div class={style.weekTwo}>{this.state.showDaily ? days[(a.getDay()+1)%7] : null }</div>
						<div class = {style.iconTwo}> {this.state.showDaily ? <img src = {this.displayCondition(this.state.condTwoDay)} style = "width:100%; height:100%;"></img> : null }</div>
					<div style="position:absolute; bottom: 20px; left: 25%; font-size: 15px;">{this.state.showDaily ? this.state.minTwoDay : null}</div>
					<div style="position:absolute; bottom: 20px; left: 32.5%; font-size: 15px;">{this.state.showDaily ? this.state.maxTwoDay : null}</div>
					{/* three days after */}
					<div class={style.weekThree}>{this.state.showDaily ? days[(a.getDay()+2)%7] : null}</div>
						<div class = {style.iconThree}> {this.state.showDaily ? <img src = {this.displayCondition(this.state.condThreeDay)} style = "width:100%; height:100%;"></img> : null } </div>
					<div style="position:absolute; bottom: 20px; left: 45%; font-size: 15px;">{this.state.showDaily ? this.state.minThreeDay : null}</div>
					<div style="position:absolute; bottom: 20px; left: 52.5%; font-size: 15px;">{this.state.showDaily ? this.state.maxThreeDay : null}</div>
					{/* four days after */}
					<div class={style.weekFour}>{this.state.showDaily ? days[(a.getDay()+3)%7] : null}</div>
						<div class = {style.iconFour}>{this.state.showDaily ? <img src = {this.displayCondition(this.state.condFourDay)} style = "width:100%; height:100%;"></img> : null } </div>
					<div style="position:absolute; bottom: 20px; left: 65%; font-size: 15px;">{this.state.showDaily ? this.state.minFourDay : null}</div>
					<div style="position:absolute; bottom: 20px; left: 72.5%; font-size: 15px;">{this.state.showDaily ? this.state.maxFourDay : null}</div>
					{/* five days after */}
					<div class={style.weekFive}>{this.state.showDaily ? days[(a.getDay()+4)%7] : null}</div>
						<div class = {style.iconFive}> {this.state.showDaily ? <img src = {this.displayCondition(this.state.condFiveDay)} style = "width:100%; height:100%;"></img> : null }</div>
					<div style="position:absolute; bottom: 20px; left: 85%; font-size: 15px;">{this.state.showDaily ? this.state.minFiveDay : null}</div>
					<div style="position:absolute; bottom: 20px; left: 92.5%; font-size: 15px;">{this.state.showDaily ? this.state.maxFiveDay : null}</div>
				</div>

			{/* DAILY (HOURLY) FORECAST */}

				<div class={ this.state.onMainPage ? style.weekly : style.no_display }>
					<div class={style.weekOne}>{ this.state.showHourly ? <div>now</div> : null}</div>
						<div class = {style.iconOne}> {this.state.showHourly ? <img src = {this.displayCondition(this.state.weatherCond0)} style = "width:100%; height:100%;"></img> : null }</div>
						<div style = "position :absolute; bottom: 15px; font-size: 18px; left: 8%"> {this.state.showHourly ? this.state.hourTemp0 : null}</div>
					{/* two days after */}
					<div class={style.weekTwo}>{ this.state.showHourly ? (this.state.currentHour + 3) % 24 : null}  </div>
					{/* <div>pm</div>  */}
					{/* {this.state.currentHour + 3 % 12 > 0 ? <p>pm</p> : null} </div>  */}
						<div class = {style.iconTwo}> {this.state.showHourly ? <img src = {this.displayCondition(this.state.weatherCond1)} style = "width:100%; height:100%;"></img> : null }</div>
							<div style = "position :absolute; bottom: 15px; font-size: 18px; left: 28%"> {this.state.showHourly ? this.state.hourTemp1 : null}</div>
					{/* three days after */}
					<div class={style.weekThree}>{ this.state.showHourly ? (this.state.currentHour + 6) % 24 : null}</div>
						<div class = {style.iconThree}> {this.state.showHourly ? <img src = {this.displayCondition(this.state.weatherCond2)} style = "width:100%; height:100%;"></img> : null } </div>
						<div style = "position :absolute; bottom: 15px; font-size: 18px; left: 48%"> {this.state.showHourly ? this.state.hourTemp2 : null}</div>
					{/* four days after */}
					<div class={style.weekFour}>{ this.state.showHourly ? (this.state.currentHour + 9) % 24 : null}</div>
						<div class = {style.iconFour}>{this.state.showHourly ? <img src = {this.displayCondition(this.state.weatherCond3)} style = "width:100%; height:100%;"></img> : null } </div>
						<div style = "position :absolute; bottom: 15px; font-size: 18px; right: 28%"> {this.state.showHourly ? this.state.hourTemp3 : null}</div>

					{/* five days after */}
					<div class={style.weekFive}>{ this.state.showHourly ? (this.state.currentHour + 12) % 24 : null}</div>
						<div class = {style.iconFive}> {this.state.showHourly ? <img src = {this.displayCondition(this.state.weatherCond4)} style = "width:100%; height:100%;"></img> : null }</div>
						<div style = "position :absolute; bottom: 15px; font-size: 18px; right: 8%"> {this.state.showHourly ? this.state.hourTemp3 : null} </div>
				  </div>
				</div>
			</div>
		);
	}


	//parse for 5 day forecast
	parseResponse = (parsed_json) => {
		var i;
		var temp_min = 100;
		var temp_max = -100;
		var temp_minOneDay = 100;
		var temp_maxOneDay = -100;
		var temp_minTwoDay = 100;
		var temp_maxTwoDay = -100;
		var temp_minThreeDay = 100;
		var temp_maxThreeDay = -100;
		var temp_minFourDay = 100;
		var temp_maxFourDay = -100;
		var temp_minFiveDay = 100;
		var temp_maxFiveDay = -100;

		var location = parsed_json['city']['name'];
		var temp_c = parseInt(parsed_json['list']['0']['main']['temp'], 10);
		var conditions = parsed_json['list']['0']['weather']['0']['main'];

		// calc min and max for today
		var temp_mins = [
			parseInt(parsed_json['list']['0']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['1']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['2']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['3']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['4']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['5']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['6']['main']['temp_min'], 10)
		];
		var temp_maxs = [
			parseInt(parsed_json['list']['0']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['1']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['2']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['3']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['4']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['5']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['6']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins[i] < temp_min){
				temp_min = temp_mins[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs[i] > temp_max){
				temp_max = temp_maxs[i];
			}
		}

		//one day after
		var timestampOneDay = parsed_json['list']['7']['dt'];
		var conditionsOneDay = parsed_json['list']['7']['weather']['0']['main'];

		// calc min and max for one day after
		var temp_mins1 = [
			parseInt(parsed_json['list']['7']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['8']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['9']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['10']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['11']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['12']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['13']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['14']['main']['temp_min'], 10)
		];
		var temp_maxs1 = [
			parseInt(parsed_json['list']['7']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['8']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['9']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['10']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['11']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['12']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['13']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['14']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins1[i] < temp_minOneDay){
				temp_minOneDay = temp_mins1[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs1[i] > temp_maxOneDay){
				temp_maxOneDay = temp_maxs1[i];
			}
		}
		//two days after
		var timestampTwoDay = parsed_json['list']['15']['dt'];
		var conditionsTwoDay = parsed_json['list']['15']['weather']['0']['main'];

		// calc min and max for two days after
		var temp_mins2 = [
			parseInt(parsed_json['list']['15']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['16']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['17']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['18']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['19']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['20']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['21']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['22']['main']['temp_min'], 10)
		];
		var temp_maxs2 = [
			parseInt(parsed_json['list']['15']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['16']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['17']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['18']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['19']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['20']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['21']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['22']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins2[i] < temp_minTwoDay){
				temp_minTwoDay = temp_mins2[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs2[i] > temp_maxTwoDay){
				temp_maxTwoDay = temp_maxs2[i];
			}
		}

		//three days after
		var timestampThreeDay = parsed_json['list']['23']['dt'];
		var conditionsThreeDay = parsed_json['list']['23']['weather']['0']['main'];

		// calc min and max for three days after
		var temp_mins3 = [
			parseInt(parsed_json['list']['23']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['24']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['25']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['26']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['27']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['28']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['29']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['30']['main']['temp_min'], 10)
		];
		var temp_maxs3 = [
			parseInt(parsed_json['list']['23']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['24']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['25']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['26']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['27']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['28']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['29']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['30']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins3[i] < temp_minThreeDay){
				temp_minThreeDay = temp_mins3[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs3[i] > temp_maxThreeDay){
				temp_maxThreeDay = temp_maxs3[i];
			}
		}

		//four days after
		var timestampFourDay = parsed_json['list']['31']['dt'];
		var conditionsFourDay = parsed_json['list']['31']['weather']['0']['main'];

		// calc min and max for four days after
		var temp_mins4 = [
			parseInt(parsed_json['list']['31']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['32']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['33']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['34']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['35']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['36']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['37']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['38']['main']['temp_min'], 10)
		];
		var temp_maxs4 = [
			parseInt(parsed_json['list']['31']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['32']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['33']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['34']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['35']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['36']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['37']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['38']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins4[i] < temp_minFourDay){
				temp_minFourDay = temp_mins4[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs4[i] > temp_maxFourDay){
				temp_maxFourDay = temp_maxs4[i];
			}
		}
		//five days after
		var timestampFiveDay = parsed_json['list']['39']['dt'];
		var conditionsFiveDay = parsed_json['list']['39']['weather']['0']['main'];

		// calc min and max for five days after
		var temp_mins5 = [
			parseInt(parsed_json['list']['8']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['9']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['10']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['11']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['12']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['13']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['14']['main']['temp_min'], 10),
			parseInt(parsed_json['list']['15']['main']['temp_min'], 10)
		];
		var temp_maxs5 = [
			parseInt(parsed_json['list']['8']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['9']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['10']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['11']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['12']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['13']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['14']['main']['temp_max'], 10),
			parseInt(parsed_json['list']['15']['main']['temp_max'], 10)
		];
		for (i = 0; i < 8; i++){
			if (temp_mins5[i] < temp_minFiveDay){
				temp_minFiveDay = temp_mins5[i];
			}
		}
		for (i = 0; i < 8; i++){
			if (temp_maxs5[i] > temp_maxFiveDay){
				temp_maxFiveDay = temp_maxs5[i];
			}
		}

		// hourly forecast
		var time0 = parsed_json['list']['0']["sys"]["dt_txt"];
		var weatherConditions0 = parsed_json['list']['0']['weather']['0']['main'];
		var hourlyTemp0 = parseInt(parsed_json['list']['0']['main']['temp'], 10) + "°";
		var time1 = parsed_json['list']['1']["sys"]["dt_txt"];
		var weatherConditions1 = parsed_json['list']['1']['weather']['0']['main'];
		var hourlyTemp1 = parseInt(parsed_json['list']['1']['main']['temp'], 10)+ "°";
		var time2 = parsed_json['list']['2']["sys"]["dt_txt"];
		var weatherConditions2 = parsed_json['list']['2']['weather']['0']['main'];
		var hourlyTemp2 = parseInt(parsed_json['list']['2']['main']['temp'], 10)+ "°";
		var time3 = parsed_json['list']['3']["sys"]["dt_txt"];
		var weatherConditions3 = parsed_json['list']['3']['weather']['0']['main'];
		var hourlyTemp3 = parseInt(parsed_json['list']['3']['main']['temp'], 10)+ "°";
		var time4 = parsed_json['list']['4']["sys"]["dt_txt"];
		var weatherConditions4 = parsed_json['list']['4']['weather']['0']['main'];
		var hourlyTemp4 = parseInt(parsed_json['list']['4']['main']['temp'], 10)+ "°";
		var time5 = parsed_json['list']['5']["sys"]["dt_txt"];
		var weatherConditions5 = parsed_json['list']['5']['weather']['0']['main'];
		var hourlyTemp5 = parseInt(parsed_json['list']['5']['main']['temp'], 10)+ "°";
		var time6 = parsed_json['list']['6']["sys"]["dt_txt"];
		var weatherConditions6 = parsed_json['list']['6']['weather']['0']['main'];
		var hourlyTemp6 = parseInt(parsed_json['list']['6']['main']['temp'], 10)+ "°";
		var time7 = parsed_json['list']['7']["sys"]["dt_txt"];
		var weatherConditions7 = parsed_json['list']['7']['weather']['0']['main'];
		var hourlyTemp7 = parseInt(parsed_json['list']['7']['main']['temp'], 10)+ "°";

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			min : "min: " + temp_min,
			max : "max: " + temp_max,
			min2 : temp_min,
			max2 : temp_max,

			tsOneDay : timestampOneDay,
			minOneDay: temp_minOneDay,
			maxOneDay: temp_maxOneDay,
			condOneDay: conditionsOneDay,

			tsTwoDay : timestampTwoDay,
			minTwoDay: temp_minTwoDay,
			maxTwoDay: temp_maxTwoDay,
			condTwoDay: conditionsTwoDay,

			tsThreeDay: timestampThreeDay,
			minThreeDay: temp_minThreeDay,
			maxThreeDay: temp_maxThreeDay,
			condThreeDay: conditionsThreeDay,

			tsFourDay: timestampFourDay,
			minFourDay: temp_minFourDay,
			maxFourDay: temp_maxFourDay,
			condFourDay: conditionsFourDay,

			tsFiveDay: timestampFiveDay,
			minFiveDay: temp_minFiveDay,
			maxFiveDay: temp_maxFiveDay,
			condFiveDay: conditionsFiveDay,

			Time0: time0,
			weatherCond0: weatherConditions0,
			hourTemp0: hourlyTemp0,
			weatherCond1: weatherConditions1,
			hourTemp1: hourlyTemp1,
			weatherCond2: weatherConditions2,
			hourTemp2: hourlyTemp2,
			weatherCond3: weatherConditions3,
			hourTemp3: hourlyTemp3,
			weatherCond4: weatherConditions4,
			hourTemp4: hourlyTemp4,
			weatherCond5: weatherConditions5,
			hourTemp5: hourlyTemp5,
			weatherCond6: weatherConditions6,
			hourTemp6: hourlyTemp6,
			weatherCond7: weatherConditions7,
			hourTemp7: hourlyTemp7

		});
	}

	// function to determine the clothing icon
	displayClothesTop = (temp, coldHigh, warmHigh, gender, cond) => {
			if (temp != "") {
				if (gender == "female") {
					if (temp < coldHigh) {
						if (cond != "Rain" || cond != "Snow") {
							return (womenjacket)
						} else {
							return (bigjacket);
						}
					} else if (temp < warmHigh) {
						return (womenjacket);
					} else {
						return (womenshirt);
					}
				} else {
					if (temp < coldHigh) {
						return (coat);
					} else if (temp < warmHigh) {
						return (hoodie);
					} else {
						return (shirt);
					}
				}
			}
		}

	displayClothesBottom = (temp, coldHigh, warmHigh, gender, cond) => {
		if (temp != "") {
			if (gender == "female") {
				if (temp < coldHigh) {
					return (womenjeans);
				} else if (temp < warmHigh) {
					return (womenjeans);
				} else {
					return (skirt);
				}
			} else {
				if (temp < coldHigh) {
					return (jeans);
				} else if (temp < warmHigh) {
					return (jeans);
				} else {
					return (shorts);
				}
			}
		}
	}

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  changeGender = (i) => {
    const genderArr = this.state.genderArr.slice();
    if (i == 0) {
      genderArr[0] = true;
      genderArr[1] = false;
      genderArr[2] = false;
      this.setState({
        genderArr : genderArr,
        gender : "female",
      });
    }
    else if (i == 1) {
      genderArr[0] = false;
      genderArr[1] = true;
      genderArr[2] = false;
      this.setState({
        genderArr : genderArr,
        gender : "male",
      });
    }
    else {
      genderArr[0] = false;
      genderArr[1] = false;
      genderArr[2] = true;
      this.setState({
        genderArr : genderArr,
        gender : "other",
      });
    }
  }

  changeCountry = (e) => {
    this.setState({
      locate : e.target.value,
    });
	this.fetchWeatherData();
  }

  //not implemented yet, only interface
  changeUnits = (i) => {
    if (i == 'f') {

      this.setState({
        farenheit : true,
        celcius : false,
      });
    }
    else {
      this.setState({
        farenheit : false,
        celcius : true,
      });
    }
  }

  setHot = (e) => {
    this.setState({
      hotLow : e.target.value,
      hot : e.target.value,
      warmHigh : e.target.value,
    });
  }

  setWarm = (e) => {
    this.setState({
      warmLow : e.target.value,
      warm : e.target.value,
      temperateHigh : e.target.value,
    });
  }

  setTemp = (e) => {
    this.setState({
      temperateLow : e.target.value,
      temperate : e.target.value,
      coldHigh : e.target.value,
    });
  }

  setCold = (e) => {
    this.setState({
      coldLow : e.target.value,
      cold : e.target.value,
      freezingHigh : e.target.value,
    });
  }

	//function to determine conditions icon
	displayCondition = (cond) => {
		if (cond != "") {
			if (cond === "Thunderstorm") {
				return (thunderstorm);
			}
			else if (cond === "Drizzle") {
				return (drizzle);
			}
			else if (cond === "Rain") {
				return (rain);
			}
			else if (cond === "Snow") {
				return (snow);
			}
			else if (cond === "Atmosphere") {
				return (atmosphere);
			}
			else if (cond === "Clear") {
				return (clear);
			}
			else if (cond === "Clouds") {
				return (clouds);
			}
		}
	}
}
