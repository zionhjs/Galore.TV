ShowSub = new SubsManager();

BrowseShows = React.createClass({

  renderShows() {
    if (!this.props.shows) {
      return;
    } else {
      return this.props.shows.map((show) => {
        return <ShowBox key={show.url} show={show} />;
      });
    }
  },

  getInitialState() {
    return {
      shows: []
    }
  },

  componentWillMount() {
    // this.setState(data);
  },

  // componentWillMount() {
  //   $('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
  //   $('.owl-carousel').find('.owl-stage-outer').children().unwrap();
  // },

  componentDidMount() {
  },

  render() {

    // if (this.data.loading) {
    //     return (
    //         <div className="loader-container">
    //             <div className="loader">
    //                 <p><i className="fa fa-venus fa-spin fa-2x"></i></p>
    //                 <p>Loading</p>
    //             </div>
    //         </div>
    //     )
    // }

    return (

      <div id="contentContainer" className="container-fluid noPadding">

        <div id="mainContent" className="col-sm-12 col-lg-12 col-lg-offset-0">

          <div className="contentArea">
            <h3>
              <flag>All Shows</flag>
            </h3>
            <div id="shows" className="gridList container">
              {this.renderShows()}
            </div>
          </div>

          <div>
            <Footer />
          </div>

        </div>

      </div>

    );
  }
});

BrowseShowsWrapper = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let data = { shows: [] },
        handles = [ShowSub.subscribe("shows")];
    if (!handles.every(utils.isReady)) {
        data.loading = true;
        return data;
    } else {
        let shows = Shows.find({}, {
          sort: {
            date: -1
          }
        }).fetch();

        data.shows = shows;
    }
    return data;

  },

  render() {

    if (this.data.loading) {
        return (
          <div className="loader-container">
              <div className="loader">
                  <p><i className="fa fa-transgender-alt fa-spin fa-2x"></i></p>
                  <p>Loading...</p>
              </div>
          </div>
        )
    }

    return (
      <BrowseShows
        key={17}
        shows={this.data.shows}
        {...this.props}
      />
    )
  }

});
