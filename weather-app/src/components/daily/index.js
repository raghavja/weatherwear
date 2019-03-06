// import preact
import { h, render, Component } from 'preact';

export default class Daily extends Component {

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
					<p style = "font-size: 18px; text-align: center; color: white; font-family: Josefin_Sans-Regular; bottom: -15px; position: absolute; right:40%">daily</p>
				</button>
			</div>
		);
	}
}
