//import React,{useState,useEffect} from 'react'
//import {useHistory} from 'react-router-dom'
import React, {Component} from 'react'
import * as d3 from 'd3'

class Graph extends Component {
	constructor(props){
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		//let accessToRef = d3.select(this.myRef.current);
		//accessToRef.style("background-color","red")

		//const data = [12,36,6,25,35,10,20];


		var data = {
		    nodes: [
		      { name: "Alice" },
		      { name: "Bob" },
		      { name: "Chen" },
		      { name: "Dawg" },
		      { name: "Ethan" },
		      { name: "George" },
		      { name: "Frank" },
		      { name: "Hanes" }
		    ],
		    links: [
		      { source: "Alice", target: "Bob" },
		      { source: "Chen", target: "Bob" },
		      { source: "Dawg", target: "Chen" },
		      { source: "Hanes", target: "Frank" },
		      { source: "Hanes", target: "George" },
		      { source: "Dawg", target: "Ethan" }
		    ]
		};

		const w = 500;
		const h = 400;

		const accessToRef = d3.select(this.myRef.current)
		.append("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background-color","#cccccc")
		.style("padding",10)
		.style("margin-left",50)

		accessToRef.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr("x",(d,i)=> i*70)
		.attr("y",(d,i)=> h-10*d)
		.attr("width",65)
		.attr("height",(d,i)=> d*10)
		.attr("fill",(d,i)=> d>35? "tomato": "yellow")

	}

	drawChart(){
		const data = [12,36,6,25,35,10,20];

		const w = 500;
		const h = 400;

		const accessToRef = d3.select(this.myRef.current)
		.append("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background-color","#cccccc")
		.style("padding",10)
		.style("margin-left",50)

		accessToRef.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr("x",(d,i)=> i*70)
		.attr("y",(d,i)=> h-10*d)
		.attr("width",65)
		.attr("height",(d,i)=> d*10)
		.attr("fill","tomato")
	}

	render(){
		return <div ref={this.myRef}></div>
	}
}

export default Graph;