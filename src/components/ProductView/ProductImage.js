import React from "react";
import { Link } from "react-router-dom";

function ProductImage(props) {
  return (
    <div className={props.className}>
      <Link className="fancybox-link" to="#">
        <img
          width="100%"
          height="100%"
          src={props.imgLink}
          alt={props.imgAlt}
        />
      </Link>
    </div>
  );
}

export default ProductImage;
