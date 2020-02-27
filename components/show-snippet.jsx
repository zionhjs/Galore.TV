ShowSnippet = React.createClass({

  render() {
    
    let params = {slug: this.props.show.slug};

    let showLink = FlowRouter.path("show", params);

    return (
      <a href={showLink} onClick={this.props.togglePopup} className="col-sm-6 col-md-4 col-lg-3">
        <div className="showPic">
          <img src={this.props.show.thumb}></img>
        </div>
        {/*
        <div className="showDetails">
          <h5 className="text">{this.props.show.title}</h5>
          <p>{this.props.show.desc}</p>
        </div>
        */}
      </a>
    );
  }
});