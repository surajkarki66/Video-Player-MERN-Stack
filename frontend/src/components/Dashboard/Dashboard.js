import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";

const dashboard = React.memo(() => {
    let shouldRedirect = false;
    if (localStorage.getItem("userTokenTime")) {
        // Check if user holds token which is valid in accordance to time
        const data = JSON.parse(localStorage.getItem("userTokenTime"));
        if (new Date().getTime() - data.time > 1 * 60 * 60 * 1000) {
            // It's been more than hour since you have visited dashboard
            localStorage.removeItem("userTokenTime");
            shouldRedirect = true;
        }
    } else {
        shouldRedirect = true;
    }
    const [redirect, setRedirect] = useState(shouldRedirect);
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("userTokenTime")) {
            axios
                .get("http://127.0.0.1:3333/api/videoList", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("userTokenTime")).token,
                    },
                })
                .then((res) => {
                    setVideoList(prev => [...prev, { ...res.data }]);
                });
        }
    });
    console.log(videoList)
    if (redirect) return <Redirect to="/signIn" />;
    const videos = videoList.map((video) => {

        return (
            <div
                className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
                key={video._id}
            >
                <Link to={"/video/" + video.upload_title}>
                    <div className="video-thumbnail">
                        <img src={video.thumbnail_path} alt="video thubmnail" />
                    </div>
                </Link>
                <span className="username">
                    <Link to={"/api/videos/" + video.upload_title}>
                        {video.uploader_name}
                    </Link>
                </span>
                <span className="video-title">
                    {video.upload_title.replace(/_/g, " ")}
                </span>
            </div>
        );
    });

    return (
        <React.Fragment>
            <Navbar />
            <div className="container mt-5">
                <h4>Videos</h4>
                <hr className="my-4" />

                <div className="streams row">{videos}</div>
            </div>
        </React.Fragment>
    );
});

export default dashboard;
