ShowSub = new SubsManager();

App = React.createClass({
  // This mixin makes the getMeteorData method work

  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let data = { shows: [] },
        handles = [ShowSub.subscribe("shows")];
    if (!handles.every(utils.isReady)) {
        data.loading = true;
        return data;
    } else {
        let shows = Shows.find({}, {
            sort: {
                title: -1
            }
        }).fetch();

        data.shows = shows;
    }
    return data;
  },

  getInitialState() {
    return {
        isPopup: false
    }
  },

  componentDidMount() {
  },

  componentDidReceiveProps(nextProps) {
  },

  componentWillUnmount() {
  },

  _togglePopup() {
    this.setState({ isPopup: !this.state.isPopup });

    if (document.body.classList.contains('freeze')) {
      document.body.classList.remove('freeze');
    }
  },

  _renderMenu() {
    if(!this.state.isPopup) {
      return null;
    }
    if (this.data.loading) {
        return (
          <div className="loader-container">
              <div className="loader">
                  <p><i className="fa fa-venus fa-spin fa-2x"></i></p>
                  <p>Loading</p>
              </div>
          </div>
        )
    }

    Blaze.addBodyClass('freeze');

    return (
      <div id="mainMenu" className="container-fluid">

        <h2 id="showsTitle">Shows</h2>

        <a id="menuClose" className="close" onClick={this._togglePopup}><i className="fa fa-close"></i> Close</a>

        <div className="col-sm-12">

          <ul>
            {this.renderShows()}
          </ul>

        </div>
      </div>
    );
  },

  renderShows() {
    // Get tasks from this.data.tasks
    return this.data.shows.map((show) => {
      return <ShowSnippet key={show.url} show={show} togglePopup={this._togglePopup} />;
    });
  },

  render() {

    var animationProps;
    if (this.state.isPopup) {
      animationProps = {
        duration: 200,
        animation: {
          opacity: [1, 0]
        },
      };
    } else {
      animationProps = {
        duration: 200,
        animation: {
          opacity: [0, 1]
        }
      };
    }

    if (this.data.loading) {
        return (
          <div className="loader-container">
              <div className="loader">
                  <p><i className="fa fa-venus fa-spin fa-2x"></i></p>
                  <p>Loading...</p>
              </div>
          </div>
        )
    }

    return (

      <div id="globalContainer" className="container noPadding" itemScope="itemscope" itemType="http://schema.org/Article">

        <VelocityComponent {...animationProps}>
          {this._renderMenu()}
        </VelocityComponent>

        <div>
          <Header togglePopup={this._togglePopup} />
        </div>

        {this.props.content}

      </div>

    );
  }
});
