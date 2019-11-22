import React from "react";

import { Button } from "../../UIComponents";
var I18n = require('react-redux-i18n').I18n;

class UploadPDF extends React.Component {
  render = () => {
    const { data, pdfUrl, onChange, onRemove } = this.props;

    return (
      <div className="container mt-4">
        {this.renderPDFInput(onChange)}
        {this.renderUploadBtn()}
        {data || pdfUrl
          ? this.renderPDFShow(data, pdfUrl, onChange, onRemove)
          : null}
      </div>
    );
  };

  triggerClickFileInput = e => {
    this.fileInput.click();
  };

  renderPDFInput = onChange => (
    <input
      type="file"
      accept="pdf/*"
      className="upload-file"
      onChange={e => onChange(e.target.files[0])}
      ref={fileInput => (this.fileInput = fileInput)}
    />
  );

  renderUploadBtn = () => (
    <Button
      title={I18n.t("create_listing.add_pdf")}
      outline={true}
      onClick={this.triggerClickFileInput}
      icon="far fa-file-pdf"
      size="lg"
    />
  );

  renderPDFShow = (data, pdfUrl, onChange, onRemove) => {
    const isUpload = pdfUrl ? false : true;
    const pdfName = pdfUrl
      ? pdfUrl.url
          .substring(pdfUrl.url.lastIndexOf("/") + 1)
          .split("+")
          .join(" ")
      : null;
    return (
      <div className="container mt-2">
        <span className="video-name">{isUpload ? data.name : pdfName}</span>
        <Button
          outline={true}
          size="sm"
          onClick={isUpload ? e => onChange(null) : e => onRemove(pdfUrl)}
          title={I18n.t("common.remove")}
          color="#ff0000"
          borderColor="danger"
        />
      </div>
    );
  };
}

export default UploadPDF;
