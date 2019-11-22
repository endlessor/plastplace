import React, { Component } from "react";
var Translate = require("react-redux-i18n").Translate;

export default class Country extends Component {
  constructor() {
    super();
    this.inputElement = [];
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      displayDropdown: false
    };
  }

  handleInputClick = () => {
    if (!this.state.displayDropdown) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      displayDropdown: !prevState.displayDropdown
    }));
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleInputClick();
  };

  render = () => {
    const data = this.props.data.country;
    const lists = this.props.listingProperties.countries.items;

    let countries = lists.map(item => {
      return { ...item, isSelected: false };
    });

    let countryList =
      data.length > 0
        ? data
        : [{ value: null, label: "All", isSelected: true }, ...countries];
    let labels = [];
    let values = [];

    data.map(item => {
      if (item.isSelected === true) {
        labels.push(item.label);
        values.push(item.value);
      }
      return true;
    });
    if (values.length === 0) labels = ["All"];

    return (
      <div className="row">
        <div className="input-field-block">
          <div className="form-group field-material-wanted">
            <div className="title-block">
              <label className="control-label">
                <Translate value="common.country" />
              </label>
              <div className="help-block"></div>
            </div>
            <div className="select-wrapper">
              <input
                className="select-dropdown"
                type="text"
                readOnly={true}
                required={true}
                onClick={this.handleInputClick}
                value={labels.join(", ")}
              />
              {this.renderCountryDropdown(countryList, values)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderCountryDropdown = (countryList, selectedValues) => {
    const style = this.state.displayDropdown
      ? this.props.dropdownStyle
      : { display: "none" };

    return (
      <ul
        className="dropdown-content select-dropdown multiple-select-dropdown country"
        tabIndex="0"
        style={style}
        ref={node => {
          if (node) this.node = node;
        }}
      >
        {countryList.map((item, index) => (
          <li key={index} onClick={e => this.handleClick(index)}>
            <span>
              <input
                type="checkbox"
                checked={item.isSelected}
                onChange={e =>
                  this.props.handleChange(
                    item.value,
                    e.target.checked,
                    selectedValues
                  )
                }
                ref={inputRef => {
                  if (inputRef) this.inputElement[index] = inputRef;
                }}
              />
              <span>{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  };
  handleClick = index => {
    this.inputElement[index].click();
  };
}
