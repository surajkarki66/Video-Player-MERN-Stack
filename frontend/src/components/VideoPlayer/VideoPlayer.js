import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import videojs from "video.js";
import "./Videojs.css";
import Navbar from "../Navbar/Navbar";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null,
      video: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:3333/api/videoList", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userTokenTime")).token,
        },
      })
      .then((res) => {
        // eslint-disable-next-line
        res.data.map((video) => {
          if (video.uploadTitle === this.props.match.params.videoTitle) {
            this.setState({video:video})
            this.setState(
              {
                loaded: true,
                videoJsOptions: {
                  autoplay: false,
                  controls: true,
                  sources: [
                    {
                      src: video.videoPath,
                    },
                  ],
                },
              },
              () => {
                this.player = videojs(
                  this.videoNode,
                  this.state.videoJsOptions,
                  function onPlayerReady() {
                    // console.log('onPlayerReady', this)
                  }
                );
              }
            );
          }
        });
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    if (!localStorage.getItem("userTokenTime"))
      return <Redirect to="/signIn" />;
    return (
      <React.Fragment>
        <Navbar />
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
          <h3>{this.state.video.uploadTitle}</h3>
            {this.state.loaded ? (
              <div data-vjs-player>
                <video
                  ref={(node) => (this.videoNode = node)}
                  className="video-js vjs-big-play-centered"
                />
              </div>
            ) : (
              " Loading ... "
            )}
            <h3>Upload By: {this.state.video.uploaderName}</h3>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
