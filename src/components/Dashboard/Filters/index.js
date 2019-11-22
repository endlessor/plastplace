import React, { Component } from "react";
import FilterItem from "./filterItem";
var Translate = require("react-redux-i18n").Translate;

const filterItems = ["country", "category", "condition", "following"];

class Filters extends Component {
  renderSwitch(itemListName) {
    switch (itemListName) {
      case "country":
        return this.props.filterMenus.countries;
      case "category":
        return this.props.filterMenus.categories;
      case "condition":
        return this.props.filterMenus.conditions;
      case "following":
        return this.props.filterMenus.followings;
      default:
        return null;
    }
  }

  isUnselectedFilters = () => {
    const { filterStatus } = this.props;
    return (
      filterStatus[filterItems[0]].length === 0 &&
      filterStatus[filterItems[1]].length === 0 &&
      filterStatus[filterItems[2]].length === 0 &&
      filterStatus[filterItems[3]].length === 0
    );
  };

  render = () => {
    return (
      <div className="filter">
        <div className="content-center">
          <div className="filter-bar">
            <div className="filter-inner">
              {this.renderFilterLabel()}
              {filterItems.map((item, i) => {
                const itemList = this.renderSwitch(item);
                return (
                  <FilterItem
                    key={`${item}${i}`}
                    itemList={itemList && itemList !== null ? itemList : null}
                    itemName={item}
                    onSelect={this.props.onSelect(item)}
                    onReset={() => this.props.onReset(item)}
                    onApply={() => this.props.onApply(item)}
                    filterStatus={this.props.filterStatus[item]}
                  />
                );
              })}
            </div>
            {!this.isUnselectedFilters() && (
              <div className="filter-inner">
                <span
                  className="filter-main-title"
                  onClick={this.props.onResetAll}
                >
                  <Translate value="filter.clear_filters" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderFilterLabel = () => (
    <div className="filter-main-title">
      <span className="icon">
        <i className="fas fa-sliders-h"></i>
      </span>
      <Translate value="filter.filters" />
    </div>
  );
}

export default Filters;
