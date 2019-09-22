import React, { PureComponent, Component } from 'react';
import Hand from './Hand';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgDeck: [],
      playingDeck: [],
      deckCount: 50,
      playerHand: [],
      dealerHand: [],
      playerSum: 0,
      dealerSum: 0,
      loaded: false,
      handKey: 0,
    };
  }

  componentDidMount() {
    //fetch once and store 52 card deck
    this.getDeck()
      .then(data => {
        this.initHands(data.cards, data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  getDeck = async () => {
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
    let data = await response.json();
    return data;
  }

  initHands = (cards, deck) => {
    const cards = [...cards];
    const dealerCard = [cards.pop()];
    const playerCard = [cards.pop()];

    this.setState((prevState) => ({
      playerHand: playerCard,
      dealerHand: dealerCard,
      playingDeck: cards,
      deckCount: cards.length,
      loaded: true,
      orgDeck: deck ? deck : prevState.orgDeck 
    }));
  }

  computeHandSum = (props) => {
    const total = props.name === 'Dealer' ? this.state.dealerSum : this.state.playerSum;

    if (props.isFaceUp) {
      total += props.value;
    }
    else {
      total -= props.value;
    }

    if (props.name === "Dealer") {
      this.setState({
        dealerSum: total
      })
    }
    else {
      this.setState({
        playerSum: total
      })
    }
  }

  clearHands = () => {
    this.setState((prevState) => ({
      playerHand: [],
      dealerHand: [],
      playerSum: 0,
      dealerSum: 0,
      handKey: prevState.handKey + 1,
    }));
  }

  shuffle = (deck) => {
    const cards = [...deck];
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    return cards;
  }

  onReplay = () => {
    const orgDeck = this.state.orgDeck.cards;
    const playingCards = this.state.playingDeck;

    this.clearHands();
    //shuffle original deck
    playingCards = this.shuffle(orgDeck);
    this.initHands(playingCards);
  }

  onDraw = (player) => {
    const cards = [...this.state.playingDeck];
    const drawnCard = [cards.pop()];

    const hand = player === 'Dealer' ? this.state.dealerHand : this.state.playerHand;
    if (hand.length < 5) {
      let newHand = drawnCard.concat(hand);

      if (player === 'Dealer') {
        this.setState({
          dealerHand: newHand,
        });
      }
      else {
        this.setState({
          playerHand: newHand,
        });
      }
    }

    this.setState((prevState) => ({
      playingDeck: cards,
      deckCount: prevState.deckCount - 1,
    }));
  }

  render() {
    
    let btnLabel = 'Play Again';

    return (
      <div className="table">
        <div className="deck-container">
          {this.state.deckCount} Cards Remaining
          <div className="replay-container">
            {this.state.playerHand.length === 5 && this.state.dealerHand.length === 5 &&
              <button className="btn-replay" onClick={this.onReplay}>{btnLabel.toUpperCase()}</button>
            }
          </div>
        </div>
        <div className="player">
          <div className="points">Player Sum: {this.state.playerSum}
          </div>
          {this.state.loaded &&
            <Hand
              key={"Player" + this.state.handKey}
              name="Player"
              cards={this.state.playerHand}
              onDraw={this.onDraw}
              getFaceUpValue={this.computeHandSum} />}
        </div>
        <div className="dealer">
          <div className="points">Dealer Sum: {this.state.dealerSum}
          </div>
          {this.state.loaded &&
            <Hand
              key={"Dealer" + this.state.handKey}
              name="Dealer"
              cards={this.state.dealerHand}
              onDraw={this.onDraw}
              getFaceUpValue={this.computeHandSum} />
          }
        </div>
      </div>
    );
  }
}