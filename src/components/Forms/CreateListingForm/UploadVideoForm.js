import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../UIComponents";
var Translate = require('react-redux-i18n').Translate;
var I18n = require('react-redux-i18n').I18n;

class UploadVideoForm extends React.Component {
  render = () => {
    const { data, videoUrl, onChange, onRemove } = this.props;

    return (
      <div className="container">
        {this.renderNote()}
        {this.renderVideoInput(onChange)}
        {this.renderUploadBtn()}
        {data || videoUrl
          ? this.renderVideoShow(data, videoUrl, onChange, onRemove)
          : null}
      </div>
    );
  };

  triggerClickFileInput = e => {
    this.fileInput.click();
  };

  renderNote = () => (
    <div className="mt-4 mb-2 main-color video-hint">
      <strong><Translate value="create_listing.video_text" /></strong>.
    </div>
  );

  renderVideoInput = onChange => (
    <input
      type="file"
      accept="video/*"
      className="upload-file"
      onChange={e => onChange(e.target.files[0])}
      ref={fileInput => (this.fileInput = fileInput)}
    />
  );

  renderUploadBtn = () => (
    <Button
      title={I18n.t("create_listing.add_video")}
      outline={true}
      onClick={this.triggerClickFileInput}
      icon="fas fa-video"
      size="lg"
    />
  );

  renderVideoShow = (data, videoUrl, onChange, onRemove) => {
    const isUpload = videoUrl ? false : true;
    const videoName = videoUrl
      ? videoUrl.url
          .substring(videoUrl.url.lastIndexOf("/") + 1)
          .split("+")
          .join(" ")
      : null;
    return (
      <div className="container mt-2">
        <span className="video-name">{isUpload ? data.name : videoName}</span>
        <Button
          outline={true}
          size="sm"
          onClick={isUpload ? e => onChange(null) : e => onRemove(videoUrl)}
          title={I18n.t("common.remove")}
          color="#ff0000"
          borderColor="danger"
        />
      </div>
    );
  };
}

UploadVideoForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default UploadVideoForm;
