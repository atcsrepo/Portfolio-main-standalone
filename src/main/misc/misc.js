const React = require("react");
const panelContent = require("./panelcontent.js");
require("./miscstyles.css");

module.exports = class Misc extends React.Component {
  constructor(props){
    super(props);
    
    this.state ={
      panels: [],
      idx: 0,
      display: 0,
      numItems: 0,
      endNum: 0
    }
    
    this.generatePanels = this.generatePanels.bind(this);
    this.createPanels = this.createPanels.bind(this);
    this.changeIdx = this.changeIdx.bind(this);
  }
  
  changeIdx(e){
    let id = e.target.id,
        temp;

    if (id === "next-misc") {
      this.setState({idx: (this.state.idx + 1) % this.state.numItems});
    } else {
      temp = this.state.idx - 1;

      if (temp < 0) {
        this.setState({idx: this.state.numItems - 1});
      } else {
        this.setState({idx: temp});
      }
    }
  }
  
  createPanels(){
    window.requestAnimationFrame(() => {
      this.generatePanels();
    })
  }
  
  generatePanels(){
    let panels = [],
        panelKeys = Object.keys(panelContent), 
        width = window.innerWidth,
        rootFont = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size')),
        panelWidth = rootFont * 19 + 20,
        numItems = panelKeys.length,
        endNum = numItems,
        iconWidth = rootFont * 4,
        img;

    //Restricts the number o displayed panels to what can be supported by window width
    //Does not go below 1
    if (width / panelWidth < numItems) {
      endNum = Math.floor((width - iconWidth * 2)/panelWidth);
      
      if (endNum === 0) {
        endNum = 1;
      }
    }

    for (let i = 0; i < numItems; i++){
      img = panelContent[panelKeys[i]].icon;
      
      panels.push(
        <div className="misc-panel" key={"misc-item" + i}>
          <div className="misc-image-div">
            <img className="misc-image" src={img} />
          </div>
          <p className="misc-text">
            <span className="misc-heading">Topic: </span>
            {panelContent[panelKeys[i]].topic}
          </p>
          <p className="misc-text">
            <span className="misc-heading">Language: </span>
            {panelContent[panelKeys[i]].language}
          </p>
          <p className="misc-text">
            <span className="misc-heading">Link: </span>
              <a href={panelContent[panelKeys[i]].link} target="_blank">
              {panelContent[panelKeys[i]].repo}
            </a>
          </p>
          <div className="misc-text">
            <span className="misc-heading">Intro: </span>
            <p dangerouslySetInnerHTML={{__html: panelContent[panelKeys[i]].text}}></p>
          </div>
        </div>
      )
    }
    
    this.setState({panels: panels, endNum: endNum, numItems: numItems});
  }
  
  componentDidUpdate(){
    //Recreates panels if resized
    if (this.props.resized) {
      this.createPanels();
      this.props.nullResize();
    }
    
    window.requestAnimationFrame(()=> {
      let outerContainerHeight = parseFloat(window.getComputedStyle(document.getElementById("misc-container"),null).height);
      
      let contentHeight = parseFloat(window.getComputedStyle(document.getElementById("misc-content-container"),null).height);

      let heightDifference = outerContainerHeight - contentHeight;
      
      if (heightDifference <= 0) {
        document.getElementById("misc-container").style.height = (700-heightDifference) + "px";
      }
    })
  }
  
  componentDidMount(){
    this.createPanels();
  }
  
  render(){
    let panelItems = [];

    for(let i = 0; i < this.state.endNum; i++) {
      panelItems.push(this.state.panels[(this.state.idx + i) % this.state.numItems]);
    }

    return (
      <div className="misc-container" id="misc-container">
        <div className="misc-content-container" id="misc-content-container">
          {this.state.endNum !== this.state.numItems ? 
            <div className="get-misc" 
              id="prev-misc" 
              onClick={this.changeIdx}> 
              {"<"} 
            </div> :
            null
          }
          {panelItems}
          {this.state.endNum !== this.state.numItems ? 
            <div className="get-misc" 
              id="next-misc" 
              onClick={this.changeIdx}> 
              {">"} 
            </div> :
            null
          }
        </div>
      </div>
    );
  }
}