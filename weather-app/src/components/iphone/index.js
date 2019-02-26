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
					<div class={ style.topbar}></div>
					<div class={ style.icon }>{ this.state.icon }</div>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class={ style.temp_min }>{ this.state.min}</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
      
      		<div class={ style.temp_max }>{ this.state.max}</div>
					<div class={ style.clothes}></div>
      
      		<div class={ style.clothes}>
							<img src = {this.displayClothes()}></img>
					</div>

				<div class={style.weekly}>
					<div class={style.weekOne}>
						{days[a.getDay()%7]}
						<div style="position:fixed; bottom: 5px; left: 2.5%;">{this.state.minOneDay}</div>
						<div style="position:fixed; bottom: 5px; left: 5%;">{this.state.maxOneDay}</div>
					</div>
					<div class={style.weekTwo}>{days[(a.getDay()+1)%7]}</div>
						<div style="position:fixed; bottom: 5px; left: 7.5%;">{this.state.minTwoDay}</div>
						<div style="position:fixed; bottom: 5px; left: 5%;">{this.state.maxTwoDay}</div>
					<div class={style.weekThree}>{days[(a.getDay()+2)%7]}</div>
						<div style="position:fixed; bottom: 5px; left: 2.5%;">{this.state.minThreeDay}</div>
						<div style="position:fixed; bottom: 5px; left: 5%;">{this.state.maxThreeDay}</div>
					<div class={style.weekFour}>{days[(a.getDay()+3)%7]}</div>
						<div style="position:fixed; bottom: 5px; left: 2.5%;">{this.state.minFourDay}</div>
						<div style="position:fixed; bottom: 5px; left: 5%;">{this.state.maxFourDay}</div>
					<div class={style.weekFive}>{days[(a.getDay()+4)%7]}</div>
						<div style="position:fixed; bottom: 5px; left: 2.5%;">{this.state.minFiveDay}</div>
						<div style="position:fixed; bottom: 5px; left: 5%;">{this.state.maxFiveDay}</div>
				</div>

				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	//parse for 5 day forecast
	parseResponse = (parsed_json) => {
	var location = parsed_json['city']['name'];
	var temp_c = parseInt(parsed_json['list']['0']['main']['temp']);
	var conditions = parsed_json['list']['0']['weather']['0']['main'];
	var temp_min = 'min: ' + String(parseInt(parsed_json['list']['0']['main']['temp_min']));
	var temp_max = 'max: ' + String(parseInt(parsed_json['list']['0']['main']['temp_max']));
	//one day after
	var timestampOneDay = parsed_json['list']['7']['dt'];
	var conditionsOneDay = parsed_json['list']['7']['weather']['0']['main'];
	var temp_minOneDay = parsed_json['list']['7']['main']['temp_min'];
	var temp_maxOneDay = parsed_json['list']['7']['main']['temp_max'];
	//two days after
	var timestampTwoDay = parsed_json['list']['15']['dt'];
	var conditionsTwoDay = parsed_json['list']['15']['weather']['0']['main'];
	var temp_minTwoDay = parsed_json['list']['15']['main']['temp_min'];
	var temp_maxTwoDay = parsed_json['list']['15']['main']['temp_max'];
	//three days after
   var timestampThreeDay = parsed_json['list']['23']['dt'];
	var conditionsThreeDay = parsed_json['list']['23']['weather']['0']['main'];
	var temp_minThreeDay = parsed_json['list']['23']['main']['temp_min'];
	var temp_maxThreeDay = parsed_json['list']['23']['main']['temp_max'];
	//four days after
	var timestampFourDay = parsed_json['list']['31']['dt'];
	var conditionsFourDay = parsed_json['list']['31']['weather']['0']['main'];
	var temp_minFourDay = parsed_json['list']['31']['main']['temp_min'];
	var temp_maxFourDay = parsed_json['list']['31']['main']['temp_max'];
	//five days after
	var timestampFiveDay = parsed_json['list']['39']['dt'];
	var conditionsFiveDay = parsed_json['list']['39']['weather']['0']['main'];
	var temp_minFiveDay = parsed_json['list']['39']['main']['temp_min'];
	var temp_maxFiveDay = parsed_json['list']['39']['main']['temp_max'];
=======
	var timestampThreeDay = parsed_json['list']['16']['dt'];
	var conditionsThreeDay = parsed_json['list']['16']['weather']['0']['main'];
	var temp_minThreeDay = parsed_json['list']['16']['main']['temp_min'];
	var temp_maxThreeDay = parsed_json['list']['16']['main']['temp_max'];
	//TODO no feels in API


	// set states for fields so they could be rendered later on
	this.setState({
		locate: location,
		temp: temp_c,
		cond : conditions,
		min : temp_min,
		max : temp_max,
		tsOneDay : timestampOneDay,
		minOneDay: temp_minOneDay,
		maxOneDay: temp_maxOneDay,
		tsTwoDay : timestampTwoDay,
		tsThreeDay: timestampThreeDay

	});
	}
  
  displayClothes = () => {
		var temp = this.state.temp;

		if (temp != "") {
			if (temp < 10) {
				// return "https://www.ecclesiastical.com/Images/cold-weather_tcm96-36410.jpg";
			}
			else if (temp < 16){
				// return("https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg");
			}
			else {
				// return("https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
			}
		}
	}
}
