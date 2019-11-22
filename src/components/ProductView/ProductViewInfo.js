import React, { Component } from "react";
import { Link } from "react-router-dom";
import Star from "../../assets/img/svg/star-alt.svg";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class ProductViewInfo extends Component {
  render = () => {
    const  userInfo = this.props.sellerData;
    const  userId = this.props.userId;
    
    return userInfo ? (
      <div className="row product-view-info">
        {this.renderAdditionalInfo()}
        {this.renderSellerBlc(userInfo, userId)}
      </div>
    ): null;
  };

  renderAdditionalInfo = () => {
    const { productDetail } = this.props;
    const correctQty = productDetail.quantity + productDetail.unit;
    const charactors = {
      category: productDetail.Category.name,
      condition: productDetail.Condition.name,
      quantity: correctQty,
      supply: productDetail.supply,
      pricing_term: productDetail.PricingTerm.name,
      address: productDetail.address
    };
    const displayNames = {
      category: I18n.t("common.category"),
      condition: I18n.t("common.condition"),
      quantity: I18n.t("common.quantity"),
      supply: I18n.t("common.supply"),
      pricing_term: I18n.t("common.pricing_terms"),
      address: I18n.t("common.location")
    };

    return (
      <div className="col-sm-12 col-md-6 additional-info">
        <h4 className="info-title">
          <Translate value="product_detail.details" />
        </h4>
        {Object.keys(charactors).map((item, i) => (
          <div className="additional-info-item" key={item}>
            <span className="additional-info-item-title">
              {displayNames[item]}
            </span>
            <span className="additional-info-item-description">
              {charactors[item]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  renderSellerBlc = (userInfo, userId) => (
    <div className="col-sm-12 col-md-6 seller-blc">
      <h4 className="info-title">
        <Translate value="common.seller" />
      </h4>
      <div className="user-info">
        {this.renderUserInfoAvatar(userInfo)}
        {this.renderUserInfoFooter(userInfo, userId)}
      </div>
    </div>
  );

  renderUserInfoAvatar = userInfo => (
    <div className="user-info-avatar">
      <Link
        className={this.props.onlineStatus ? "online" : "offline"}
        to={`/profile/${userInfo.id}`}
      >
        {userInfo.avatar ? (
          <img
            className="colorful-placeholder s232"
            src={userInfo.avatar}
            alt=""
          />
        ) : (
          <div
            className="colorful-placeholder s232"
            style={{ background: "grey" }}
          >
            {userInfo.first_name.charAt(0).toUpperCase() +
              userInfo.last_name.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>
      {this.renderUserInfoNameBlc(userInfo)}
    </div>
  );

  renderUserInfoNameBlc = userInfo => {
    return (
      <div className="user-info-name-blc">
        <div className="user-info-name">
          {userInfo.first_name}&nbsp;{userInfo.last_name}
        </div>
        <div className="location">
          <p className="company-name">{userInfo.Company.name}</p>
          <p className="country-name">
            {userInfo.Company.Country ? userInfo.Company.Country.name : null}
          </p>
          {userInfo.type === "PREMIUM" ? this.renderPremium() : null}
        </div>
      </div>
    );
  };

  renderPremium = () => (
    <div className="premium">
      <span className="icon">
        <img src={Star} width="19px" height="18px" alt="" />
      </span>
      <Translate value="product_detail.premium_member" />
    </div>
  );

  renderUserInfoFooter = (userInfo, userId) => (
    <div className="user-info-footer">
      {userInfo && userInfo.id !== userId ? (
        <Link
          className="button button-primary follow"
          onClick={this.props.onClickFollow}
          to="#"
        >
          {!userInfo.follow ? (
            <Translate value="common.follow" />
          ) : (
            <Translate value="common.unfollow" />
          )}
        </Link>
      ) : null}

      <Link
        className="button button-outline-primary follow"
        to={`/profile/${userInfo.id}`}
      >
        <Translate value="product_detail.view_profile" />
      </Link>
    </div>
  );
}

export default ProductViewInfo;
