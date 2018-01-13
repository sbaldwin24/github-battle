var React = require("react");
var assign = require("domkit/appendVendorPrefix");
var insertKeyframesRule = require("domkit/insertKeyframesRule");
import PropTypes from "prop-types";

/**
 * @type {Object}
 */
var keyframes = {
  "0%": {
    transform: "rotate(0deg)"
  },
  "50%": {
    transform: "rotate(180deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

class Loader extends React.Component {
  /**
   * @return {Object}
   */
  getBallStyle() {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      margin: this.props.margin,
      borderRadius: "100%",
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
   * @param  {Number} i
   * @return {Object}
   */
  getAnimationStyle(i) {
    var animation = [
      animationName,
      "1s",
      "0s",
      "infinite",
      "cubic-bezier(.7,-.13,.22,.86)"
    ].join(" ");

    var animationFillMode = "both";

    return {
      animation: animation,
      animationFillMode: animationFillMode
    };
  }

  /**
   * @param {Number}
   * @return {Object}
   */
  getStyle(i) {
    if (i) {
      return assign(this.getBallStyle(i), {
        opacity: "0.8",
        position: "absolute",
        top: 0,
        left: i % 2 ? -28 : 25
      });
    }

    return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
      display: "inline-block",
      position: "relative"
    });
  }

  /**
   * @param  {Boolean} loading
   * @return {ReactComponent || null}
   */
  renderLoader(loading) {
    if (loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle()}>
            <div style={this.getStyle(1)} />
            <div style={this.getStyle(2)} />
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return this.renderLoader(this.props.loading);
  }
}

Loader.defaultPropsTypes = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
};

Loader.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  size: PropTypes.string
};

export default Loader;
