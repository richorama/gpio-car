var React = require('react');


var Controls = React.createClass({
	handleEvent:function(e){
		this.props.onChange(e.target.id);
	},

	stopEvent:function(){
		this.props.onChange("stop");
	},

	render_button:function(icon, action, classOverride){
		var buttonClass = classOverride || "primary";
		return <a
			href="javascript:void(0);"
			className={"btn  btn-" + buttonClass + " btn-lg glyphicon glyphicon-" + icon}
			onMouseDown={this.handleEvent}
			onMouseUp={this.stopEvent}
			id={action}></a>
	},

	render:function(){
		return <div>
			<div className="row">
				<div className="col-md-1"></div>
				<div className="col-md-1">{this.render_button("arrow-up", "fwd")}</div>
				<div className="col-md-1"></div>
			</div>
			<div className="row">
				<div className="col-md-1">{this.render_button("arrow-left", "spinl")}</div>
				<div className="col-md-1">{this.render_button("stop", "stop", "danger")}</div>
				<div className="col-md-1">{this.render_button("arrow-right", "spinr")}</div>
			</div>
			<div className="row">
				<div className="col-md-1"></div>
				<div className="col-md-1">{this.render_button("arrow-down", "back")}</div>
				<div className="col-md-1"></div>
			</div>
		</div>
	}
});

module.exports = function(cb){
	React.render(<Controls onChange={cb}/>, document.getElementById("content"));
}
