Footer = React.createClass({

  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      shows: Shows.find({}, {}).fetch()
    }
  },

  getInitialState() {
    return {
        isPopup: false
    }
  },

  _togglePopup() {
    this.setState({ isPopup: !this.state.isPopup });
  },

  browseLink() {
    FlowRouter.go("browse");
  },

  browseAllLink() {
    FlowRouter.go("all");
  },

  browseShowsLink() {
    FlowRouter.go("shows");
  },

  renderShows() {
    // Get tasks from this.data.tasks
    return this.data.shows.map((show) => {
      return <ShowSnippet id={show.id} show={show} title={show.title} desc={show.desc} thumb={show.thumb} toggle={this._togglePopup} />;
    });
  },

  _renderMenu() {
    if(!this.state.isPopup) {
      return null;
    }
    return (
      <div id="mainMenu" className="container-fluid">

        <a className="close" onClick={this._togglePopup}><i className="fa fa-close fa-lg"></i> Close</a>

        <div className="col-sm-12">

          <ul>
            {this.renderShows()}
          </ul>

        </div>
      </div>

    );
  },

  render() {

    let year = new Date().getFullYear();

    return (

      <div>

        <div className="footer container-fluid">

          <div className="row-fluid">

            <div className="col-sm-3">
              <ul>
                <li><a href="javascript:;" onClick={this.browseLink} title="Browse GaloreTV">Browse</a></li>
                <li><a href="javascript:;" onClick={this.browseShowsLink} title="All Shows - GaloreTV">All Shows</a></li>
                <li><a href="javascript:;" onClick={this.browseAllLink} title="The Latest on GaloreTV">The Latest</a></li>
                <li><a href="javascript:;" title="Music Television">Music <span className="badge">Coming Soon</span></a></li>
              </ul>
            </div>

            <hr className="visible-xs"></hr>

            <div className="col-sm-3">
              <ul>
                <li><a href="https://galoremag.com/about" title="About Galore" target="_blank">About Galore</a></li>
                <li><a href="mailto:hey@galoremag.com">Careers</a></li>
                <li><a href="https://galoremag.com/dmca-policy/" title="Legal" target="_blank">Legal</a></li>
              </ul>
            </div>

            <hr className="visible-xs"></hr>

            <div className="col-sm-3">
              <ul>
                <li><a href="http://facebook.com/galoremag" title="Galore Facebook" target="_blank">Facebook</a></li>
                <li><a href="http://Instagram.com/galore" title="Galore Instagram" target="_blank">Instagram</a></li>
                <li><a href="http://youtube.com/galoremag" title="Galore YouTube" target="_blank">YouTube</a></li>
                <li><a href="http://twitter.com/" title="Galore Twitter" target="_blank">Twitter</a></li>
              </ul>
            </div>

            <hr className="visible-xs"></hr>

            <div className="col-sm-3">
              <ul>
                <li><a href="https://GaloreMag.com" title="Galore" target="_blank">GaloreMag.com</a></li>
                <li><a href="https://KittenAgency.com" title="Kitten Agency" target="_blank">KittenAgency.com</a></li>
              </ul>
            </div>

          </div>

          <div className="copyright row-fluid">
            <div className="col-xs-12">
              <p className="text-center">&copy; {year} Galore Media, Inc. All Rights Reserved</p>
            </div>
          </div>

        </div>

        {this._renderMenu()}

      </div>
    );
  }

});
