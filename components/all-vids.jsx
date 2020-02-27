AllVids = React.createClass({

  renderVids() {
    if (!this.props.vids) {
      return;
    } else {
      return this.props.vids.map((vid) => {
        return <VidBox key={vid.url} vid={vid} />;
      });
    }
  },

  getInitialState() {
    return {
      vids:[]
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
              <flag>All Videos</flag>
            </h3>
            <div id="latest" className="gridList container">
              {this.renderVids()}
            </div>
          </div>

          <div className="loadMore text-center">
              <a href="javascript:;" className="btn btn-default">Load More</a>
          </div>

          <div>
            <Footer />
          </div>

        </div>

      </div>

    );
  }
});

AllVidsWrapper = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let data = { vids: [] },
        handles = [Meteor.subscribe("vids")];
    if (!handles.every(utils.isReady)) {
        data.loading = true;
        return data;
    } else {

        let vids = Vids.find({
          'title': {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        data.vids = vids;
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
      <AllVids
        key={AllVids}
        vids={this.data.vids}
        {...this.props}
      />
    )
  }

});
