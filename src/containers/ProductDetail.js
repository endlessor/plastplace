import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProductView from "../components/ProductView";
import ProductsSlider from "../components/ProductsSlider";
import LoadingCard from "../components/LoadingCard";
import {
  getListing,
  getListingsByUserId,
  getListingsByCategoryId,
  setListingsData,
  getExchangeRates,
  sendWishStatus,
  getListingsByWishList
} from "../actions/listing";
import {
  getUserProfile,
  changeFollowStatus,
  getFollowings
} from "../actions/user";
import SendMessageModal from "../components/Modals/SendMessageModal";
import { addContact } from "../actions/message";
import { sendGetOnlineStatusRequest } from "../utils/socket";
import { bidAuction, getAuction } from "../actions/buyer";
import AuctionModal from "../components/Modals/AuctionModal";
import FollowModal from "../components/Modals/FollowModal";

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      isWish: false,
      loadingData: false,
      listingData: null,
      sellerData: null,
      sellerListingsData: null,
      similarListingsData: null,
      isSendMessageModalOpen: false,
      isAuctionModalOpen: false,
      isFollowModalOpen: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.loadListingData(id);
  }

  componentWillUnmount = () => {
    clearInterval(this.getOnlineStatusTimer);
  };

  getOpponentOnlineStatus = opponentId => {
    sendGetOnlineStatusRequest({ opponentId });
  };

  loadListingData = async id => {
    try {
      this.props.getExchangeRates();

      this.setState({ loadingData: true });
      const listingData = await this.props.getListing(id);

      if (listingData.isAuction)
        await this.props.getAuction({ ListingId: listingData.id });

      this.getOnlineStatus = () =>
        this.getOpponentOnlineStatus(listingData.UserId);
      this.getOnlineStatusTimer = setInterval(this.getOnlineStatus, 3000);

      const sellerData = await this.props.getUserProfile(listingData.UserId);
      const sellerListingsData = await this.props.getListingsByUserId({
        userId: listingData.UserId,
        productIdSelected: id
      });
      const similarListingsData = await this.props.getListingsByCategoryId({
        categoryId: listingData.CategoryId,
        productIdSelected: id
      });

      this.setState({
        listingData,
        sellerData,
        loadingData: false,
        sellerListingsData,
        similarListingsData,
        isWish: listingData.isWish
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };

  toggleModal = async name => {
    if (!this.state[name] && name === "isAuctionModalOpen")
      await this.props.getAuction({ ListingId: this.state.listingData.id });

    if (!this.state[name] && name === "isFollowModalOpen")
      await this.props
        .changeFollowStatus(this.state.sellerData.id)
        .then(res => {
          let sellerData = { ...this.state.sellerData };
          sellerData.follow = res.follow;
          this.props.getFollowings(this.props.userId, "all");
          this.setState({ sellerData });
        });

    this.setState({
      [name]: !this.state[name]
    });
  };

  sendMessage = async message => {
    if (this.state.listingData && this.state.sellerData) {
      await this.props.addContact({
        ListingId: this.state.listingData.id,
        SellerId: this.state.sellerData.id,
        content: message
      });
      this.toggleModal();
      this.props.history.push("/messages");
    }
  };

  render() {
    const {
      loadingData,
      listingData,
      sellerData,
      sellerListingsData,
      similarListingsData
    } = this.state;
    if (!listingData && !loadingData) return null;

    return (
      <div className="wrapper-margin">
        <div className="product-view">
          {loadingData && <LoadingCard />}
          {!loadingData && (
            <React.Fragment>
              <ProductView
                productDetail={listingData}
                sellerData={sellerData}
                onClick={this.onWishList}
                wishCheck={this.state.isWish}
                onClickChat={e => this.toggleModal("isSendMessageModalOpen")}
                onlineStatus={this.props.onlineStatus}
                onClickAuction={e => this.toggleModal("isAuctionModalOpen")}
                userId={this.props.userId}
                onClickFollow={e => this.toggleModal("isFollowModalOpen")}
              />
              <ProductsSlider
                productList={sellerListingsData}
                userName={sellerData.first_name}
                history={this.props.history}
                setListingsData={this.props.setListingsData}
                loadListingData={this.loadListingData}
              />
              <ProductsSlider
                productList={similarListingsData}
                history={this.props.history}
                setListingsData={this.props.setListingsData}
                loadListingData={this.loadListingData}
              />
            </React.Fragment>
          )}
          <SendMessageModal
            isOpen={this.state.isSendMessageModalOpen}
            toggle={() => this.toggleModal("isSendMessageModalOpen")}
            sellerName={
              sellerData
                ? sellerData.first_name + " " + sellerData.last_name
                : null
            }
            sendMessage={this.sendMessage}
          />
          <FollowModal
            isOpen={this.state.isFollowModalOpen}
            toggle={() => this.toggleModal("isFollowModalOpen")}
            sellerData={this.state.sellerData}
          />
          {this.props.currentAuction && (
            <AuctionModal
              isOpen={this.state.isAuctionModalOpen}
              toggle={() => this.toggleModal("isAuctionModalOpen")}
              bidAuction={this.bidAuction}
              initialPrice={
                this.state.listingData
                  ? this.state.listingData.pricePerUnit
                  : null
              }
              data={this.props.currentAuction}
              isMyListing={
                this.state.listingData
                  ? this.state.listingData.UserId === this.props.userId
                  : true
              }
              usdPrice={this.getUSDPrice()}
            />
          )}
        </div>
      </div>
    );
  }

  getUSDPrice = () => {
    if (!this.state.listingData || !this.props.exchangeRates) return 0;
    if (this.state.listingData.Country.Currency.code === "EUR")
      return (
        this.props.currentAuction.highestPrice * this.props.exchangeRates["USD"]
      );
    return (
      (this.props.currentAuction.highestPrice *
        this.props.exchangeRates["USD"]) /
      this.props.exchangeRates[this.state.listingData.Country.Currency.code]
    );
  };

  onWishList = e => {
    this.props.sendWishStatus(this.props.match.params.id).then(res => {
      this.props.getListingsByWishList();

      this.setState({
        isWish: res.isWish
      });
    });
  };

  bidAuction = price => {
    this.props.bidAuction({ ListingId: this.state.listingData.id, price });
  };
}

const mapStateToProps = state => ({
  onlineStatus: state.message.currentOpponentOnlineStatus,
  currentAuction: state.buyer.currentAuction,
  userId: state.user.currentUser ? state.user.currentUser.id : -1,
  exchangeRates: state.listing.exchangeRates
});

// import action here and send to props
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListing,
      getUserProfile,
      getListingsByUserId,
      getListingsByCategoryId,
      setListingsData,
      getExchangeRates,
      addContact,
      bidAuction,
      getAuction,
      sendWishStatus,
      changeFollowStatus,
      getFollowings,
      getListingsByWishList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
