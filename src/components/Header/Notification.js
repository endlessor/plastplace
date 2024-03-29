import React, { Component } from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

export default class Notification extends Component {
  render() {
    const { notificationList } = this.props;

    return (
      <ul className="notifications-dropdown">
        {notificationList && notificationList.length > 0 ? (
          <React.Fragment>
            <div className="notifications-list">
              {this.renderNotificationList(notificationList)}
            </div>
            <Link className="all-notifications" to="/notifications">
              View all notifications
            </Link>
          </React.Fragment>
        ) : (
          this.renderNone()
        )}
      </ul>
    );
  }

  renderNotificationList = list =>
    list.map((item, index) => {
      let actorName = "";
      if (item.Actor) {
        actorName = item.Actor.first_name + " " + item.Actor.last_name + " ";
      }
      let clientTime = new Date(item.createdAt).toLocaleString(
        "en-US",
        new Date().getTimezoneOffset()
      );

      return item.Actor ? (
        <Link key={index} to={item.link ? item.link : ""}>
          <li
            className="notification-item"
            onClick={e =>
              this.props.onClickItem("READ", item.UserNotificationId)
            }
          >
            <span className="notification-avatar">
              {item.Actor.avatar && item.Actor.avatar !== "" ? (
                <img className="avatar" src={item.Actor.avatar} alt="" />
              ) : (
                <div className="avatar" style={{ background: "grey" }}>
                  {item.Actor.first_name.charAt(0).toUpperCase() +
                    item.Actor.last_name.charAt(0).toUpperCase()}
                </div>
              )}
            </span>
            <span className="noitification-text">
              <span className="link-text">{actorName}</span>
              {item.content}
              <br />
              <span className="notification-date">
                {clientTime}
                {!item.read ? (
                  <span style={{ color: "red", paddingLeft: "15em" }}>New</span>
                ) : null}
              </span>
            </span>
            <div
              className="notification-close"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                this.props.onClickItem("DEL", item.UserNotificationId);
              }}
            >
              <i className="fas fa-times" />
            </div>
          </li>
        </Link>
      ) : null;
    });

  renderNone = () => (
    <li>
      <Translate value="navigation_menu.none_notification" />
    </li>
  );
}
