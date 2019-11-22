import React from "react";
import PropTypes from "prop-types";
import { unitRates } from "../../utils/constants"

const Card = props => {
  let price;
  price = getPriceByCurrency(
    props.data.Currency.code,
    props.filterCurrency,
    props.data.pricePerUnit,
    { ...props.exchangeRates, EUR: 1.0 }
  );
  price = getPriceByUnit(props.data.unit, props.filterUnit, price, unitRates);
  return (
    <div
      className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2 mask zoom"
      onClick={e => props.history.push(`/product/${props.data.id}`)}
    >
      <div className="card">
        <div className="card-imgholder">
          <img className="card-images" src={props.data.image} alt=""></img>
        </div>
        <div className="card-info">
          <div className="card-info-header">
            <div className="card-name">{props.data.title}</div>
          </div>
          <div className="card-info-footer">
            <div className="card-price">
              <span
                ref={symbolRef => {
                  if (symbolRef)
                    symbolRef.innerHTML = getCurrencySymbol(
                      props.filterCurrency
                        ? props.filterCurrency
                        : props.data.Currency.code,
                      props.currencies
                    );
                }}
              ></span>
              {price}/{props.filterUnit ? props.filterUnit : props.data.unit}
            </div>
            <div className="card-location">{props.data.formatted_address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPriceByCurrency = (from, to, amount, rates) => {
  if (to === null || rates === null) return amount;
  return (amount / rates[from]) * rates[to];
};

const getPriceByUnit = (from, to, amount, rates) => {
  if (to === null || rates === null) return amount.toFixed(2);
  return (
    (amount * rates[from.toLowerCase()]) /
    rates[to.toLowerCase()]
  ).toFixed(2);
};

const getCurrencySymbol = (currencyCode, currencies) => {
  let symbol = null;
  if (currencies)
    currencies.forEach((currency, index) => {
      if (currency.code === currencyCode) {
        symbol = currency.symbol;
      }
    });

  return symbol;
};

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
