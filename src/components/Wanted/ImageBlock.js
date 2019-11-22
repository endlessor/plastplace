import React from "react";
import WantedImage from "../../assets/img/svg/wanted-img.svg";

const ImageBlock = () => (
  <div className="img-blc">
    <p className="img-blc-title">Looking for Material?</p>
    <img src={WantedImage} alt="" />
    <p className="img-blc-header">Be the first to know when it’s posted</p>
    <p className="img-blc-description">
      Add material you’re looking for to your Wanted List to receive instant
      notification and email when it’s posted on PlastPlace
    </p>
  </div>
);

export default ImageBlock;
