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
		this.setState({ display: true });
		//first day of weekly forecast (one day after current day)
		this.setState({ dayOfWeek: null});
	}

	// a call to fetch weather data (five days)
	fetchWeatherData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=d9e40108811d59eb9e2cd8a46c08ab5d";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		//get next day in week for weekly forecast
		var timestamp = this.state.tsOneDay;
		var a = new Date(timestamp*1000);
		var days = ['SUN','MON','TUE','WED','THR','FRI','SAT'];
		var nextDay = days[a.getDay()]; //TODO trying to get nextDay to work
		this.setState({dayOfWeek: nextDay});
	}

	// the main render method for the iphone component
	render() {
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
					<div class={style.weekOne}>{this.state.dayOfWeek}</div>
					{/* <div class={style.weekOne}>TUE</div> */}
					<div class={style.weekTwo}>{this.state.tsTwoDay}</div>
					<div class={style.weekThree}>{this.state.tsThreeDay}</div>
					<div class={style.weekFour}>{this.state.tsFourDay}</div>
					<div class={style.weekFive}>{this.state.tsFiveDay}</div>
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
	var timestampOneDay = parsed_json['list']['8']['dt'];
	var conditionsOneDay = parsed_json['list']['8']['weather']['0']['main'];
	var temp_minOneDay = parsed_json['list']['8']['main']['temp_min'];
	var temp_maxOneDay = parsed_json['list']['8']['main']['temp_max'];
	//two days after
	var timestampTwoDay = parsed_json['list']['16']['dt'];
	var conditionsTwoDay = parsed_json['list']['16']['weather']['0']['main'];
	var temp_minTwoDay = parsed_json['list']['16']['main']['temp_min'];
	var temp_maxTwoDay = parsed_json['list']['16']['main']['temp_max'];
	//three days after
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
