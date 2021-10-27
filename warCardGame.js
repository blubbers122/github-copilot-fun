// starts a simulation of a war card game
const startGame = () => {
  printTitle();
  const deck = new Deck();
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");
  const war = new War();
  deck.addCardsToDeck(52);
  deck.shuffle();
  deck.deal(player1, 26);
  deck.deal(player2, 26);
  war.play(player1, player2);
};

class War {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.round = 0;
    this.rounds = [];
    this.winner = null;
  }

  play(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.round = 0;
    this.rounds = [];

    while (this.winner === null) {
      this.playRound();
      this.winner = this.checkForWinner();
    }

    console.log(`\n${this.winner.name} wins the game`);
  }

  playRound() {
    const round = new Round(this.player1, this.player2);
    this.rounds.push(round);
    round.play();
    if (round.winner) {
      this.round = this.rounds.length;
      this.printResults(round);
    } else {
      this.round++;
      this.playRound();
    }
  }

  // outputs the results of the round
  printResults(round) {
    const roundNumber = this.rounds.length;
    console.log(`\nRound ${roundNumber}`);
    console.log(`${round.player1.name} has ${round.player1.hand.length} cards`);
    console.log(`${round.player2.name} has ${round.player2.hand.length} cards`);
    console.log(`${round.winner.name} wins the round`);
  }

  // checks if a player has run out of cards
  checkForWinner() {
    if (this.player1.hand.length === 0) {
      return this.player2;
    } else if (this.player2.hand.length === 0) {
      return this.player1;
    }
    return null;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
    this.values = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
  }

  addCardsToDeck(numCards) {
    for (let i = 0; i < numCards; i++) {
      this.cards.push(new Card(this.suits[i % 4], this.values[i % 13]));
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(player, numCards) {
    for (let i = 0; i < numCards; i++) {
      player.hand.push(this.cards.pop());
    }
  }
}

class Round {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner = null;
    this.loser = null;
  }

  play() {
    const player1Card = this.player1.hand.pop();
    const player2Card = this.player2.hand.pop();
    console.log(generateAsciiArt(player1Card.value));
    console.log(this.player1.name + " vs. " + this.player2.name);
    console.log(generateAsciiArt(player2Card.value));

    if (player1Card.value > player2Card.value) {
      this.player1.hand.push(player1Card, player2Card);
      this.winner = this.player1;
      this.loser = this.player2;
    } else if (player1Card.value < player2Card.value) {
      this.player2.hand.push(player1Card, player2Card);
      this.winner = this.player2;
      this.loser = this.player1;
    } else {
      this.playWar();
    }
  }

  playWar() {
    console.log("Starting war");
    const player1Card = this.player1.hand.pop();
    const player2Card = this.player2.hand.pop();

    if (player1Card === undefined) {
      this.winner = this.player2;
      this.loser = this.player1;
      return;
    } else if (player2Card === undefined) {
      this.winner = this.player1;
      this.loser = this.player2;
      return;
    }

    console.log(generateAsciiArt(player1Card.value));
    console.log("VS");
    console.log(generateAsciiArt(player2Card.value));

    if (player1Card.value > player2Card.value) {
      this.player1.hand.push(player1Card, player2Card);
      this.winner = this.player1;
    } else if (player1Card.value < player2Card.value) {
      this.player2.hand.push(player1Card, player2Card);
      this.winner = this.player2;
    } else {
      this.playWar();
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

// prints a line of dashes to the terminal
const printLine = () => {
    console.log("----------------------------------------");
}

// generates ascii art for a card value
const generateAsciiArt = (value) => {
    const asciiArt = {
        "Ace": " _____\n|A   |\n|  A |\n|A___|\n",
        "2": " _____\n|2   |\n|  2 |\n|2___|\n",
        "3": " _____\n|3   |\n|  3 |\n|3___|\n",
        "4": " _____\n|4   |\n|  4 |\n|4___|\n",
        "5": " _____\n|5   |\n|  5 |\n|5___|\n",
        "6": " _____\n|6   |\n|  6 |\n|6___|\n",
        "7": " _____\n|7   |\n|  7 |\n|7___|\n",
        "8": " _____\n|8   |\n|  8 |\n|8___|\n",
        "9": " _____\n|9   |\n|  9 |\n|9___|\n",
        "10": " _____\n|10  |\n|  10|\n|10__|\n",
        "Jack": " _____\n|J   |\n|  J |\n|J___|\n",
        "Queen": " _____\n|Q   |\n|  Q |\n|Q___|\n",
        "King": " _____\n|K   |\n|  K |\n|K___|\n",
    }
    return asciiArt[value];
}

// prints a title screen with the word "WAR" to the terminal
const printTitle = () => {
    printLine();
  console.log("WAR");
    printLine();
};

startGame();
