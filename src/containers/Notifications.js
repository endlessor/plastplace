import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import {
  getNewNotificationList,
  sendReadNotification,
  deleteNotification
} from "../actions/notification";

class Notifications extends Component {
  componentDidMount = async () => {
    if (this.props.notificationList && this.props.notificationList.length === 0)
      await this.props.getNewNotificationList("all");
  };

  render() {
    const list = this.props.notificationList;

    return (
      <div className="wrapper-margin">
        <div className="notifications-block">
          <div className="notifications-header">Notifications</div>
          <div className="notifications-body">
            {list.map((item, index) => {
              let actorName = "";
              if (item.Actor) {
                actorName =
                  item.Actor.first_name + " " + item.Actor.last_name + " ";
              }
              let clientTime = new Date(item.createdAt).toLocaleString(
                "en-US",
                new Date().getTimezoneOffset()
              );

              return (
                <div
                  key={index}
                  className="notifications-item"
                  onClick={e =>
                    this.handleClickRead(item.UserNotificationId, item.link)
                  }
                >
                  <div className="row">
                    <Link className="col-sm-12 col-md-3" to="#">
                      <span className="image-profile">
                        {item.Actor.avatar && item.Actor.avatar !== "" ? (
                          <img
                            className="avatar"
                            src={item.Actor.avatar}
                            alt=""
                          />
                        ) : (
                          <div
                            className="avatar"
                            style={{ background: "grey" }}
                          >
                            {item.Actor.first_name.charAt(0).toUpperCase() +
                              item.Actor.last_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </span>
                      <span className="name-span">{actorName}</span>
                    </Link>
                    <span className="col-sm-12 col-md-5 action-word">
                      {item.content}
                    </span>
                    {!item.read ? (
                      <span
                        className="col-sm-12 col-md-1"
                        style={{ color: "red", textAlign: "center" }}
                      >
                        New
                      </span>
                    ) : (
                      <span className="col-sm-12 col-md-1" />
                    )}
                    <span className="col-sm-12 col-md-2 timeline-badge">
                      {clientTime}
                    </span>
                    <div
                      className="col-sm-12 col-md-1 notifications-remove"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        this.handleClick("DEL", item.UserNotificationId);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  handleClick = async (name, id) => {
    try {
      await this.props.deleteNotification(id);
    } catch (err) {
      console.log(err);
    }
  };
  handleClickRead = async (id, link) => {
    try {
      await this.props.sendReadNotification(id);
    } catch (err) {
      console.log(err);
    }
    this.props.history.push(link);
  };
}
const mapStateToProps = state => ({
  notificationList: state.notification.notificationList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getNewNotificationList,
      sendReadNotification,
      deleteNotification
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
