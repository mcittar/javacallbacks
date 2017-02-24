const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hanoi {
  constructor() {
    this.board = [
      [3, 2, 1],
      [],
      []
    ];
  }

  run(completionCallback) {
    // until 2nd or 3rd tower = [3,2,1]
      // get move from player
      // make move on board

    if (this.isWon()) {
      this.board = [
        [3, 2, 1],
        [],
        []
      ];
      console.log("YOU WON!");
      completionCallback();
    } else {
      this.promptMove(completionCallback);
    }
  }

  promptMove(completionCallback) {
    console.log(this.print());

    reader.question("Which stack do you want to select?", (startTowerIdx) => {
      reader.question("which stack do you want to move to?", (endTowerIdx) => {
        this.move(startTowerIdx, endTowerIdx);
        this.run(completionCallback);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    // console.log(this.board[startTowerIdx] === []);
    if (this.board[startTowerIdx].length === 0) {
      return false;
    }

    if (this.board[endTowerIdx].length === 0 ||
        this.board[startTowerIdx].slice(-1)[0] < this.board[endTowerIdx].slice(-1)[0]) {
          return true;
    }
    return false;
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let disk = this.board[startTowerIdx].pop();
      this.board[endTowerIdx].push(disk);
    }
  }

  print() {
    return JSON.stringify(this.board);
  }

  isWon() {
    if (this.board[1].length === 3 || this.board[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }
}

const hanoi = new Hanoi;

const again = () => {
  reader.question("Play again?", (res) => {
    switch (res) {
      case 'yes':
      console.log(again);
        hanoi.run(again);
        break;
      case 'no':
      reader.close();
        break;
    }
  });
};

hanoi.run(again);
