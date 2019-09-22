import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import Card from './Card'

export default class Hand extends PureComponent {
  constructor(props) {
    super(props);
    this.name = this.props.name;
  }

  getFaceUpValue = (value, isFaceUp) => {
    let card = {
      value: value,
      name: this.name,
      isFaceUp: isFaceUp
    };
    this.props.getFaceUpValue(card);
  }

  render() {
    return (

      <div className="container">
        <div className="hand">
          {this.props.cards.length > 0 && this.props.cards.map((card) =>
            <Card
              key={card.code}
              getFaceUpValue={this.getFaceUpValue}
              card={card} />
          )}
        </div>
        <div className="btn-container">
          <button className="deal-btn" onClick={() => this.props.onDraw(this.name)} disabled={this.props.cards.length === 5}>
            {this.name.toUpperCase()} DRAW
        </button>
        </div>
      </div>
    );
  }
}
