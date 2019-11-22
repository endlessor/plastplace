import React, { Component } from "react";
import { Link } from "react-router-dom";

import Notification from "./Notification";
var Translate = require("react-redux-i18n").Translate;

const navListItems = [
  {
    class: "",
    name: "sell",
    link: "/product/create",
    image: require("../../assets/img/svg/barter.svg"),
    addItem: false
  },
  {
    class: "",
    name: "wanted",
    link: "/wanted",
    image: require("../../assets/img/svg/add-to-cart.svg"),
    addItem: false
  },
  {
    class: "notifications-main-list",
    name: "notification",
    link: "#",
    image: require("../../assets/img/svg/notification-bell.svg"),
    addItem: true
  },
  {
    class: "",
    name: "messages",
    link: "/messages",
    image: require("../../assets/img/svg/messages.svg"),
    addItem: false
  }
];

class NavigationList extends Component {
  render = () => {
    return (
      <ul className="navigation-list">
        {navListItems.map((unit, index) => this.renderNavListItem(unit, index))}
      </ul>
    );
  };

  renderNavListItem = (item, index) => (
    <li className={item.class} key={`${index}${item.name}`}>
      <Link to={item.link} onClick={this.props.onClick}>
        <i className="sell-icon">
          <img width="27" height="27" src={item.image} alt="" />
          {this.renderCount(item)}
        </i>
        <span>
          <Translate value={`navigation_menu.${item.name}`} />
        </span>
      </Link>
      {item.addItem ? this.renderNotificationDropdownList() : null}
    </li>
  );

  renderNotificationDropdownList = () => (
    <Notification
      notificationList={this.props.notificationList}
      onClickItem={this.props.onClickItem}
    />
  );

  renderCount = item => {
    if (
      window.location.pathname !== "/messages" &&
      item.name === "messages" &&
      this.props.messages.length > 0
    )
      return (
        <span className="messages-count">{this.props.messages.length}</span>
      );

    if (item.name === "notification" && this.props.unreadCount > 0)
      return <span className="messages-count">{this.props.unreadCount}</span>;

    return null;
  };
}

export default NavigationList;
