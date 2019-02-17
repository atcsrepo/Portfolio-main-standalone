const React = require("react");
const life = require("../assets/life.png");
const btc = require("../assets/blockchain.jpg");
const graph = require("../assets/stockex.jpg");
const brain = require("../assets/brain.jpg");
require("./styles.css");

module.exports = class Menu extends React.Component {
  constructor(props){
    super(props);
    
    this.divClick = this.divClick.bind(this);
  }
  
  divClick(item) {
    this.props.handleClick(item);
  }
  
  render(){
    let menu = this.props.view === "menu" ?
      ([ 
        <div className="container" key="top-panel">
          <div className="independent-panel" id="life" onClick={() => {this.divClick("life")}}>
            <div className="image-holder">
              <img className="panel-image" src={life} />
            </div>
            <p className="menu-text">Game of Life</p>
          </div>
          <div className="independent-panel" id="biot" onClick={() => {this.divClick("biot")}}>
            <div className="image-holder">
              <img className="panel-image" src={graph} />
            </div>
            <p className="menu-text">Stock/Biotech Event Tracker</p>
          </div>
        </div>,
        <div className="container" key="bottom-panel" id="bottom-menu-panel">
          <div className="independent-panel" id="crypt" onClick={() => {this.divClick("crypto")}}>
            <div className="image-holder">
              <img className="panel-image" src={btc} />
            </div>
            <p className="menu-text">Crypto Tracker</p>
          </div>
          <div className="independent-panel" id="misc" onClick={() => {this.divClick("misc")}}>
            <div className="image-holder">
              <img className="panel-image" src={brain} />
            </div>
            <p className="menu-text">Misc Parts and Pieces</p>
          </div>
        </div>
      ]) : (
        <div onClick={() => {this.divClick("menu")}} id="menu-bar">
          <div>
            <i className="fa fa-angle-double-down fa-lg" aria-hidden="true"></i>
            <span className="shrunk-menu-text"> Return to Menu </span>
            <i className="fa fa-angle-double-down fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      );

    return(
      <div className="main-view expand-menu" id="menu-container">
        {menu}
      </div>
    );
  }
}