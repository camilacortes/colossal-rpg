const readlineSync = require('readline-sync');
const greeting = console.log('Welcome to Colossal RPG!');

const userName = readlineSync.question(' What is your name? ');

let hp = 100;
let enemyHp = 100;
let inventoryItem = [': stick '];

const options = ['walk', 'print'];

const gameOver = () => {
  if (hp <= 0) {
    console.log('You have died!');
  }
};

const walk = () => {
  const toWalk = readlineSync.keyInSelect(options, 'select what to do');
  if (toWalk === 0) {
    console.log('You are walking');
    wildEnemyAppears();
  } else if (toWalk === 1) {
    console.log(
      'Hello ' +
        userName +
        ' here is your inventory items' +
        inventoryItem +
        '. Your HP is: ' +
        hp +
        '!'
    );
  } else if (toWalk === -1) {
    console.log('you have quit the game');
    process.exit();
  }
};

const wildEnemyAppears = () => {
  if (Math.random() >= 0.5) {
    wildEnemy();
    attack();
  }
};

const wildEnemy = () => {
  const names = ['Grimlin', 'Jess', 'Ogre'];
  const name = names[Math.floor(Math.random() * names.length)];
  console.log('A wild ' + name + ' has appeared');
};

const attack = () => {
  const attackOrRun = ['attack', 'run'];
  const attackRun = readlineSync.keyInSelect(
    attackOrRun,
    'Would you like to attack or run? '
  );
  if (attackRun === 0) {
    hp = hp - Math.floor(Math.random() * 101);
    console.log('You attacked');
    enemyHpDrop();
    winner();
    gameOver();
  } else if (attackRun === 1) {
    run();
  }
};

const run = () => {
  if (Math.random() < 0.5) {
    console.log('you escaped unharmed');
  } else {
    hp = hp - Math.floor(Math.random() * 101);
    console.log('You escaped harmed. Your new HP is ' + hp);
    gameOver();
  }
};

const enemyAttack = () => {
  hp = hp - Math.floor(Math.random() * 101);
  console.log('The enemy has attacked you.');
};

const enemyHpDrop = () => {
  enemyHp = enemyHp - Math.floor(Math.random() * 101);
  console.log('Enemy HP is: ' + enemyHp);
};

const winner = () => {
  if (enemyHp <= 0) {
    const items = ['gun', 'stick', 'antidote', 'food', 'bag', 'water'];
    inventoryItem.push(items[Math.floor(Math.random() * items.length)]);
    console.log(
      'You have beat the enemy. You have had an item added to your inventory: ' +
        inventoryItem
    );
  } else if (hp === 0) {
    gameOver();
  }
};

while (hp > 0) {
  walk();
}
