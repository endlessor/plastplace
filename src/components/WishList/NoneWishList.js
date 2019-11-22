import React from "react";
import { Link } from "react-router-dom";
import NoneWishImage from "../../assets/img/svg/none-wish.svg"

const NoneWishList = () => (
  <div className="wrapper-margin">
    <div className="wishlist-notification">
      <h3 className="wishlist-notification-title">Saved Offers</h3>
      <div className="wishlist-inner">
        <img src={NoneWishImage} alt="" />
        <div className="text">You haven't saved any offer yet</div>
        <div className="action-blc">
          <Link className="button button-primary" to="/">
            View Offers
          </Link>
        </div>
      </div>
    </div>
  </div>
);
export default NoneWishList;
