import React from "react";
import PropTypes from "prop-types";

import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdbreact";

const BidderListModal = props => {
  return (
    <MDBModal
      isOpen={props.isOpen}
      toggle={props.toggle}
      contentClassName="rounded-lg"
      centered
    >
      <MDBModalHeader toggle={props.toggle}>Bidders</MDBModalHeader>
      <MDBModalBody>
        {renderTable(props.bidders, props.listingCurrency)}
      </MDBModalBody>
    </MDBModal>
  );
};

const renderTable = (bidders, currency) => (
  <MDBTable hover>
    {renderTableHead(currency)}
    {renderTableBody(bidders)}
  </MDBTable>
);

const renderTableHead = currency => (
  <MDBTableHead color="primary-color" textWhite>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Country</th>
      <th>{`Price(${currency})`}</th>
      <th>Bidded at</th>
    </tr>
  </MDBTableHead>
);

const renderTableBody = items => (
  <MDBTableBody>
    {items.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{`${item.User.first_name} ${item.User.last_name}`}</td>
        <td>{item.User.Company.Country.name}</td>
        <td>{item.price}</td>
        <td>{new Date(item.createdAt).toLocaleString()}</td>
      </tr>
    ))}
  </MDBTableBody>
);

BidderListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default BidderListModal;
