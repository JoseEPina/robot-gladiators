// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots

//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function () {
   // ask player if they'd like to fight or skip using fightOrSkip function
   var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

   // Convert user input to Lower Case string
   promptFight = promptFight.toLowerCase();
   // Conditional Recursive Function Call
   // if (promptFight === "" || promptFight === null) {
   if (!promptFight || (promptFight != "fight" && promptFight != "skip")) {
      window.alert("You need to provide a valid answer! Please try again.");
      fightOrSkip();
   }

   // if player picks "skip" confirm and then stop the loop
   if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
         window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
         // subtract money from playerMoney for skipping, but don't let them go into the negative
         playerInfo.money = Math.max(0, playerInfo.money - 10);

         // return true if player wants to leave
         return true;
      }
   }
   return false;
};

var fight = function (enemy) {
   // Repeat and execute as long as the enemy-robot is alive
   while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
      if (fightOrSkip()) {
         // If True, leave fight by breaking loop
         break;
      }

      // Generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      console.log(
         playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
         window.alert(enemy.name + " has died!");
         break;
      } else {
         window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }

      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      console.log(
         enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
         window.alert(playerInfo.name + " has died!");
         break;
      } else {
         window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.");
      }
   }
};

// Function to end the entire game
var endGame = function () {
   // If the player is still alive, player wins!
   if (playerInfo.health > 0) {
      window.alert("Great job, you have survived the game! You now have a score of " + playerInfo.money + ".");
   } else {
      window.alert("You have lost your robot in batte.");
   }
   var playAgainConfirm = window.confirm("Would you like to play again?");
   if (playAgainConfirm) {
      // Restart the game
      startGame();
   } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
   }
};

// function to start a new game
var startGame = function () {
   // reset player stats
   playerInfo.reset();

   // debugger;

   for (var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
         // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
         window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

         // Pick new enemy to fight based on the index of the enemy.names array
         var pickedEnemyObj = enemyInfo[i];

         // Reset enemy.health between 40 and 60, using our new function.
         pickedEnemyObj.health = randomNumber(40, 60);

         // Use debugger to pause script from running and check what's going on at that moment in the code
         // debugger;

         // Pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
         fight(pickedEnemyObj);

         // If player is still alive and we're not at the last enemy in the array
         if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            // Ask if player wants to use the store before the next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // If yes, take them to the store() fucntion
            if (storeConfirm) {
               shop();
            }
         }
      } else {
         window.alert("You have lost your robot in battle! Game Over!");
         break;
      }
   }
   // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
   endGame();
};

var shop = function () {
   // Ask player what they would like to do
   // *Notice parseInt() used here to convert user input into a Number!
   var shopOptionPrompt = parseInt(
      window.prompt(
         "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter '1' to REFILL, '2' to UPGRADE, or '3' to LEAVE."
      )
   );
   // Use switch to carry out action
   switch (shopOptionPrompt) {
      case 1: {
         playerInfo.refillHealth();
         break;
      }

      case 2: {
         playerInfo.upgradeAttack();
         break;
      }

      case 3: {
         window.alert("Leaving the store.");
         // Do nothing, so function will end
         break;
      }
      default: {
         window.alert("You did not pick a valid option. Try again.");
         // Call shop() againt to force player to pick a valid option shop();
         shop();
         break;
      }
   }
};

// Function to generate a random numeric value
var randomNumber = function (min, max) {
   var value = Math.floor(Math.random() * (max - min + 1) + min);

   return value;
};

// Function to set name
var getPlayerName = function () {
   var name = "";

   while (name === "" || name === null) {
      name = prompt("What is your robot's name?");
   }

   console.log("Your robot's name is " + name);
   return name;
};

/* GAME INFORMATION / VARIABLES */
var playerInfo = {
   name: getPlayerName(),
   health: 100,
   attack: 10,
   money: 10,
   reset: function () {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
   },
   refillHealth: function () {
      if (this.money >= 7) {
         window.alert("Refilling player's health by 20 for dollars.");
         this.health += 20;
         this.money -= 7;
      } else {
         window.alert("You don't have enough money!");
      }
   },
   upgradeAttack: function () {
      if (this.money >= 7) {
         window.alert("Upgrading player's attack by 6 for 7 dollars.");
         this.attack += 6;
         this.money -= 7;
      } else {
         window.alert("You don't have enough money!");
      }
   },
};

//Log multiple values on the web console with this function
console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

var enemyInfo = [
   {
      name: "Roborto",
      attack: randomNumber(10, 14),
      health: 50,
      //   shield: {
      //   type: "wood",
      //   strength: 10
   },
   {
      name: "Amy Android",
      attack: randomNumber(10, 14),
      health: 50,
   },
   {
      name: "Robo Trumble",
      attack: randomNumber(10, 14),
      health: 50,
   },
];

// Adding this line to the bottom will cause the startGame()
// function to be executed when the page loads:
startGame();
