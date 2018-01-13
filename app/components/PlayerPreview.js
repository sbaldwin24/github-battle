import React from "react";
import PropTypes from "prop-types";

function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img
          alt={`Avatar for ${props.username}`}
          className="avatar"
          src={props.avatar}
        />
        <h2 className="username">@{props.username}</h2>
        {props.children}
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default PlayerPreview;
