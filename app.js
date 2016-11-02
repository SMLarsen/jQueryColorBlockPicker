//  jQuery Color Block Picker
//  Developed by:  Steve Larsen
//  Date: 11/01/2016

var colorArray = ["AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow",
"YellowGreen"
];

$('document').ready(function () {

  var targetColor = 0;

// listener for quantity of blocks to create
  $('input[name=colorQty]').on('change', function (event) {
    event.preventDefault();
    colorArray = shuffleArray(colorArray); // shuffle the color array
    // console.log(colorArray);
    var blockTotal = Number($(this).val());
    var colorIndex = randomNumber(0, blockTotal - 1); // identify random color
    console.log('color number', colorIndex);
    targetColor = colorArray[colorIndex];
    console.log('target: ', targetColor);
    $('#colorPick').text(targetColor);
    $('main').empty();
    buildBlocks(colorArray, blockTotal);
  });
// listener for the size of each block
    $('input[name=blockSize]').on('change', function (event) {
      event.preventDefault();
      var blockSize = Number($(this).val());
      blockSize = 'size' + blockSize;
      $('main').children().removeClass('size40 size80 size120 size160 size200 animated zoomIn');
      $('main').children().addClass(blockSize + ' animated zoomIn');
    });
// listener for clicking of blocks - if correct, wobble, if not delete
  $('main').on('click', '.block', function(event) {
    event.preventDefault();
    var colorPicked = $(this).attr('name');
    console.log(colorPicked);
    var $thisBlock = $(this);
    $('#result').removeClass();
    console.log($('#result'));
    if (colorPicked === targetColor) { // remove existing classes, flip it, and message
      $(this).removeClass('blockIt animated wobble rotateIn');
      $(this).addClass('blockIt animated wobble');
      setTimeout(function() {$thisBlock.removeClass('blockIt animated rotateIn zoomIn wobble');}, 2000);
      $('#result').removeClass('resultBad animated wobble');
      $('#result').text('Nailed It!');
      $('#result').addClass('resultGood animated wobble');
    } else { // message, rotate bad guess out and remove it
      $(this).addClass('animated rotateOut');
      $('#result').text('What are you thinking?');
      $('#result').addClass('resultBad');
      setTimeout(function() {$thisBlock.remove();}, 1200);
    }
  });
// block builder
  function buildBlocks(colorArray, blockTotal) {
    for (var i = 0; i < colorArray.length && i < blockTotal; i++) {
      block = '<div class="block animated rotateIn" name="' + colorArray[i] + '" style="background-color:' + colorArray[i] + '"></div>';
      $("main").append(block);
    }
  }
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

});
