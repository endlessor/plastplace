import React from "react";

import ProductViewHeader from "./ProductViewHeader";
import ProductViewInfo from "./ProductViewInfo";
import UpgradPremium from "../Dashboard/UpgradePremium";

const ProductView = props => {
  return (
    <div className="product-view-inner">
      <ProductViewHeader
        productDetail={props.productDetail}
        onClick={props.onClick}
        wishCheck={props.wishCheck}
        onClickChat={props.onClickChat}
        onClickAuction={props.onClickAuction}
        userId={props.userId}
      />
      <ProductViewInfo
        productDetail={props.productDetail}
        sellerData={props.sellerData}
        onlineStatus={props.onlineStatus}
        onClickFollow={props.onClickFollow}
        userId={props.userId}
      />
      <UpgradPremium style={{display: 'none'}} />
    </div>
  );
};

export default ProductView;
