import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.card = this.props.card;
    this.state = {
      isFaceUp: false
    }
    this.suitSymbols = {
      'SPADES': '♠',
      'DIAMONDS': '♦',
      'CLUBS': '♣',
      'HEARTS': '♥'
    }
  }

  toggleCard = () => {
    this.props.getFaceUpValue(this.getCardValue(this.card.value), !this.state.isFaceUp);

    this.setState({
      isFaceUp: !this.state.isFaceUp
    })
  }

  getCardValue = (value) => {
    switch (value) {
      case 'KING':
      case 'QUEEN':
      case 'JACK':
        return 10;
        break;
      case 'ACE':
        return 1;
        break;
      default:
        return parseInt(value);
        break;
    }
  }

  render() {
    let rank = this.card.code.charAt(0);
    let suit = this.suitSymbols[this.card.suit];
    rank = rank === '0' ? '10' : rank;
    let cardClass = 'card';
    let suitClass = 'suit';
    if (this.state.isFaceUp) {
      cardClass += ' face-up ';
    }
    if (this.card.suit === 'DIAMONDS' || this.card.suit === 'HEARTS') {
      cardClass += ' red ';
    }

    return (
      <div
        className={cardClass}
        onClick={this.toggleCard} >
        {this.state.isFaceUp &&
          <React.Fragment>
            <span className="rank top">{rank}</span>
            <span className="suit top">{suit}</span>
            <span className="face">{suit}</span>
            <span className="rank bottom">{rank}</span>
            <span className="suit bottom">{suit}</span>
          </React.Fragment>
        }
      </div>
    );
  }
}
