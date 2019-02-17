const React = require("react");
const holderImg = require("../../assets/crypto.jpg");
const ImageModal = require("./imagemodal.js");
require("./projectstyles.css");

module.exports = class Crypto extends React.Component {
    constructor(props){
    super(props);
    
    this.state = {
      modal: false
    };
    
    this.setModal = this.setModal.bind(this);
    this.creatListItems = this.createListItems.bind(this);
  }
  
  setModal(){
    this.setState({modal: !this.state.modal});
  }
  
  createListItems(type, featureList){
    let items = [];
    
    for (let i = 0; i < featureList.length; i++) {
      items.push(<li className="feature-list-item" key={type + i}>{featureList[i]}</li>);
    }
    
    return items;
  }
  
  render(){
    let data = this.props.data;
    
    return (
      <div className="project-container">
        {this.state.modal ? 
          <ImageModal close={this.setModal} images={data.images} view={this.state.modal}/> : 
          null
        }
        <div>
          <p className="projectname">{data.name}</p>
          <div className="info-container">
            <div className="left-info">
              <p className="description-text">
                <span className="description-name">Front-End</span>: {data.front}
              </p>
              <p className="description-text">
                <span className="description-name">Back-End:</span>: {data.back}
              </p>
              <p className="description-text">
                <span className="description-name">Database</span>: {data.db}
              </p>
              <p className="description-text">
                <span className="description-name">Tested Browsers</span>: {data.tested}
              </p>
              <p className="description-text">
                <span className="description-name">Link</span>: <a href={data.link} target="_blank">Click here</a>
              </p>
              <p className="description-text">
                <span className="description-name">Sample Code</span>: <a href={data.repoLink} target="_blank">{data.repo}</a>
              </p>
              <p className="description-text">
                <span className="description-name">Description</span>: {data.desc}
              </p>
              <p className="description-text">
                <span className="description-name">Images</span>:
              </p>
              <div className="proj-image-holder">
                <img className="proj-img" onClick={this.setModal} src={data.images[0]}/>
              </div>
            </div>
            <div className="right-info">
              <p className="feature-heading">Front-End Overview:</p>
              <ul className="feature-list">
                {this.creatListItems("front", data.frontOverview)}
              </ul>
              <p className="feature-heading">Back-End Overview:</p>
              <ul className="feature-list">
                {this.creatListItems("back", data.backOverview)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}