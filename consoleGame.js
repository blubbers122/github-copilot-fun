// a text-based fighting game
// created by: Brock Lubbers

class Player {
  constructor(
    name,
    health,
    attack,
    defense,
    speed,
    level,
    exp,
    expToLevel,
    inventory
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.level = level;
    this.exp = exp;
    this.expToLevel = expToLevel;
    this.inventory = inventory;
  }

  // attack function
  attackEnemy(enemy) {
    let damage = this.attack;
    enemy.takeDamage(damage);
    console.log(`${this.name} attacked ${enemy.name} for ${damage} damage!`);
    if (enemy.isDead()) {
      this.gainExp(enemy.exp);
    }
  }

  // take damage function
  takeDamage(damage) {
    let damageTaken = damage - this.defense;
    if (damageTaken < 0) {
      damageTaken = 0;
    }
    this.health -= damageTaken;
    console.log(`${this.name} took ${damageTaken} damage!`);
    if (this.health <= 0) this.die();
  }

  // die function
  die() {
    console.log(`${this.name} died!`);
  }

  // level up function
  levelUp() {
    this.level += 1;
    this.expToLevel *= 2;
    this.attack += 1;
    this.defense += 1;
    this.speed += 1;
    this.health += 10;
    console.log(`${this.name} leveled up to level ${this.level}!`);
  }

  // gain exp function
  gainExp(exp) {
    this.exp += exp;
    console.log(`${this.name} gained ${exp} exp!`);
    if (this.exp >= this.expToLevel) {
      this.exp -= this.expToLevel;
      this.levelUp();
    }
  }
}

class Enemy {
  constructor(name, health, attack, defense, speed, level, exp) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.level = level;
    this.exp = exp;
  }

  // attack function
  attackPlayer(player) {
    let damage = this.attack;
    player.takeDamage(damage);
    console.log(`${this.name} attacked ${player.name} for ${damage} damage!`);
  }

  // take damage function
  takeDamage(damage) {
    let damageTaken = damage - this.defense;
    if (damageTaken < 0) {
      damageTaken = 0;
    }
    this.health -= damageTaken;
    console.log(`${this.name} took ${damageTaken} damage!`);
    if (this.health <= 0) this.die();
  }

  // die function
  die() {
    console.log(`${this.name} died!`);
  }
}

// starts the game by asking the player for their name
// and then creates a new player object
// with the name and starting stats. It then
// generates 3-5 enemies with random names and stats
// and adds them to the enemy array.
function startGame() {
  let playerName = prompt("What is your name?");
  let player = new Player(playerName, 100, 10, 10, 10, 1, 0, 100, []);
  let enemyArray = [];
  let enemyCount = Math.floor(Math.random() * 4) + 3;
  for (let i = 0; i < enemyCount; i++) {
    let enemyName = generateRandomEnemyName();
    let enemy = new Enemy(
      enemyName,
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 10) + 5,
      1,
      Math.floor(Math.random() * 50) + 10
    );
    enemyArray.push(enemy);
  }
  gameLoop(player, enemyArray);
}

// the main game loop
// this function is repeatedly called until the player dies
// or wins the game by defeating all enemies
const gameLoop = (player, enemyArray) => {
  // if the player is dead, end the game
  if (enemyArray.length === 0) {
    console.log(`${player.name} won the game!`);
    return;
  }

  // if the player is alive, ask them to choose an action from the following choices: attack, inventory
  let action = prompt("Pick an action");
  if (action === "attack") {
    let enemy = chooseEnemy(enemyArray);
    player.attackEnemy(enemy);
    gameLoop(player, enemyArray);
  } else if (action === "inventory") {
    player.displayInventory();
  } else {
    console.log("Invalid action");
  }
};

// generates a random name for a fantasy-themed enemy
const generateRandomEnemyName = () => {
  const enemyNames = [
    // array of possible names for enemies in the game (fantasy-themed)
    "Goblin",
    "Orc",
    "Troll",
    "Giant",
    "Dragon",
    "Gnome",
    "Skeleton",
    "Zombie",
    "Vampire",
    "Werewolf",
    "Ghost",
    "Lich",
    "Witch",
    "Sorceress",
    "Warlock",
    "Wizard",
    "Necromancer",
  ];

  return enemyNames[Math.floor(Math.random() * enemyNames.length)];
};
