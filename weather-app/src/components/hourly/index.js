// import preact
import { h, render, Component } from 'preact';

export default class Hourly extends Component {

	// rendering a function when the dailyhourly is clicked
	render() {
		let cFunction = this.props.clickFunction;
		if (typeof cFunction !== 'function'){
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			};
		}
		return (
			<div>
				<button onClick={cFunction}>
					<p style = "font-size: 18px; text-align: center; color: white;">hourly</p>
				</button>
			</div>

		);
	}
}
