const React = require("react");
const CreateBoards = require("./boardstate.js");
require("./lifestyles.css");

module.exports = class Life extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      columns: null,
      rows: null,
      height: 0,
      cellWidth: 10,
      cellHeight: 10,
      speed: 1000,
      resize: false,
      drawn: false
    };
    
    this.setSize = this.setSize.bind(this);
    this.setDrawn = this.setDrawn.bind(this);
  }
  
  setSize(func = null){
    //Defines board dimensions & specs
    window.requestAnimationFrame(() => {
      let menuHeight = parseInt(window.getComputedStyle(document.getElementById("height-marker"),null)
                        .getPropertyValue("height"), 10),
      height = window.innerHeight * .75 - menuHeight;

      this.setState({columns: Math.floor(window.innerWidth *.75 /this.state.cellWidth), 
                     rows: Math.floor(height/this.state.cellHeight),
                     height: height, 
                     width: window.innerWidth *.75},
                     () => {if (func) {func()}});
    })  
  }
  
  setDrawn(bool){
    this.setState({drawn: bool})
  }
  
  componentDidUpdate(){
    if (this.props.resized) {
      this.setDrawn(false);
      this.props.nullResize();
    }
  }
  
  componentDidMount(){
    this.setSize();
  }
  
  render(){
    return (
      <div className="life-container">
        { this.state.columns && this.state.rows ?
          <CreateBoards
            columns={this.state.columns}
            rows={this.state.rows}
            speed={this.state.speed}
            resized={this.props.resized}
            setSize={this.setSize}
            height={this.state.height}
            width={this.state.width}
            cellHeight={this.state.cellHeight}
            cellWidth={this.state.cellWidth}
            setDrawn={this.setDrawn}
            drawn={this.state.drawn}/> :
            null
        }
        {this.state.drawn ? 
          null : 
          <div className="loader">Loading</div>
        }
      </div>
    );
  }
}