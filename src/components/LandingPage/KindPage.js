import React from "react";
import GreenLogo from "../../assets/img/landing/PlastPlace_Logo_green.svg";
import Filter from "../../assets/img/landing/filter.svg";
import Gear from "../../assets/img/landing/gear.svg";
import Entsoger from "../../assets/img/landing/entsoger.svg";
import Produzent from "../../assets/img/landing/produzent.svg";
import Recycler from "../../assets/img/landing/recycler.svg";
var Translate = require('react-redux-i18n').Translate;

class KindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: GreenLogo,
      title: null,
      recActive: false,
      verActive: false,
      entActive: false,
      proActive: false,
      sorActive: false
    };
  }

  showImage = activeName => {
    const state = this.state;
    state.recActive = false;
    state.verActive = false;
    state.entActive = false;
    state.proActive = false;
    state.sorActive = false;
    state[activeName] = true;
    this.setState(state);
  };

  render() {
    const {
      recActive,
      verActive,
      entActive,
      proActive,
      sorActive
    } = this.state;
    return (
      <div className="landing-main">
        <span
          className={`rec-deactive ${recActive && "rec-active"}`}
          onMouseEnter={() => this.showImage("recActive")}
        >
          <Translate value="landing.kind_recycle" />
        </span>
        <span
          className={`ver-deactive ${verActive && "rec-active"}`}
          onMouseEnter={() => this.showImage("verActive")}
        >
          <Translate value="landing.kind_processors" />
        </span>
        <span
          className={`ent-deactive ${entActive && "ent-active"}`}
          onMouseEnter={() => this.showImage("entActive")}
        >
          <Translate value="landing.kind_disposers" />
        </span>
        <span
          className={`pro-deactive ${proActive && "pro-active"}`}
          onMouseEnter={() => this.showImage("proActive")}
        >
          <Translate value="landing.kind_producers" />
        </span>
        <span
          className={`sor-deactive ${sorActive && "pro-active"}`}
          onMouseEnter={() => this.showImage("sorActive")}
        >
          <Translate value="landing.kind_sorters" />
        </span>
        <img
          className={`kind-logo-img ${!recActive &&
            !verActive &&
            !entActive &&
            !proActive &&
            !sorActive &&
            "show-image"}`}
          src={GreenLogo}
          alt=""
        />
        <img
          className={`landing-image ${recActive && "show-image"}`}
          src={Recycler}
          alt=""
        />
        <img
          className={`landing-image ${verActive && "show-image"}`}
          src={Gear}
          alt=""
        />
        <img
          className={`landing-image ${entActive && "show-image"}`}
          src={Entsoger}
          alt=""
        />
        <img
          className={`landing-image ${proActive && "show-image"}`}
          src={Produzent}
          alt=""
        />
        <img
          className={`landing-image ${sorActive && "show-image"}`}
          src={Filter}
          alt=""
        />
      </div>
    );
  }
}

export default KindPage;
