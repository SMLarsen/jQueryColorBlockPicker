//  jQuery Color Block Picker
//  Developed by:  Steve Larsen
//  Date: 11/02/2016

var colorArray = ["AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow",
"YellowGreen"
];

$('document').ready(function () {
  var targetColor = "";
  var totalGuesses = 0;
  var colorsRequested = 8;
  var message = '';
  var blockSize = 0;

  colorArray = shuffleArray(colorArray);
  getTargetColor(colorsRequested);
  $('#colorPick').text(targetColor);
  buildBlocks(colorArray, colorsRequested);// shuffle the color array
  // console.log(targetColor, colorsRequested, colorArray);

// listener for quantity of blocks to create
  $('input[name=colorQty]').on('change', function (event) {
    event.preventDefault();

    colorArray = shuffleArray(colorArray); // shuffle the color array
    colorsRequested = Number($(this).val()); // how many colors are requested
    getTargetColor(colorsRequested);
    $('#colorPick').text(addSpaces(targetColor));
    $('main').empty();
    $('#result').text('');

    buildBlocks(colorArray, colorsRequested);
    changeBlockSize(blockSize);
    totalGuesses = 0;
  });

// listener for the size of each block
    $('input[name=blockSize]').on('change', function (event) {
      event.preventDefault();
      blockSize = 'size' + Number($(this).val());
      changeBlockSize(blockSize);
    });

// listener for clicking of blocks - if correct, wobble, if not delete
  $('main').on('click', '.block', function(event) {
    event.preventDefault();
    var colorClicked = $(this).attr('name');
    // console.log(colorClicked, targetColor, colorArray);
    var $thisBlock = $(this);
    $('#result').removeClass();
    totalGuesses++;

    if (colorClicked === targetColor) { // remove existing classes, flip it, and message
      $(this).removeClass('blockIt animated wobble rotateIn');
      $(this).addClass('blockIt animated wobble');
      setTimeout(function() {$thisBlock.removeClass('blockIt animated rotateIn zoomIn wobble');}, 2000);
      message = totalGuesses === 1 ? 'Wow! You are amazing!' : 'Nailed It! But ' + (totalGuesses) + " guesses!";
      $('#result').removeClass('resultBad animated wobble');
      $('#result').text(message);
      $('#result').addClass('resultGood animated wobble');
    } else { // message, rotate bad guess out and remove it
      $(this).addClass('animated rotateOut');
      message = totalGuesses === 1 ? totalGuesses + ' fail so far, ' : totalGuesses + ' fails so far, ';
      $('#result').text(message + 'what are you thinking?');
      $('#result').addClass('resultBad');
      setTimeout(function() {$thisBlock.remove();}, 1200);
    }
  });

  // listener for hint request
      $('button[name=buttonHint]').on('click', function (event) {
        event.preventDefault();
        var $thing = $('main').find("[name='" + targetColor + "']");
        $thing.removeClass('blockIt animated wobble rotateIn rubberBand');
        $thing.addClass('blockIt animated rubberBand');
        setTimeout(function() {$thing.removeClass('blockIt animated rotateIn zoomIn wobble rubberBand');}, 800);
        });

// block builder
  function buildBlocks(colorArray, colorsRequested) {
    for (var i = 0; i < colorArray.length && i < colorsRequested; i++) {
      block = '<div class="block animated rotateIn" name="' + colorArray[i] + '" style="background-color:' + colorArray[i] + '"></div>';
      $("main").append(block);
    }
  }

  function getTargetColor(colorsRequested) {
    var colorIndex = randomNumber(0, colorsRequested - 1); // identify index for random color
    targetColor = colorArray[colorIndex]; // locate target color
  }

  function changeBlockSize(blockSize) {
    $('main').children().removeClass('size40 size80 size120 size160 size200 animated rotateIn');
    $('main').children().addClass(blockSize);
    $('main').children().addClass(' animated zoomIn');
    setTimeout(function() {$('main').children().removeClass('animated zoomIn');}, 2000);
  }

});

// utility functions
// generate random color index
  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

// shuffle color array so that not always same order
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  // Add spaces before capital letters in color names for display
  function addSpaces(string) {
    return string.replace(/([A-Z])/g, ' $1').trim();
  }
