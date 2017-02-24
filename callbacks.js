class Clock {

  constructor() {
    this.date = new Date(Date.now());

    this.seconds = this.date.getSeconds();
    this.minutes = this.date.getMinutes();
    this.hours = this.date.getHours();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes += 1;
    }

    this.printTime();
  }

}
// const clock = new Clock();
const readline = require('readline');
const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)
  input: process.stdin,
  output: process.stdout
});

const addNumbers = (sum, numsLeft, completionCallback) => {
  if (numsLeft > 0) {
    reader.question("Put in next number:", (res) => {
      let num = parseInt(res);
      console.log(sum += num);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }

  if (numsLeft <= 0) {
    completionCallback(sum);
    reader.close();
  }
};

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

const askIfGreaterThan = (el1, el2, callback) => {
  reader.question(`Is ${el1} > ${el2}`, (res) => {
    switch (res) {
      case 'yes':
        callback(true);
        break;
      case 'no':
        callback(false);
        break;
    }
  });
};

const innerBubbleSortLoop = (arr, i, madeAnySwaps, outerBubbleSortLoop) => {
  if (i === arr.length - 1) {
    console.log('first' + outerBubbleSortLoop);
    outerBubbleSortLoop(madeAnySwaps);
  }

  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
      if (isGreaterThan === true) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
};

const absurdBubbleSort = (arr, sortCompletionCallback) => {

  function outerBubbleSortLoop(madeAnySwaps=true) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);
};

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function(context) {
  return () => {
    this.apply(context);
  };
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
