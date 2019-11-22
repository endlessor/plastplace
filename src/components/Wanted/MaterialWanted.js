import React, { Component } from "react";

export default class MaterialWanted extends Component {
  render = () => (
    <div className="row">
      <div className="input-field-block">
        <div className="form-group field-material-wanted">
          <div className="title-block">
            <label className="control-label">Material wanted</label>
            {this.props.data.name || this.props.data.name === null ? null : (
              <div className="help-block">Wanted Material cannot be blank</div>
            )}
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter..."
            aria-required="true"
            value={this.props.data.name === null ? "" : this.props.data.name}
            onChange={e => this.props.onChange("name", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
