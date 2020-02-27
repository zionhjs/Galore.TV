Slide = React.createClass({

  // cleanTitle() {
  //   let str = " | Galore TV";
  //   let title = this.props.slide.title;
  //
  //   if (typeof str !== "undefined") {
  //     if (title.indexOf(str) > -1) {
  //       return title = title.replace(str,"");
  //     } else {
  //       return title;
  //     }
  //   } else {
  //     return title;
  //   }
  // },

  render() {

    let params = {slug: this.props.slide.slug};

    let vidLink = FlowRouter.path("video", params);

    return (
      <a href={vidLink} className="slide">
        <div className="slideBackground">
          <img src={this.props.slide.thumbLg}></img>
        </div>
        <div className="slideInfo">
          <h1 className="slideTitle">{this.props.slide.title}</h1>
        </div>
      </a>
    );
  }
});
