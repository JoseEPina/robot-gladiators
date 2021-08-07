// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots

//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fight = function (enemyName) {
   // Repeat and execute as long as the enemy-robot is alive
   while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt(
         "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
      );
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
         // confirm player wants to skip
         var confirmSkip = window.confirm("Are you sure you'd like to skip?");

         // if yes (true), leave fight
         if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney is now ", playerMoney);
            break;
         }
      }
      // Remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
         playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      );

      // check enemy's health
      if (enemyHealth <= 0) {
         window.alert(enemyName + " has died!");
         break;
      } else {
         window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }

      // Remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
         enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );

      // check player's health
      if (playerHealth <= 0) {
         window.alert(playerName + " has died!");
         break;
      } else {
         window.alert(playerName + " still has " + playerHealth + " health remaining.");
      }
   }
};

// Function to end the entire game
var endGame = function () {
   // If the player is still alive, player wins!
   if (playerHealth > 0) {
      window.alert("Great job, you have survived the game! You now have a score of " + playerMoney + ".");
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
   // Reset the player stats
   // playerHealth = 100;
   // playerAttack = 10;
   // playerMoney = 10;

   // debugger;

   for (var i = 0; i < enemyNames.length; i++) {
      if (playerHealth > 0) {
         // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
         window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

         // Pick new enemy to fight based on the index of the enemyNames array
         var pickedEnemyName = enemyNames[i];

         // Reset enemyHealth before starting new fight
         enemyHealth = 50;

         // Use debugger to pause script from running and check what's going on at that moment in the code
         // debugger;

         // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
         fight(pickedEnemyName);
      } else {
         window.alert("You have lost your robot in battle! Game Over!");
         break;
      }
   }
   // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
   endGame();
};

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//Log multiple values on the web console with this function
console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 52;

// Adding this line to the bottom will cause the startGame()
// function to be executed when the page loads:
startGame();
