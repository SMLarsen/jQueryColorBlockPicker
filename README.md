# jQuery Color Block Picker

Project Files

1. app.js - contains javascript code
2. index.html - contains home page html
3. style.css - contains css styling for project

Description
jQuery Color Block Picker
You will be creating a little 'pick the block' game with HTML, CSS, and jQuery!

On document load, append four (or more!) divs on to the DOM with jQuery, each colored with a different color. Each div needs to know which color it is.

Prompt the player to pick one of the color blocks you created at random.

Here is a handy function to generate a random number given a minimum and maximum.

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
If the player clicks on the correct color block, give them a success message. If they pick the wrong color, let them know.

Here is a visual example of the working game.

When the player picks the correct color block, prompt the player to pick another block randomly and let them keep playing.

Hard Mode
What if we want to add a new block (or remove one)? Did you hard-code your blocks into the HTML or logic? Change your code to make it easy to add or change the number and color of blocks shown. Hint: One way to do this is to use an array to store the colors and base all your code off of this array.

Pro Mode
When the player clicks on the correct block, change the color of that block for an added visual cue. Then change it back after 2 seconds and resume the game. You'll need to use the built in setTimeout() function for the timing. This function waits a given amount of time and then calls a function you specify.

Super Fun Mode
Add some jQuery effects or animations to your game! There are quite a few built in. See the Docs!
