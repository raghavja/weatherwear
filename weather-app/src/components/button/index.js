// import preact
import { h, render, Component } from 'preact';

	
export default class Button extends Component {

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
					{/* <img src = "https://img.icons8.com/ios/2x/settings-filled.png"> </img> */}
					{/* style = "height: 25px; width:25px; position: absolute; top: 1%; left: 5%"></img> */}
				</button>
			</div>
		);
	}
}
