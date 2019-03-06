// import preact
import { h, render, Component } from 'preact';

export default class Clothing extends Component {

	// rendering a function when the button is clicked
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
					<p style = "font-size: 9px; text-align: center; width: 170px;">CLOTHING</p>
				</button>
			</div>
		);
	}
}
