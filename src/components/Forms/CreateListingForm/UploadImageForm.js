import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../UIComponents";
var I18n = require('react-redux-i18n').I18n;

class UploadImageForm extends React.Component {
  render = () => {
    const { data, onRemove, onRef, imageUrls, onRemoveUrl } = this.props;
    const mainImageUrl = imageUrls ? imageUrls[0] : null;
    let otherImageUrls = [];
    if (imageUrls) {
      for (let i = 1; i < imageUrls.length; i++) {
        otherImageUrls.push(imageUrls[i]);
      }
    }

    return (
      <div className="container" ref={onRef("images")}>
        <input
          type="file"
          accept="image/*"
          className="upload-file"
          onChange={e => this.onAddImageFile(e, true)}
          ref={fileInput => (this.mainImageInput = fileInput)}
        />
        {data[0] || mainImageUrl
          ? this.renderMainImage(data[0], mainImageUrl, onRemove, onRemoveUrl)
          : this.renderAddMainImage()}
        {data || otherImageUrls
          ? this.renderImageList(data, otherImageUrls, onRemove, onRemoveUrl)
          : null}
        <input
          type="file"
          accept="image/*"
          className="upload-file"
          onChange={this.onAddImageFile}
          ref={fileInput => (this.imageInput = fileInput)}
        />
      </div>
    );
  };

  triggerImageInput = e => {
    this.imageInput.click();
  };

  triggerMainImageInput = e => {
    this.mainImageInput.click();
  };

  onAddImageFile = (e, flag) => {
    const { onAdd } = this.props;
    if (e.target.files[0]) onAdd(e.target.files[0], flag);
  };

  renderAddMainImage = () => (
    <div className="container main-image-container">
      <Button
        outline={true}
        onClick={this.triggerMainImageInput}
        title={I18n.t("create_listing.add_image")}
        icon="fas fa-image"
        size="lg"
      />
    </div>
  );

  renderMainImage = (image, mainImageUrl, onRemove, onRemoveUrl) => {
    return (
      <div className="container view hover zoom main-image-container mt-2">
        <img
          width="400px"
          height="400px"
          src={image ? window.URL.createObjectURL(image) : mainImageUrl.url}
          className="main-image"
          alt=""
        />
        <div className="main-image-overlay">
          <Button
            outline={true}
            size="sm"
            onClick={this.triggerMainImageInput}
            title={I18n.t("common.change")}
            color="#ff0000"
            borderColor="danger"
          />
          <Button
            outline={true}
            size="sm"
            onClick={
              image ? e => onRemove(0) : e => onRemoveUrl(mainImageUrl.id)
            }
            title={I18n.t("common.remove")}
            color="#ff0000"
            borderColor="danger"
          />
        </div>
      </div>
    );
  };

  renderImageList = (data, otherImageUrls, onRemove, onRemoveUrl) => (
    <div className="container mt-4">
      <div className="row">
        {otherImageUrls.map((item, index) => (
          <div key={index} className="m-2 additional-image-container">
            {item.url ? (
              <img
                src={item.url}
                className="w-100 h-100 addition-image"
                alt=""
              />
            ) : null}
            <div className="image-overlay">
              <Button
                outline={true}
                size="sm"
                onClick={e => onRemoveUrl(item.id)}
                title={I18n.t("common.remove")}
                color="#ff0000"
                borderColor="danger"
              />
            </div>
          </div>
        ))}
        {data.map((image, index) =>
          index > 0 ? (
            <div key={index} className="m-2 additional-image-container">
              <img
                src={window.URL.createObjectURL(image)}
                className="w-100 h-100 addition-image"
                alt=""
              />
              <div className="image-overlay">
                <Button
                  outline={true}
                  size="sm"
                  onClick={e => onRemove(index)}
                  title={I18n.t("common.remove")}
                  color="#ff0000"
                  borderColor="danger"
                />
              </div>
            </div>
          ) : null
        )}
        {this.renderAddNewBtn(data, otherImageUrls)}
      </div>
    </div>
  );

  renderAddNewBtn = (data, otherImageUrls) => {
    let flag = data.length > 0 ? true : false;
    flag |= otherImageUrls.length > 0 ? true : false;

    return flag ? (
      <div className="m-2 additional-image-container">
        <Button
          outline={true}
          onClick={this.triggerImageInput}
          title={I18n.t("create_listing.add_new")}
          icon="fas fa-image"
        />
      </div>
    ) : null;
  };
}

UploadImageForm.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRef: PropTypes.func
};

export default UploadImageForm;
