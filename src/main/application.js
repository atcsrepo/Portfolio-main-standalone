const React = require("react");
const Menu = require("./menu.js");
const Life = require("./life/life.js");
const Project = require("./projects/project.js");
const Misc = require("./misc/misc.js");

const projectDetails = require("./projects/projectdetails.js");
require("./styles.css");

module.exports = class Application extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      view: "menu",
      resized: false,
      boardCreated: false,
      rest: true,
      drawn: false
    };
    
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.setResize = this.setResize.bind(this);
  }
  
  handleMenuClick(id){
    //Menu navigation
    if (this.state.view === "menu") {
      document.getElementById("menu-container").className = "main-view shrink-menu";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.getElementById("menu-container").className = "main-view expand-menu";
    }

    this.setState({view: id});
  }
  
  setResize() {
    //Handles window resizing events
    //Originally had additional uses, so was placed in application instead of sub components
    if (this.state.resized) {
      this.setState({resized: false});
    } else {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        this.setState({resized: true});
      }, 250)
    }
  }
  
  componentDidMount(){
    window.addEventListener("resize", this.setResize);
  }
  
  componentWillUnmount(){
    window.removeEventListener("resize", this.setResize);
  }
  
  render(){
    let section;
    
    switch (this.state.view) {
      case "life":
        section = <Life
          resized={this.state.resized} 
          nullResize={this.setResize}/>;
        break;
      case "biot":
        section = <Project data={projectDetails.biot} />;
        break;
      case "crypto": 
        section = <Project data={projectDetails.crypto} />;
        break;
      default:
        section = <Misc resized={this.state.resized}
                    nullResize={this.setResize} />
    }
    
    return(
      <div>
        <Menu handleClick={this.handleMenuClick} view={this.state.view}/>
        <div className="marker" id="height-marker"/>
        {this.state.view === "menu" ? null : section}
      </div>
    )
  }
}