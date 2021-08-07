// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots

//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Alert players that they are starting the round
window.alert("Welcome to Robot Gladiators!");

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
         window.alert(playerName + "has died!");
         break;
      } else {
         window.alert(playerName + " still has " + playerHealth + " health remaining.");
      }
   }
};

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//Log multiple values on the web console with this function
console.log(playerName, playerHealth, playerAttack);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

for (var i = 0; i < enemyNames.length; i++) {
   var pickedEnemyName = enemyNames[i];
   enemyHealth = 50;
   fight(pickedEnemyName);
}

// // If player chooses to fight, then fight
// if (promptFight === "fight" || promptFight === "FIGHT") {
//    // Remove enemy's health by subtracting the amount set in the playerAttack variable
//    enemyHealth = enemyHealth - playerAttack;

//    // Log a resulting message to the console so we know that it worked.
//    console.log(
//       playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
//    );
