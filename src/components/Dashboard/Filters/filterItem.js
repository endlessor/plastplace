import React, { Component } from "react";
import FilterBody from "./filterBody";
var Translate = require("react-redux-i18n").Translate;
const noneText = {
  country: "There is no country list",
  condition: "There is no condition list",
  category: "There is no category list",
  following: "You don't have any following users"
}
class FilterItem extends Component {
  render = () => (
    <div
      className="filter-item"
      onMouseOver={e => this.showBody(true)}
      onMouseLeave={e => this.showBody(false)}
    >
      {this.renderFilterHeader()}
      {this.renderFilterBody()}
    </div>
  );

  renderFilterHeader = () => (
    <div className="filter-item-header">
      <Translate value={`filter.${this.props.itemName}`} />
      {this.props.filterStatus && this.props.filterStatus.length > 0 ? (
        <span className="count">
          &nbsp;{`(${this.props.filterStatus.length})`}
        </span>
      ) : (
        <span className="count"></span>
      )}
      <div className="caret"></div>
    </div>
  );

  renderFilterBody = () => {
    return this.props.itemList !== null ? (
      <FilterBody
        itemList={this.props.itemList}
        itemName={this.props.itemName}
        onSelect={this.props.onSelect}
        onReset={this.props.onReset}
        onApply={this.props.onApply}
        filterStatus={this.props.filterStatus}
        onBodyRef={bodyRef => {
          this.handleBodyRef(bodyRef);
        }}
        hideBody={() => this.showBody(false)}
        none={false}
      />
    ) : (
      <FilterBody
        onBodyRef={bodyRef => {
          this.handleBodyRef(bodyRef);
        }}
        hideBody={() => this.showBody(false)}
        none={true}
        noneText={noneText[this.props.itemName]}
      />
    );
  };

  showBody = isShown => {
    if (this.bodyRef) {
      if (isShown) this.bodyRef.style.display = "block";
      else this.bodyRef.style.display = "none";
    }
  };

  handleBodyRef = bodyRef => {
    this.bodyRef = bodyRef;
  };
}

export default FilterItem;
