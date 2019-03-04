// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: false });
		//first day of weekly forecast (one day after current day)
		this.fetchWeatherData();
		this.setState({ onStartPage: true});
	}

	// a call to fetch weather data (five days)
	fetchWeatherData = () => {
		let url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=d9e40108811d59eb9e2cd8a46c08ab5d";
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
		if (this.state.onStartPage === true){
			this.setState({onStartPage: false});
		}
		else {
			this.setState({onStartPage: true});
		}
	}

	// the main render method for the iphone component
	render() {

		//get next day in week for weekly forecast
		var timestamp = this.state.tsOneDay;
		var a = new Date(timestamp*1000);
		var days = ['sun','mon','tue','wed','thr','fri','sat'];

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (

			<div class={ style.container }>
				<div class={ style.header }>
					<div class={style.topbar}>
						{/* settings */}
						<div class= { style_iphone.container }>
							<Button class={ style_iphone.button } clickFunction={ this.switchPages }/>
						</div>
					</div>

					{/* TODO: How to switch back and forth from pages? */}
					<div class={ style.icon }>
							<img src = {this.displayCondition(this.state.cond)} style = "width:100%; height:100%;"></img>
					</div>

					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class={ style.temp_min }>min: { this.state.min}</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.temp_max }>max: { this.state.max}</div>
					<div class={ style.clothes}></div>
					<div class={ style.clothes}>
							<img src = {this.displayClothes()} style = "width:100%; height:100%;"></img>
					</div>

					<div class={style.weekly}>
					  <div class={style.weekOne}>{days[a.getDay()%7]}</div>
							<div class = {style.iconOne}>
									<img src = {this.displayCondition(this.state.condOneDay)} style = "width:100%; height:100%;"></img>
							</div>
					    <div style="position:absolute; bottom: 20px; left: 5%; font-size: 15px;">{this.state.minOneDay}</div>
					    <div style="position:absolute; bottom: 20px; left: 12.5%; font-size: 15px;">{this.state.maxOneDay}</div>
					  <div class={style.weekTwo}>{days[(a.getDay()+1)%7]}</div>
							<div class = {style.iconTwo}>
									<img src = {this.displayCondition(this.state.condTwoDay)} style = "width:100%; height:100%;"></img>
							</div>
					    <div style="position:absolute; bottom: 20px; left: 25%; font-size: 15px;">{this.state.minTwoDay}</div>
					    <div style="position:absolute; bottom: 20px; left: 32.5%; font-size: 15px;">{this.state.maxTwoDay}</div>
					  <div class={style.weekThree}>{days[(a.getDay()+2)%7]}</div>
							<div class = {style.iconThree}>
									<img src = {this.displayCondition(this.state.condThreeDay)} style = "width:100%; height:100%;"></img>
							</div>
					    <div style="position:absolute; bottom: 20px; left: 45%; font-size: 15px;">{this.state.minThreeDay}</div>
					    <div style="position:absolute; bottom: 20px; left: 52.5%; font-size: 15px;">{this.state.maxThreeDay}</div>
					  <div class={style.weekFour}>{days[(a.getDay()+3)%7]}</div>
							<div class = {style.iconFour}>
									<img src = {this.displayCondition(this.state.condFourDay)} style = "width:100%; height:100%;"></img>
							</div>
					    <div style="position:absolute; bottom: 20px; left: 65%; font-size: 15px;">{this.state.minFourDay}</div>
					    <div style="position:absolute; bottom: 20px; left: 72.5%; font-size: 15px;">{this.state.maxFourDay}</div>
					  <div class={style.weekFive}>{days[(a.getDay()+4)%7]}</div>
							<div class = {style.iconFive}>
									<img src = {this.displayCondition(this.state.condFiveDay)} style = "width:100%; height:100%;"></img>
							</div>
					    <div style="position:absolute; bottom: 20px; left: 85%; font-size: 15px;">{this.state.minFiveDay}</div>
					    <div style="position:absolute; bottom: 20px; left: 92.5%; font-size: 15px;">{this.state.maxFiveDay}</div>
					</div>

				</div>

				<div class={ style.details }></div>
			</div>
		);
	}

	//parse for 5 day forecast
	parseResponse = (parsed_json) => {
	var temp_min = -100;
	var temp_max = 100;
	var temp_minOneDay;
	var temp_maxOneDay;
	var temp_minTwoDay;
	var temp_maxTwoDay;
	var temp_minThreeDay;
	var temp_maxThreeDay;
	var temp_minFourDay;
	var temp_maxFourDay;
	var temp_minFiveDay;
	var temp_maxFiveDay;

	var location = parsed_json['city']['name'];
	var temp_c = parseInt(parsed_json['list']['0']['main']['temp'], 10);
	var conditions = parsed_json['list']['0']['weather']['0']['main'];

	var temp_mins = [
		parseInt(parsed_json['list']['0']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['1']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['2']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['3']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['4']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['5']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['6']['main']['temp_min'], 10),
		parseInt(parsed_json['list']['7']['main']['temp_min'], 10)
	];
	var temp_maxs = [
		parseInt(parsed_json['list']['0']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['1']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['2']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['3']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['4']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['5']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['6']['main']['temp_max'], 10),
		parseInt(parsed_json['list']['7']['main']['temp_max'], 10)
	];
		{/* TODO: loop isnt working */}
		var i;
		for (i = 0; i < 8; i++){
			console.log("temp min " + temp_min);
			console.log(temp_mins[i]);
			if (temp_min < temp_mins[i]){
				temp_min = temp_mins[i];
			}
		}



	var temp_min0 = parseInt(parsed_json['list']['0']['main']['temp_min'], 10);
	var temp_max0 = parseInt(parsed_json['list']['0']['main']['temp_min'], 10);
	var temp_min1 = parseInt(parsed_json['list']['1']['main']['temp_min'], 10);
	var temp_max1 = parseInt(parsed_json['list']['1']['main']['temp_min'], 10);
	var temp_min2 = parseInt(parsed_json['list']['2']['main']['temp_min'], 10);
	var temp_max2 = parseInt(parsed_json['list']['2']['main']['temp_min'], 10);
	var temp_min3 = parseInt(parsed_json['list']['3']['main']['temp_min'], 10);
	var temp_max3 = parseInt(parsed_json['list']['3']['main']['temp_min'], 10);
	var temp_min4 = parseInt(parsed_json['list']['4']['main']['temp_min'], 10);
	var temp_max4 = parseInt(parsed_json['list']['4']['main']['temp_min'], 10);
	var temp_min5 = parseInt(parsed_json['list']['5']['main']['temp_min'], 10);
	var temp_max5 = parseInt(parsed_json['list']['5']['main']['temp_min'], 10);
	var temp_min6 = parseInt(parsed_json['list']['6']['main']['temp_min'], 10);
	var temp_max6 = parseInt(parsed_json['list']['6']['main']['temp_min'], 10);
	var temp_min7 = parseInt(parsed_json['list']['7']['main']['temp_min'], 10);
	var temp_max7 = parseInt(parsed_json['list']['7']['main']['temp_min'], 10);
	

	//one day after
	var timestampOneDay = parsed_json['list']['7']['dt'];
	var conditionsOneDay = parsed_json['list']['7']['weather']['0']['main'];
	var temp_minOneDay = parseInt(parsed_json['list']['7']['main']['temp_min'], 10);
	var temp_maxOneDay = parseInt(parsed_json['list']['7']['main']['temp_max'], 10);
	//two days after
	var timestampTwoDay = parsed_json['list']['15']['dt'];
	var conditionsTwoDay = parsed_json['list']['15']['weather']['0']['main'];
	var temp_minTwoDay = parseInt(parsed_json['list']['15']['main']['temp_min'], 10);
	var temp_maxTwoDay = parseInt(parsed_json['list']['15']['main']['temp_max'], 10);
	//three days after
  var timestampThreeDay = parsed_json['list']['23']['dt'];
	var conditionsThreeDay = parsed_json['list']['23']['weather']['0']['main'];
	var temp_minThreeDay = parseInt(parsed_json['list']['23']['main']['temp_min'], 10);
	var temp_maxThreeDay = parseInt(parsed_json['list']['23']['main']['temp_max'], 10);
	//four days after
	var timestampFourDay = parsed_json['list']['31']['dt'];
	var conditionsFourDay = parsed_json['list']['31']['weather']['0']['main'];
	var temp_minFourDay = parseInt(parsed_json['list']['31']['main']['temp_min'], 10);
	var temp_maxFourDay = parseInt(parsed_json['list']['31']['main']['temp_max'], 10);
	//five days after
	var timestampFiveDay = parsed_json['list']['39']['dt'];
	var conditionsFiveDay = parsed_json['list']['39']['weather']['0']['main'];
	var temp_minFiveDay = parseInt(parsed_json['list']['39']['main']['temp_min'], 10);
	var temp_maxFiveDay = parseInt(parsed_json['list']['39']['main']['temp_max'], 10);

	//TODO no feels in API


	// set states for fields so they could be rendered later on
	this.setState({
		locate: location,
		temp: temp_c,
		cond : conditions,
		min : temp_min,
		max : temp_max,

		tsOneDay : timestampOneDay,
		minOneDay: parseInt(temp_minOneDay, 10),
		maxOneDay: parseInt(temp_maxOneDay , 10),

		tsTwoDay : timestampTwoDay,
		minTwoDay: parseInt(temp_minTwoDay, 10),
		maxTwoDay: parseInt(temp_maxTwoDay, 10),

		tsThreeDay: timestampThreeDay,
		minThreeDay: parseInt(temp_minThreeDay, 10),
		maxThreeDay: parseInt(temp_maxThreeDay, 10),

		tsFourDay: timestampFourDay,
		minFourDay: parseInt(temp_minFourDay, 10),
		maxFourDay: parseInt(temp_maxFourDay, 10),

		tsFiveDay: timestampFiveDay,
		minFiveDay: parseInt(temp_minFiveDay, 10),
		maxFiveDay: parseInt(temp_maxFiveDay, 10)

	});
	}

  displayClothes = () => {
		var temp = this.state.temp;

		if (temp != "") {
			if (temp <= 10) {
				 return ("https://www.thoughtco.com/thmb/cRTak9Kc83eAPJ4oD6Y81uzEqnw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-184405145-5898a68f5f9b5874eea04b4b.jpg");
			}
			else if (temp <= 16){
				 return("https://assets.rbl.ms/13878792/980x.jpg");
			}
			else {
				 return("https://ak5.picdn.net/shutterstock/videos/4695185/thumb/1.jpg");
			}
		}
	}

	//function to determine conditions icon
	displayCondition = (cond) => {
		if (cond != "") {
			if (cond == "Thunderstorm") {
				return("../../../icons/012-storm.png");
			}
			else if (cond == "Drizzle") {
				return("../../../icons/015-cloud.png");
			}
			else if (cond == "Rain") {
				return("../../../icons/010-raining.png");
			}
			else if (cond == "Snow") {
				return("../../../icons/003-temperature.png");
			}
			else if (cond == "Atmosphere") {
				return("../../../icons/015-cloud.png");
			}
			else if (cond == "Clear") {
				return("../../../icons/016-sun.png");
			}
			else if (cond == "Clouds") {
				return("../../../icons/015-cloud.png");
			}
		}
	}


}
