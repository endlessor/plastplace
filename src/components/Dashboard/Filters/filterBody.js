import React, { Component } from "react";
var Translate = require("react-redux-i18n").Translate;

class FilterBody extends Component {
  render = () => {
    return (
      <div
        className="filter-item-body"
        ref={bodyRef => {
          if (bodyRef) this.props.onBodyRef(bodyRef);
        }}
      >
        {!this.props.none ? (
          <React.Fragment>
            {this.renderList()}
            {this.renderFooter()}
          </React.Fragment>
        ) : (
          this.renderNoneFollowings()
        )}
      </div>
    );
  };
  renderNoneFollowings = () => (
    <div className="filter-body-none">
      <i className="icon fas fa-exclamation-circle" />
      <h4>{this.props.noneText}</h4>
    </div>
  );

  renderList = () => (
    <ul className="custom-list">
      <div className="custom-list-box">{this.renderItemList()}</div>
    </ul>
  );

  renderItemList = () => {
    if (!this.props.itemList) return null;
    if (this.props.itemList.type === "tree") {
      let list = [];

      this.props.itemList.items.forEach(item => {
        list.push({ label: item.label, isHeader: true, isSubItem: false });
        item.items.forEach(itm => {
          list.push({
            value: itm.value,
            label: itm.label,
            isHeader: false,
            isSubItem: true
          });
        });
      });

      return this.renderDropdown(list);
    }

    if (this.props.itemList.type === "list") {
      let list = [];

      this.props.itemList.items.forEach(item =>
        list.push({
          value: item.value,
          label: item.label,
          isHeader: false,
          isSubItem: false
        })
      );

      return this.renderDropdown(list);
    }

    if (this.props.itemName === "following") {
      return this.renderFollowingsDropdown(this.props.itemList.followings);
    }
  };

  renderDropdown = items =>
    items ? (
      <div className="list-container">
        {items.map((unit, index) => {
          return (
            <li key={index}>
              {unit.isHeader ? (
                <span className="lever">{unit.label}</span>
              ) : (
                <label>
                  <input
                    type="checkbox"
                    className="browser-default"
                    value={unit.label}
                    checked={this.isChecked(unit.value)}
                    onChange={e =>
                      this.props.onSelect(unit.value, e.target.checked)
                    }
                  />
                  <span className="lever">{unit.label}</span>
                </label>
              )}
            </li>
          );
        })}
      </div>
    ) : null;

  renderFollowingsDropdown = items =>
    items ? (
      <div className="list-container">
        {items.map((unit, index) => {
          return (
            <li key={index}>
              <label>
                <div className="following-filter-item">
                  <input
                    type="checkbox"
                    className="browser-default"
                    value={unit.label}
                    checked={this.isChecked(unit.id)}
                    onChange={e =>
                      this.props.onSelect(unit.id, e.target.checked)
                    }
                  />
                  <span className="lever" />
                  {unit.avatar ? (
                    <img
                      className="following-filter-image"
                      src={unit.avatar}
                      alt=""
                    />
                  ) : (
                    <div
                      className="following-filter-avatar"
                      style={{ background: "grey" }}
                    >
                      {unit.first_name.charAt(0).toUpperCase() +
                        unit.last_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="following-filter-description">
                    <div className="following-filter-title">
                      {unit.first_name}&nbsp;{unit.last_name}
                    </div>
                    <div className="following-filter-location">
                      {unit.Company.formatted_address}
                    </div>
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </div>
    ) : null;

  isChecked = value => {
    return this.props.filterStatus.includes(value);
  };

  renderFooter = () => (
    <div className="custom-list-footer">{this.renderBtnReset()}</div>
  );

  renderBtnReset = () => (
    <div className="btns-group">
      <button
        className="button reset-btn"
        onClick={e => {
          this.props.onReset();
          this.props.hideBody();
        }}
      >
        <Translate value="filter.reset" />
      </button>
      <button
        type="submit"
        className="button button-primary"
        onClick={e => {
          this.props.onApply();
          this.props.hideBody();
        }}
      >
        <Translate value="filter.apply" />
      </button>
    </div>
  );
}

export default FilterBody;
