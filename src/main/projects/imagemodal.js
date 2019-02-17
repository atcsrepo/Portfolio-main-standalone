const React = require("react");
require("./projectstyles.css");

module.exports = class ImageModal extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      idx: 0
    };
    
    this.stopEvents = this.stopEvents.bind(this);
    this.getImg = this.getImg.bind(this);
  }
  
  stopEvents(e){
    e.stopPropagation();
  }
  
  getImg(e){
    let id = e.target.id,
        imgLength = this.props.images.length,
        newIdx;
    
    if (id === "prev-img") {
      newIdx = this.state.idx - 1;
      
      if (newIdx < 0) {
        //Mostly because % gives a -'ve number
        newIdx = imgLength - 1;
      }
    } else {
      newIdx = (this.state.idx + 1) % imgLength;
    }
    
    this.setState({idx: newIdx});
  }
  
  componentDidMount(){
    //Prevent user from scrolling, as overlay doesn't go past 100vh
    //Set top of overlay @top of user's current location
    document.body.style.overflow = "hidden";
    document.getElementById("proj-overlay").style.top = (window.pageYOffset !== undefined) ? window.pageYOffset + "px" : 
    (document.documentElement || document.body.parentNode || document.body).scrollTop  + "px";
  }
  
  componentWillUnmount(){
    document.body.style.overflow = "auto";
  }
  
  render(){
    let images = this.props.images;
    
    if (!this.props.view){
      return null;
    }
    
    return (
      <div className="proj-img-overlay" onClick={this.props.close} id="proj-overlay">
        <div className="proj-lg-img-div" onClick={this.stopEvents}>
          <div className="lg-img-left" id="prev-img" onClick={this.getImg}> {"<"} </div>
          <div className="lg-img-holder">
            <img className="lg-img" src={images[this.state.idx]} />
          </div>
          <div className="lg-img-right" id="next-img" onClick={this.getImg}> {">"} </div>
        </div>
      </div>
    );
  }
}