/**
 * JavaScript Implementation of "Color" class
 * @author  MarcoXZh
 * @version  1.1
 */
function JsColor(para1, para2, para3, para4) {
  var hasAlpha = false;
  var a = 0.0;
  var r = 0;
  var g = 0;
  var b = 0;

  /**
   * Method: Get red channel of the color
   */
  this.getRed = function() {
    return r;
  }; // this.getRed = function() {...};

  /**
   * Method: Set red channel of the color
   */
  this.setRed = function(red) {
    try {
      if (red === null || red === undefined || typeof red !== "number")
        throw "JsColor.setRed(red) - Parameter error: ";
      r = Math.abs(red);
      r = (r < 1.0) ? Math.round(r * 256.0) : Math.round(r) % 256;
    } catch (err) {
      if (typeof red === "string")
        red = "\"" + red + "\"";
      console.log(err + red);
    } // try - catch(err)
  }; // this.setRed = function(red) {...};

  /**
   * Method: Get green channel of the color
   */
  this.getGreen = function() {
    return g;
  }; // this.getGreen = function() {...};

  /**
   * Method: Set green channel of the color
   */
  this.setGreen = function(green) {
    try {
      if (green === null || green === undefined || typeof green !== "number")
        throw "JsColor.setGreen(green) - Parameter error: ";
      g = Math.abs(green);
      g = (g < 1.0) ? Math.round(g * 256.0) : Math.round(g) % 256;
    } catch (err) {
      if (typeof green === "string")
        green = "\"" + green + "\"";
      console.log(err + green);
    } // try - catch(err)
  }; // this.setGreen = function(green) {...};

  /**
   * Method: Get blue channel of the color
   */
  this.getBlue = function() {
    return b;
  }; // this.getBlue = function() {...};

  /**
   * Method: Set blue channel of the color
   */
  this.setBlue = function (blue) {
    try {
      if (blue === null || blue === undefined || typeof blue !== "number")
        throw "JsColor.setBlue(blue) - Parameter error: ";
      b = Math.abs(blue);
      b = (b < 1.0) ? Math.round(b * 256.0) : Math.round(b) % 256;
    } catch (err) {
      if (typeof blue === "string")
        blue = "\"" + blue + "\"";
      console.log(err + blue);
    } // try - catch(err)
  }; // this.setBlue = function (blue) {...};

  /**
   * Method: Check if the alpha channel of the color exists or not
   */
  this.hasAlphaChannel = function() {
    return hasAlpha;
  }; // this.hasAlphaChannel = function() {...};

  /**
   * Method: Get alpha channel of the color
   */
  this.getAlpha = function() {
    return (hasAlpha) ? a : null;
  }; // this.getAlpha = function() {...};

  /**
   * Method: Set alpha channel of the color
   */
  this.setAlpha = function(alpha) {
    try {
      if (alpha === null || alpha === undefined || typeof alpha !== "number")
        throw "JsColor.setAlpha(alpha) - Parameter error: ";
      a = Math.abs(alpha);
      if (a > 1.0)
        a /= Math.pow(10.0, Math.ceil(Math.log10(a)));
      hasAlpha = true;
    } catch (err) {
      if (typeof alpha === "string")
        alpha = "\"" + alpha + "\"";
      console.log(err + alpha);
    } // try - catch(err)
  }; // this.setAlpha = function(alpha) {...};

  /**
   * Method: Get color value
   */
  this.getColor = function() {
    var rgb = r * 65536 + g * 256 + b;
    return hasAlpha ? Math.round(rgb * 256 + a * 255) : rgb;
  }; // this.getColor = function() {...};

  /**
   * Method: Set the color with parameters
   */
  this.setColor = function(para1, para2, para3, para4) {
    try {
      if (typeof para1 === "number" && typeof para2 === "number" && typeof para3 === "number") {
        this.setRed(para1);
        this.setGreen(para2);
        this.setBlue(para3);
        if (para4)
          this.setAlpha(para4);
        else
          hasAlpha = false;
      } else if (typeof para1 === "number" && !para2 && ! para3 && !para4) {
        var rgb = Math.round(Math.abs(para1));
        if (rgb > 0xFFFFFF) {
          hasAlpha = true;
          a = (rgb % 256) / 255.0;
          rgb = Math.floor(rgb / 256);
        } else
          hasAlpha = false;
        b = rgb % 256;
        rgb = Math.floor(rgb / 256);
        g = rgb % 256;
        r = Math.floor(rgb / 256);
      } else if (typeof para1 === "string" && para1.length !== 0 && !para2 && ! para3 && !para4) {
        var para = para1.replace(/\s+/g, "").toUpperCase();
        if (para.match(/RGB\(\d{1,3},\d{1,3},\d{1,3}\)/) !== null) {
          var rgb = para.match(/\d+/g);
          this.setRed(parseInt(rgb[0]));
          this.setGreen(parseInt(rgb[1]));
          this.setBlue(parseInt(rgb[2]));
          hasAlpha = false;
        } else if (para.match(/RGBA\(\d{1,3},\d{1,3},\d{1,3}\,\d*\.*\d+\)/) !== null) {
          var rgba = para.match(/\d*\.*\d+/g);
          this.setRed(parseInt(rgba[0]));
          this.setGreen(parseInt(rgba[1]));
          this.setBlue(parseInt(rgba[2]));
          this.setAlpha(parseFloat(rgba[3]));
          hasAlpha = true;
        } else if (para.match(/^(0x[0-9A-F]+|\d+)$/) !== null) {
          this.setColor(parseInt(para));
        } else if (para.match(/^#[0-9A-F]+$/) !== null) {
          para = para.substr(1);
          if (para.length === 3) {
            this.setRed(parseInt(para[0] + para[0], 16));
            this.setGreen(parseInt(para[1] + para[1], 16));
            this.setBlue(parseInt(para[2] + para[2], 16));
            hasAlpha = false;
          } else if (para.length === 4) {
            this.setRed(parseInt(para[0] + para[0], 16));
            this.setGreen(parseInt(para[1] + para[1], 16));
            this.setBlue(parseInt(para[2] + para[2], 16));
            this.setAlpha(parseInt(para[3] + para[3], 16) / 255);
            hasAlpha = true;
          } else if (para.length === 6) {
            this.setRed(parseInt(para.substr(0, 2), 16));
            this.setGreen(parseInt(para.substr(2, 2), 16));
            this.setBlue(parseInt(para.substr(4, 2), 16));
            hasAlpha = false;
          } else if (para.length === 8) {
            this.setRed(parseInt(para.substr(0, 2), 16));
            this.setGreen(parseInt(para.substr(2, 2), 16));
            this.setBlue(parseInt(para.substr(4, 2), 16));
            this.setAlpha(parseInt(para.substr(6, 2), 16) / 255);
            hasAlpha = true;
          } else 
            throw "JsColor.setColor(para1, para2, para3, para4) - Parameter error:\n";
        } else if (JsColor.colors.hasOwnProperty(para)) {
          var color = JsColor.colors[para];
          this.setRed(color.getRed());
          this.setGreen(color.getGreen());
          this.setBlue(color.getBlue());
        } else
          throw "JsColor.setColor(para1, para2, para3, para4) - Parameter error:\n";
      } else
        throw "JsColor.setColor(para1, para2, para3, para4) - Parameter error:\n";
    } catch (err) {
      if (typeof para1 === "string")
        para1 = "\"" + para1 + "\"";
      if (typeof para2 === "string")
        para2 = "\"" + para2 + "\"";
      if (typeof para3 === "string")
        para3 = "\"" + para3 + "\"";
      if (typeof para4 === "string")
        para4 = "\"" + para4 + "\"";
      console.log(err + "  " + para1 + "\n  " + para2 + "\n  " + para3 + "\n  " + para4);
    } // try - catch(err)
  }; // this.setColor = function(para1, para2, para3, para4) {...};

  /**
   * Method: Check if this color equals to another JsColor
   */
  this.equals = function(jsColor) {
    if (this === jsColor)
      return true;
    if (!jsColor || !(jsColor instanceof JsColor))
      return false;
    return this.getColor() === jsColor.getColor();
  }; // this.equals = function(jsColor) {...};

  /**
   * Method: Hexadecimal representation of the color
   */
  this.toString = function() {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7",
                  "8", "9", "A", "B", "C", "D", "E", "F"];
    var str = "#";
    str += digits[Math.floor(r / 16)] + digits[r % 16];
    str += digits[Math.floor(g / 16)] + digits[g % 16];
    str += digits[Math.floor(b / 16)] + digits[b % 16];
    if (hasAlpha)
      str += digits[Math.floor(Math.round(a * 255) / 16)] + digits[Math.round(a * 255) % 16];
    return str;
  }; // this.toString = function() {...};

  /**
   * Method: Print the color as a string
   */
  this.printColor = function() {
    var str = (hasAlpha) ? "RGBA(" : "RGB(";
    str += r + "," + g + "," + b;
    return (hasAlpha) ? str + "," + a.toFixed(2) + ")" : str + ")";
  }; // this.printColor = function() {...};

  this.setColor(para1, para2, para3, para4);
} // function JsColor(para1, para2, para3, para4)

/**
 * Property: Predefined colors
 */
JsColor.colors = {
  "ALICEBLUE"           : new JsColor(0xF0F8FF), /*   1 */    "ANTIQUEWHITE"     : new JsColor(0xFAEBD7), /*   2 */
  "AQUA"                : new JsColor(0x00FFFF), /*   3 */    "AQUAMARINE"       : new JsColor(0x7FFFD4), /*   4 */
  "AZURE"               : new JsColor(0xF0FFFF), /*   5 */    "BEIGE"            : new JsColor(0xF5F5DC), /*   6 */
  "BISQUE"              : new JsColor(0xFFE4C4), /*   7 */    "BLACK"            : new JsColor(0x000000), /*   8 */
  "BLANCHEDALMOND"      : new JsColor(0xFFEBCD), /*   9 */    "BLUE"             : new JsColor(0x0000FF), /*  10 */
  "BLUEVIOLET"          : new JsColor(0x8A2BE2), /*  11 */    "BROWN"            : new JsColor(0xA52A2A), /*  12 */
  "BURLYWOOD"           : new JsColor(0xDEB887), /*  13 */    "CADETBLUE"        : new JsColor(0x5F9EA0), /*  14 */
  "CHARTREUSE"          : new JsColor(0x7FFF00), /*  15 */    "CHOCOLATE"        : new JsColor(0xD2691E), /*  16 */
  "CORAL"               : new JsColor(0xFF7F50), /*  17 */    "CORNFLOWERBLUE"   : new JsColor(0x6495ED), /*  18 */
  "CORNSILK"            : new JsColor(0xFFF8DC), /*  19 */    "CRIMSON"          : new JsColor(0xDC143C), /*  20 */
  "CYAN"                : new JsColor(0x00FFFF), /*  21 */    "DARKBLUE"         : new JsColor(0x00008B), /*  22 */
  "DARKCYAN"            : new JsColor(0x008B8B), /*  23 */    "DARKGOLDENROD"    : new JsColor(0xB8860B), /*  24 */
  "DARKGRAY"            : new JsColor(0xA9A9A9), /*  25 */    "DARKGREEN"        : new JsColor(0x006400), /*  26 */
  "DARKGREY"            : new JsColor(0xA9A9A9), /*  27 */    "DARKKHAKI"        : new JsColor(0xBDB76B), /*  28 */
  "DARKMAGENTA"         : new JsColor(0x8B008B), /*  29 */    "DARKOLIVEGREEN"   : new JsColor(0x556B2F), /*  30 */
  "DARKORANGE"          : new JsColor(0xFF8C00), /*  31 */    "DARKORCHID"       : new JsColor(0x9932CC), /*  32 */
  "DARKRED"             : new JsColor(0x8B0000), /*  33 */    "DARKSALMON"       : new JsColor(0xE9967A), /*  34 */
  "DARKSEAGREEN"        : new JsColor(0x8FBC8F), /*  35 */    "DARKSLATEBLUE"    : new JsColor(0x483D8B), /*  36 */
  "DARKSLATEGRAY"       : new JsColor(0x2F4F4F), /*  37 */    "DARKSLATEGREY"    : new JsColor(0x2F4F4F), /*  38 */
  "DARKTURQUOISE"       : new JsColor(0x00CED1), /*  39 */    "DARKVIOLET"       : new JsColor(0x9400D3), /*  40 */
  "DEEPPINK"            : new JsColor(0xFF1493), /*  41 */    "DEEPSKYBLUE"      : new JsColor(0x00BFFF), /*  42 */
  "DIMGRAY"             : new JsColor(0x696969), /*  43 */    "DIMGREY"          : new JsColor(0x696969), /*  44 */
  "DODGERBLUE"          : new JsColor(0x1E90FF), /*  45 */    "FIREBRICK"        : new JsColor(0xB22222), /*  46 */
  "FLORALWHITE"         : new JsColor(0xFFFAF0), /*  47 */    "FORESTGREEN"      : new JsColor(0x228B22), /*  48 */
  "FUCHSIA"             : new JsColor(0xFF00FF), /*  49 */    "GAINSBORO"        : new JsColor(0xDCDCDC), /*  50 */
  "GHOSTWHITE"          : new JsColor(0xF8F8FF), /*  51 */    "GOLD"             : new JsColor(0xFFD700), /*  52 */
  "GOLDENROD"           : new JsColor(0xDAA520), /*  53 */    "GRAY"             : new JsColor(0x808080), /*  54 */
  "GREEN"               : new JsColor(0x008000), /*  55 */    "GREENYELLOW"      : new JsColor(0xADFF2F), /*  56 */
  "GREY"                : new JsColor(0x808080), /*  57 */    "HONEYDEW"         : new JsColor(0xF0FFF0), /*  58 */
  "HOTPINK"             : new JsColor(0xFF69B4), /*  59 */    "INDIANRED"        : new JsColor(0xCD5C5C), /*  60 */
  "INDIGO"              : new JsColor(0x4B0082), /*  61 */    "IVORY"            : new JsColor(0xFFFFF0), /*  62 */
  "KHAKI"               : new JsColor(0xF0E68C), /*  63 */    "LAVENDER"         : new JsColor(0xE6E6FA), /*  64 */
  "LAVENDERBLUSH"       : new JsColor(0xFFF0F5), /*  65 */    "LAWNGREEN"        : new JsColor(0x7CFC00), /*  66 */
  "LEMONCHIFFON"        : new JsColor(0xFFFACD), /*  67 */    "LIGHTBLUE"        : new JsColor(0xADD8E6), /*  68 */
  "LIGHTCORAL"          : new JsColor(0xF08080), /*  69 */    "LIGHTCYAN"        : new JsColor(0xE0FFFF), /*  70 */
  "LIGHTGOLDENRODYELLOW": new JsColor(0xFAFAD2), /*  71 */    "LIGHTGRAY"        : new JsColor(0xD3D3D3), /*  72 */
  "LIGHTGREEN"          : new JsColor(0x90EE90), /*  73 */    "LIGHTGREY"        : new JsColor(0xD3D3D3), /*  74 */
  "LIGHTPINK"           : new JsColor(0xFFB6C1), /*  75 */    "LIGHTSALMON"      : new JsColor(0xFFA07A), /*  76 */
  "LIGHTSEAGREEN"       : new JsColor(0x20B2AA), /*  77 */    "LIGHTSKYBLUE"     : new JsColor(0x87CEFA), /*  78 */
  "LIGHTSLATEGRAY"      : new JsColor(0x778899), /*  79 */    "LIGHTSLATEGREY"   : new JsColor(0x778899), /*  80 */
  "LIGHTSTEELBLUE"      : new JsColor(0xB0C4DE), /*  81 */    "LIGHTYELLOW"      : new JsColor(0xFFFFE0), /*  82 */
  "LIME"                : new JsColor(0x00FF00), /*  83 */    "LIMEGREEN"        : new JsColor(0x32CD32), /*  84 */
  "LINEN"               : new JsColor(0xFAF0E6), /*  85 */    "MAGENTA"          : new JsColor(0xFF00FF), /*  86 */
  "MAROON"              : new JsColor(0x800000), /*  87 */    "MEDIUMAQUAMARINE" : new JsColor(0x66CDAA), /*  88 */
  "MEDIUMBLUE"          : new JsColor(0x0000CD), /*  89 */    "MEDIUMORCHID"     : new JsColor(0xBA55D3), /*  90 */
  "MEDIUMPURPLE"        : new JsColor(0x9370DB), /*  91 */    "MEDIUMSEAGREEN"   : new JsColor(0x3CB371), /*  92 */
  "MEDIUMSLATEBLUE"     : new JsColor(0x7B68EE), /*  93 */    "MEDIUMSPRINGGREEN": new JsColor(0x00FA9A), /*  94 */
  "MEDIUMTURQUOISE"     : new JsColor(0x48D1CC), /*  95 */    "MEDIUMVIOLETRED"  : new JsColor(0xC71585), /*  96 */
  "MIDNIGHTBLUE"        : new JsColor(0x191970), /*  97 */    "MINTCREAM"        : new JsColor(0xF5FFFA), /*  98 */
  "MISTYROSE"           : new JsColor(0xFFE4E1), /*  99 */    "MOCCASIN"         : new JsColor(0xFFE4B5), /* 100 */
  "NAVAJOWHITE"         : new JsColor(0xFFDEAD), /* 101 */    "NAVY"             : new JsColor(0x000080), /* 102 */
  "OLDLACE"             : new JsColor(0xFDF5E6), /* 103 */    "OLIVE"            : new JsColor(0x808000), /* 104 */
  "OLIVEDRAB"           : new JsColor(0x6B8E23), /* 105 */    "ORANGE"           : new JsColor(0xFFA500), /* 106 */
  "ORANGERED"           : new JsColor(0xFF4500), /* 107 */    "ORCHID"           : new JsColor(0xDA70D6), /* 108 */
  "PALEGOLDENROD"       : new JsColor(0xEEE8AA), /* 109 */    "PALEGREEN"        : new JsColor(0x98FB98), /* 110 */
  "PALETURQUOISE"       : new JsColor(0xAFEEEE), /* 111 */    "PALEVIOLETRED"    : new JsColor(0xDB7093), /* 112 */
  "PAPAYAWHIP"          : new JsColor(0xFFEFD5), /* 113 */    "PEACHPUFF"        : new JsColor(0xFFDAB9), /* 114 */
  "PERU"                : new JsColor(0xCD853F), /* 115 */    "PINK"             : new JsColor(0xFFC0CB), /* 116 */
  "PLUM"                : new JsColor(0xDDA0DD), /* 117 */    "POWDERBLUE"       : new JsColor(0xB0E0E6), /* 118 */
  "PURPLE"              : new JsColor(0x800080), /* 119 */    "RED"              : new JsColor(0xFF0000), /* 120 */
  "ROSYBROWN"           : new JsColor(0xBC8F8F), /* 121 */    "ROYALBLUE"        : new JsColor(0x4169E1), /* 122 */
  "SADDLEBROWN"         : new JsColor(0x8B4513), /* 123 */    "SALMON"           : new JsColor(0xFA8072), /* 124 */
  "SANDYBROWN"          : new JsColor(0xF4A460), /* 125 */    "SEAGREEN"         : new JsColor(0x2E8B57), /* 126 */
  "SEASHELL"            : new JsColor(0xFFF5EE), /* 127 */    "SIENNA"           : new JsColor(0xA0522D), /* 128 */
  "SILVER"              : new JsColor(0xC0C0C0), /* 129 */    "SKYBLUE"          : new JsColor(0x87CEEB), /* 130 */
  "SLATEBLUE"           : new JsColor(0x6A5ACD), /* 131 */    "SLATEGRAY"        : new JsColor(0x708090), /* 132 */
  "SLATEGREY"           : new JsColor(0x708090), /* 133 */    "SNOW"             : new JsColor(0xFFFAFA), /* 134 */
  "SPRINGGREEN"         : new JsColor(0x00FF7F), /* 135 */    "STEELBLUE"        : new JsColor(0x4682B4), /* 136 */
  "TAN"                 : new JsColor(0xD2B48C), /* 137 */    "TEAL"             : new JsColor(0x008080), /* 138 */
  "THISTLE"             : new JsColor(0xD8BFD8), /* 139 */    "TOMATO"           : new JsColor(0xFF6347), /* 140 */
  "TURQUOISE"           : new JsColor(0x40E0D0), /* 141 */    "VIOLET"           : new JsColor(0xEE82EE), /* 142 */
  "WHEAT"               : new JsColor(0xF5DEB3), /* 143 */    "WHITE"            : new JsColor(0xFFFFFF), /* 144 */
  "WHITESMOKE"          : new JsColor(0xF5F5F5), /* 145 */    "YELLOW"           : new JsColor(0xFFFF00), /* 146 */
  "YELLOWGREEN"         : new JsColor(0x9ACD32), /* 147 */
}; // JsColor.colors = {...};

/**
 * Method: Parse parameters into JsColor
 */
JsColor.parseColor = function(para1, para2, para3, para4) {
  return new JsColor(para1, para2, para3, para4);
}; // JsColor.parseColor = function(para1, para2, para3, para4) {...};
