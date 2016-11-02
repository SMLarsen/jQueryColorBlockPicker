//  jQuery Color Block Picker
//  Developed by:  Steve Larsen
//  Date: 11/01/2016

var colorArray = ["AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow",
"YellowGreen"
];

$('document').ready(function () {

  var targetColor = 0;

  $('input[name=colorQty]').on('change', function (event) {
    event.preventDefault();
    var blockTotal = Number($(this).val());
    var colorIndex = randomNumber(0, blockTotal);
    console.log(colorIndex);
    targetColor = colorArray[colorIndex];
    console.log('target: ', targetColor);
    $('#colorPick').text(targetColor);
    $('main').empty();
    buildBlocks(colorArray, blockTotal);
  });


  $('main').on('click', '.block', function(event) {
    event.preventDefault();
    var colorPicked = $(this).attr('name');
    console.log(colorPicked);
    if (colorPicked === targetColor) {
      $(this).removeClass('animated wobble');
      $(this).addClass('animated wobble');
      $('#result').text('Nailed It!');
    } else {
      $(this).addClass('animated rotateOut');
      $('#result').text('What were you thinking?');
      var $thisBlock = $(this);
      setTimeout(function() {$thisBlock.remove();}, 1500);
    }
  });

  function buildBlocks(colorArray, blockTotal) {

    for (var i = 0; i < colorArray.length && i < blockTotal; i++) {
      block = '<div class="block" name="' + colorArray[i] + '" style="background-color:' + colorArray[i] + '"></div>';
      $("main").append(block);
    }
  }

  function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

});
