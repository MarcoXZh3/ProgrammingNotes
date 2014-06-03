/**
 * JavaScript Class - Color
 * @author  Marco
 * @version  1.0
 * @param r        Value of red channel
 * @param g        Value of green channel
 * @param b        Value of blue channel
 * @param a        Value of alpha channel
 */
function JsColor(r, g, b, a) {
    /**
     * Transparent color flag
     */
    var hasAlpha = (a != null && a != undefined);

    /**
     * Alpha value of the color (transparency) -- Bit 24 ~ bit 31 
     */
    var alpha = ((!a) ? 0 : ((a > 0) ? a : -a)) % 256;

    /**
     * Red value of the color -- Bit 16 ~ bit 23
     */
    var red = ((!r) ? 0 : (r > 0) ? r : -r) % 256;
    /**
     * Green value of the color -- Bit 8 ~ bit 15
     */
    var green = ((!g) ? 0 : (g > 0) ? g : -g) % 256;
    /**
     * Blue value of the color -- Bit 0 ~ bit 7
     */
    var blue = ((!b) ? 0 : (b > 0) ? b : -b) % 256;

    /**
     * Set the hex value of the color
     * @param rgba    Hex value to set
     */
    this.setRGBA = function(rgba) {
        if (typeof rgba != 'number') {
            hasAlpha = false;
            alpha = red = green = blue = 0;
        } else {
            var tmp = rgba;
            blue = rgba % 256;
            tmp = Math.floor(tmp / 256);
            green = tmp % 256;
            tmp = Math.floor(tmp / 256);
            red = tmp % 256;
            tmp = Math.floor(tmp / 256);
            if (tmp > 0) {
                alpha = tmp % 256;
                hasAlpha = true;
            } // if ((rgba >> 24) > 0)
        } // else - if
    }; // this.setRGBA = function(rgba)

    if (!g && !b && !a && r)
        this.setRGBA(r);

    /**
     * Get the hex value of the color
     * @returns {Number}    Hex value of the color
     */
    this.getRGBA = function() {
        var rgb = red * 65536 + green * 256 + blue;
        if (hasAlpha)
            rgb += alpha * 16777216;
        return rgb;
    }; // this.getRGBA = function()

    /**
     * Check if the color has alpha channel
     * @returns {Boolean}    True if has alpha channel or false if not
     */
    this.hasAlphaChannel = function() {
        return hasAlpha;
    }; // this.hasAlphaChannel = function()

    /**
     * Get the alpha channel of the color
     * @returns {Number}    Alpha value of the color
     */
    this.getAlpha = function() {
        return (hasAlpha) ? alpha : 0;
    }; // this.getAlpha = function()

    /**
     * Set the alpha channel of the color
     * @param a    Alpha value to set
     */
    this.setAlpha = function(a) {
        if (hasAlpha)
            alpha = ((a > 0) ? a : -a) % 256;
    }; // this.setAlpha = function(a)

    /**
     * Get the red channel of the color
     * @returns  {Number}    Red channel of the color
     */
    this.getRed = function() {
        return red;
    }; // this.getRed = function()

    /**
     * Set the red channel of the color
     * @param r    Red value to set
     */
    this.setRed = function(r) {
        red = ((r > 0) ? r : -r) % 256;
    }; // this.setRed = function(r)

    /**
     * Get the green channel of the color
     * @returns  {Number}    Green channel of the color
     */
    this.getGreen = function() {
        return green;
    }; // this.getGreen = function()

    /**
     * Set the green channel of the color
     * @param g    Green value to set
     */
    this.setGreen = function(g) {
        green = ((g > 0) ? g : -g) % 256;
    }; // this.setGreen = function(g)

    /**
     * Get the blue channel of the color
     * @returns {Number}    Blue chnnel of the color
     */
    this.getBlue = function() {
        return blue;
    }; // this.getBlue = function()

    /**
     * Set the blue channel of the color
     * @param b    Blue value to set
     */
    this.setBlue = function(b) {
        blue = ((b > 0) ? b : -b) % 256;
    }; // this.setBlue = function(b)

    /**
     * Compare two colors
     * @param color        The color to compare with
     * @returns {Boolean}  True if two colors are the same or false if not
     */
    this.equals = function(color) {
        if (this == color)
            return true;
        if (!color || !(color instanceof JsColor))
            return false;
        return this.getRGBA() == color.getRGBA();
    }; // this.equals = function(color)

    /**
     * Convert the JsColor class into string
     * @returns  {String}    String format of JsColor
     */
    this.toString = function() {
        var digits = new Array('0', '1', '2', '3', '4', '5', '6', '7',
                               '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
        var str = '#';
        if (hasAlpha)
            str += digits[Math.floor(alpha / 16)] + digits[alpha % 16];
        str += digits[Math.floor(red / 16)] + digits[red % 16];
        str += digits[Math.floor(green / 16)] + digits[green % 16];
        str += digits[Math.floor(blue / 16)] + digits[blue % 16];
        return str;
    }; // this.toString = function()
} // function JsColor()

JsColor.prototype.AliceBlue             = JsColor.prototype.ALICEBLUE             = new JsColor(0xF0F8FF);    // 1
JsColor.prototype.AntiqueWhite          = JsColor.prototype.ANTIQUEWHITE          = new JsColor(0xFAEBD7);    // 2
JsColor.prototype.Aqua                  = JsColor.prototype.AQUA                  = new JsColor(0x00FFFF);    // 3
JsColor.prototype.Aquamarine            = JsColor.prototype.AQUAMARINE            = new JsColor(0x7FFFD4);    // 4
JsColor.prototype.Azure                 = JsColor.prototype.AZURE                 = new JsColor(0xF0FFFF);    // 5
JsColor.prototype.Beige                 = JsColor.prototype.BEIGE                 = new JsColor(0xF5F5DC);    // 6
JsColor.prototype.Bisque                = JsColor.prototype.BISQUE                = new JsColor(0xFFE4C4);    // 7
JsColor.prototype.Black                 = JsColor.prototype.BLACK                 = new JsColor(0x000000);    // 8
JsColor.prototype.BlanchedAlmond        = JsColor.prototype.BLANCHEDALMOND        = new JsColor(0xFFEBCD);    // 9
JsColor.prototype.Blue                  = JsColor.prototype.BLUE                  = new JsColor(0x0000FF);    // 10
JsColor.prototype.BlueViolet            = JsColor.prototype.BLUEVIOLET            = new JsColor(0x8A2BE2);    // 11
JsColor.prototype.Brown                 = JsColor.prototype.BROWN                 = new JsColor(0xA52A2A);    // 12
JsColor.prototype.BurlyWood             = JsColor.prototype.BURLYWOOD             = new JsColor(0xDEB887);    // 13
JsColor.prototype.CadetBlue             = JsColor.prototype.CADETBLUE             = new JsColor(0x5F9EA0);    // 14
JsColor.prototype.Chartreuse            = JsColor.prototype.CHARTREUSE            = new JsColor(0x7FFF00);    // 15
JsColor.prototype.Chocolate             = JsColor.prototype.CHOCOLATE             = new JsColor(0xD2691E);    // 16
JsColor.prototype.Coral                 = JsColor.prototype.CORAL                 = new JsColor(0xFF7F50);    // 17
JsColor.prototype.CornflowerBlue        = JsColor.prototype.CORNFLOWERBLUE        = new JsColor(0x6495ED);    // 18
JsColor.prototype.Cornsilk              = JsColor.prototype.CORNSILK              = new JsColor(0xFFF8DC);    // 19
JsColor.prototype.Crimson               = JsColor.prototype.CRIMSON               = new JsColor(0xDC143C);    // 20
JsColor.prototype.Cyan                  = JsColor.prototype.CYAN                  = new JsColor(0x00FFFF);    // 21
JsColor.prototype.DarkBlue              = JsColor.prototype.DARKBLUE              = new JsColor(0x00008B);    // 22
JsColor.prototype.DarkCyan              = JsColor.prototype.DARKCYAN              = new JsColor(0x008B8B);    // 23
JsColor.prototype.DarkGoldenRod         = JsColor.prototype.DARKGOLDENROD         = new JsColor(0xB8860B);    // 24
JsColor.prototype.DarkGray              = JsColor.prototype.DARKGRAY              = new JsColor(0xA9A9A9);    // 25
JsColor.prototype.DarkGreen             = JsColor.prototype.DARKGREEN             = new JsColor(0x006400);    // 26
JsColor.prototype.DarkKhaki             = JsColor.prototype.DARKKHAKI             = new JsColor(0xBDB76B);    // 27
JsColor.prototype.DarkMagenta           = JsColor.prototype.DARKMAGENTA           = new JsColor(0x8B008B);    // 28
JsColor.prototype.DarkOliveGreen        = JsColor.prototype.DARKOLIVEGREEN        = new JsColor(0x556B2F);    // 29
JsColor.prototype.DarkOrange            = JsColor.prototype.DARKORANGE            = new JsColor(0xFF8C00);    // 30
JsColor.prototype.DarkOrchid            = JsColor.prototype.DARKORCHID            = new JsColor(0x9932CC);    // 31
JsColor.prototype.DarkRed               = JsColor.prototype.DARKRED               = new JsColor(0x8B0000);    // 32
JsColor.prototype.DarkSalmon            = JsColor.prototype.DARKSALMON            = new JsColor(0xE9967A);    // 33
JsColor.prototype.DarkSeaGreen          = JsColor.prototype.DARKSEAGREEN          = new JsColor(0x8FBC8F);    // 34
JsColor.prototype.DarkSlateBlue         = JsColor.prototype.DARKSLATEBLUE         = new JsColor(0x483D8B);    // 35
JsColor.prototype.DarkSlateGray         = JsColor.prototype.DARKSLATEGRAY         = new JsColor(0x2F4F4F);    // 36
JsColor.prototype.DarkTurquoise         = JsColor.prototype.DARKTURQUOISE         = new JsColor(0x00CED1);    // 37
JsColor.prototype.DarkViolet            = JsColor.prototype.DARKVIOLET            = new JsColor(0x9400D3);    // 38
JsColor.prototype.DeepPink              = JsColor.prototype.DEEPPINK              = new JsColor(0xFF1493);    // 39
JsColor.prototype.DeepSkyBlue           = JsColor.prototype.DEEPSKYBLUE           = new JsColor(0x00BFFF);    // 40
JsColor.prototype.DimGray               = JsColor.prototype.DIMGRAY               = new JsColor(0x696969);    // 41
JsColor.prototype.DodgerBlue            = JsColor.prototype.DODGERBLUE            = new JsColor(0x1E90FF);    // 42
JsColor.prototype.FireBrick             = JsColor.prototype.FIREBRICK             = new JsColor(0xB22222);    // 43
JsColor.prototype.FloralWhite           = JsColor.prototype.FLORALWHITE           = new JsColor(0xFFFAF0);    // 44
JsColor.prototype.ForestGreen           = JsColor.prototype.FORESTGREEN           = new JsColor(0x228B22);    // 45
JsColor.prototype.Fuchsia               = JsColor.prototype.FUCHSIA               = new JsColor(0xFF00FF);    // 46
JsColor.prototype.Gainsboro             = JsColor.prototype.GAINSBORO             = new JsColor(0xDCDCDC);    // 47
JsColor.prototype.GhostWhite            = JsColor.prototype.GHOSTWHITE            = new JsColor(0xF8F8FF);    // 48
JsColor.prototype.Gold                  = JsColor.prototype.GOLD                  = new JsColor(0xFFD700);    // 49
JsColor.prototype.GoldenRod             = JsColor.prototype.GOLDENROD             = new JsColor(0xDAA520);    // 50
JsColor.prototype.Gray                  = JsColor.prototype.GRAY                  = new JsColor(0x808080);    // 51
JsColor.prototype.Green                 = JsColor.prototype.GREEN                 = new JsColor(0x008000);    // 52
JsColor.prototype.GreenYellow           = JsColor.prototype.GREENYELLOW           = new JsColor(0xADFF2F);    // 53
JsColor.prototype.HoneyDew              = JsColor.prototype.HONEYDEW              = new JsColor(0xF0FFF0);    // 54
JsColor.prototype.HotPink               = JsColor.prototype.HOTPINK               = new JsColor(0xFF69B4);    // 55
JsColor.prototype.IndianRed             = JsColor.prototype.INDIANRED             = new JsColor(0xCD5C5C);    // 56
JsColor.prototype.Indigo                = JsColor.prototype.INDIGO                = new JsColor(0x4B0082);    // 57
JsColor.prototype.Ivory                 = JsColor.prototype.IVORY                 = new JsColor(0xFFFFF0);    // 58
JsColor.prototype.Khaki                 = JsColor.prototype.KHAKI                 = new JsColor(0xF0E68C);    // 59
JsColor.prototype.Lavender              = JsColor.prototype.LAVENDER              = new JsColor(0xE6E6FA);    // 60
JsColor.prototype.LavenderBlush         = JsColor.prototype.LAVENDERBLUSH         = new JsColor(0xFFF0F5);    // 61
JsColor.prototype.LawnGreen             = JsColor.prototype.LAWNGREEN             = new JsColor(0x7CFC00);    // 62
JsColor.prototype.LemonChiffon          = JsColor.prototype.LEMONCHIFFON          = new JsColor(0xFFFACD);    // 63
JsColor.prototype.LightBlue             = JsColor.prototype.LIGHTBLUE             = new JsColor(0xADD8E6);    // 64
JsColor.prototype.LightCoral            = JsColor.prototype.LIGHTCORAL            = new JsColor(0xF08080);    // 65
JsColor.prototype.LightCyan             = JsColor.prototype.LIGHTCYAN             = new JsColor(0xE0FFFF);    // 66
JsColor.prototype.LightGoldenRodYellow  = JsColor.prototype.LIGHTGOLDENRODYELLOW  = new JsColor(0xFAFAD2);    // 67
JsColor.prototype.LightGray             = JsColor.prototype.LIGHTGRAY             = new JsColor(0xD3D3D3);    // 68
JsColor.prototype.LightGreen            = JsColor.prototype.LIGHTGREEN            = new JsColor(0x90EE90);    // 69
JsColor.prototype.LightPink             = JsColor.prototype.LIGHTPINK             = new JsColor(0xFFB6C1);    // 70
JsColor.prototype.LightSalmon           = JsColor.prototype.LIGHTSALMON           = new JsColor(0xFFA07A);    // 71
JsColor.prototype.LightSeaGreen         = JsColor.prototype.LIGHTSEAGREEN         = new JsColor(0x20B2AA);    // 72
JsColor.prototype.LightSkyBlue          = JsColor.prototype.LIGHTSKYBLUE          = new JsColor(0x87CEFA);    // 73
JsColor.prototype.LightSlateGray        = JsColor.prototype.LIGHTSLATEGRAY        = new JsColor(0x778899);    // 74
JsColor.prototype.LightSteelBlue        = JsColor.prototype.LIGHTSTEELBLUE        = new JsColor(0xB0C4DE);    // 75
JsColor.prototype.LightYellow           = JsColor.prototype.LIGHTYELLOW           = new JsColor(0xFFFFE0);    // 76
JsColor.prototype.Lime                  = JsColor.prototype.LIME                  = new JsColor(0x00FF00);    // 77
JsColor.prototype.LimeGreen             = JsColor.prototype.LIMEGREEN             = new JsColor(0x32CD32);    // 78
JsColor.prototype.Linen                 = JsColor.prototype.LINEN                 = new JsColor(0xFAF0E6);    // 79
JsColor.prototype.Magenta               = JsColor.prototype.MAGENTA               = new JsColor(0xFF00FF);    // 80
JsColor.prototype.Maroon                = JsColor.prototype.MAROON                = new JsColor(0x800000);    // 81
JsColor.prototype.MediumAquaMarine      = JsColor.prototype.MEDIUMAQUAMARINE      = new JsColor(0x66CDAA);    // 82
JsColor.prototype.MediumBlue            = JsColor.prototype.MEDIUMBLUE            = new JsColor(0x0000CD);    // 83
JsColor.prototype.MediumOrchid          = JsColor.prototype.MEDIUMORCHID          = new JsColor(0xBA55D3);    // 84
JsColor.prototype.MediumPurple          = JsColor.prototype.MEDIUMPURPLE          = new JsColor(0x9370DB);    // 85
JsColor.prototype.MediumSeaGreen        = JsColor.prototype.MEDIUMSEAGREEN        = new JsColor(0x3CB371);    // 86
JsColor.prototype.MediumSlateBlue       = JsColor.prototype.MEDIUMSLATEBLUE       = new JsColor(0x7B68EE);    // 87
JsColor.prototype.MediumSpringGreen     = JsColor.prototype.MEDIUMSPRINGGREEN     = new JsColor(0x00FA9A);    // 88
JsColor.prototype.MediumTurquoise       = JsColor.prototype.MEDIUMTURQUOISE       = new JsColor(0x48D1CC);    // 89
JsColor.prototype.MediumVioletRed       = JsColor.prototype.MEDIUMVIOLETRED       = new JsColor(0xC71585);    // 90
JsColor.prototype.MidnightBlue          = JsColor.prototype.MIDNIGHTBLUE          = new JsColor(0x191970);    // 91
JsColor.prototype.MintCream             = JsColor.prototype.MINTCREAM             = new JsColor(0xF5FFFA);    // 92
JsColor.prototype.MistyRose             = JsColor.prototype.MISTYROSE             = new JsColor(0xFFE4E1);    // 93
JsColor.prototype.Moccasin              = JsColor.prototype.MOCCASIN              = new JsColor(0xFFE4B5);    // 94
JsColor.prototype.NavajoWhite           = JsColor.prototype.NAVAJOWHITE           = new JsColor(0xFFDEAD);    // 95
JsColor.prototype.Navy                  = JsColor.prototype.NAVY                  = new JsColor(0x000080);    // 96
JsColor.prototype.OldLace               = JsColor.prototype.OLDLACE               = new JsColor(0xFDF5E6);    // 97
JsColor.prototype.Olive                 = JsColor.prototype.OLIVE                 = new JsColor(0x808000);    // 98
JsColor.prototype.OliveDrab             = JsColor.prototype.OLIVEDRAB             = new JsColor(0x6B8E23);    // 99
JsColor.prototype.Orange                = JsColor.prototype.ORANGE                = new JsColor(0xFFA500);    // 100
JsColor.prototype.OrangeRed             = JsColor.prototype.ORANGERED             = new JsColor(0xFF4500);    // 101
JsColor.prototype.Orchid                = JsColor.prototype.ORCHID                = new JsColor(0xDA70D6);    // 102
JsColor.prototype.PaleGoldenRod         = JsColor.prototype.PALEGOLDENROD         = new JsColor(0xEEE8AA);    // 103
JsColor.prototype.PaleGreen             = JsColor.prototype.PALEGREEN             = new JsColor(0x98FB98);    // 104
JsColor.prototype.PaleTurquoise         = JsColor.prototype.PALETURQUOISE         = new JsColor(0xAFEEEE);    // 105
JsColor.prototype.PaleVioletRed         = JsColor.prototype.PALEVIOLETRED         = new JsColor(0xDB7093);    // 106
JsColor.prototype.PapayaWhip            = JsColor.prototype.PAPAYAWHIP            = new JsColor(0xFFEFD5);    // 107
JsColor.prototype.PeachPuff             = JsColor.prototype.PEACHPUFF             = new JsColor(0xFFDAB9);    // 108
JsColor.prototype.Peru                  = JsColor.prototype.PERU                  = new JsColor(0xCD853F);    // 109
JsColor.prototype.Pink                  = JsColor.prototype.PINK                  = new JsColor(0xFFC0CB);    // 110
JsColor.prototype.Plum                  = JsColor.prototype.PLUM                  = new JsColor(0xDDA0DD);    // 111
JsColor.prototype.PowderBlue            = JsColor.prototype.POWDERBLUE            = new JsColor(0xB0E0E6);    // 112
JsColor.prototype.Purple                = JsColor.prototype.PURPLE                = new JsColor(0x800080);    // 113
JsColor.prototype.Red                   = JsColor.prototype.RED                   = new JsColor(0xFF0000);    // 114
JsColor.prototype.RosyBrown             = JsColor.prototype.ROSYBROWN             = new JsColor(0xBC8F8F);    // 115
JsColor.prototype.RoyalBlue             = JsColor.prototype.ROYALBLUE             = new JsColor(0x4169E1);    // 116
JsColor.prototype.SaddleBrown           = JsColor.prototype.SADDLEBROWN           = new JsColor(0x8B4513);    // 117
JsColor.prototype.Salmon                = JsColor.prototype.SALMON                = new JsColor(0xFA8072);    // 118
JsColor.prototype.SandyBrown            = JsColor.prototype.SANDYBROWN            = new JsColor(0xF4A460);    // 119
JsColor.prototype.SeaGreen              = JsColor.prototype.SEAGREEN              = new JsColor(0x2E8B57);    // 120
JsColor.prototype.SeaShell              = JsColor.prototype.SEASHELL              = new JsColor(0xFFF5EE);    // 121
JsColor.prototype.Sienna                = JsColor.prototype.SIENNA                = new JsColor(0xA0522D);    // 122
JsColor.prototype.Silver                = JsColor.prototype.SILVER                = new JsColor(0xC0C0C0);    // 123
JsColor.prototype.SkyBlue               = JsColor.prototype.SKYBLUE               = new JsColor(0x87CEEB);    // 124
JsColor.prototype.SlateBlue             = JsColor.prototype.SLATEBLUE             = new JsColor(0x6A5ACD);    // 125
JsColor.prototype.SlateGray             = JsColor.prototype.SLATEGRAY             = new JsColor(0x708090);    // 126
JsColor.prototype.Snow                  = JsColor.prototype.SNOW                  = new JsColor(0xFFFAFA);    // 127
JsColor.prototype.SpringGreen           = JsColor.prototype.SPRINGGREEN           = new JsColor(0x00FF7F);    // 128
JsColor.prototype.SteelBlue             = JsColor.prototype.STEELBLUE             = new JsColor(0x4682B4);    // 129
JsColor.prototype.Tan                   = JsColor.prototype.TAN                   = new JsColor(0xD2B48C);    // 130
JsColor.prototype.Teal                  = JsColor.prototype.TEAL                  = new JsColor(0x008080);    // 131
JsColor.prototype.Thistle               = JsColor.prototype.THISTLE               = new JsColor(0xD8BFD8);    // 132
JsColor.prototype.Tomato                = JsColor.prototype.TOMATO                = new JsColor(0xFF6347);    // 133
JsColor.prototype.Turquoise             = JsColor.prototype.TURQUOISE             = new JsColor(0x40E0D0);    // 134
JsColor.prototype.Violet                = JsColor.prototype.VIOLET                = new JsColor(0xEE82EE);    // 135
JsColor.prototype.Wheat                 = JsColor.prototype.WHEAT                 = new JsColor(0xF5DEB3);    // 136
JsColor.prototype.White                 = JsColor.prototype.WHITE                 = new JsColor(0xFFFFFF);    // 137
JsColor.prototype.WhiteSmoke            = JsColor.prototype.WHITESMOKE            = new JsColor(0xF5F5F5);    // 138
JsColor.prototype.Yellow                = JsColor.prototype.YELLOW                = new JsColor(0xFFFF00);    // 139
JsColor.prototype.YellowGreen           = JsColor.prototype.YELLOWGREEN           = new JsColor(0x9ACD32);    // 140

JsColor.prototype.colorNames = new Array(
    'aliceblue',       'antiquewhite',          'aqua',               'aquamarine',       'azure',
    'beige',           'bisque',                'black',              'blanchedalmond',   'blue',
    'blueviolet',      'brown',                 'burlywood',          'cadetblue',        'chartreuse',
    'chocolate',       'coral',                 'cornflowerblue',     'cornsilk',         'crimson',
    'cyan',            'darkblue',              'darkcyan',           'darkgoldenrod',    'darkgray',
    'darkgreen',       'darkkhaki',             'darkmagenta',        'darkolivegreen',   'darkorange',
    'darkorchid',      'darkred',               'darksalmon',         'darkseagreen',     'darkslateblue',
    'darkslategray',   'darkturquoise',         'darkviolet',         'deeppink',         'deepskyblue',
    'dimgray',         'dodgerblue',            'firebrick',          'floralwhite',      'forestgreen',
    'fuchsia',         'gainsboro',             'ghostwhite',         'gold',             'goldenrod',
    'gray',            'green',                 'greenyellow',        'honeydew',         'hotpink',
    'indianred',       'indigo',                'ivory',              'khaki',            'lavender',
    'lavenderblush',   'lawngreen',             'lemonchiffon',       'lightblue',        'lightcoral',
    'lightcyan',       'lightgoldenrodyellow',  'lightgray',          'lightgreen',       'lightpink',
    'lightsalmon',     'lightseagreen',         'lightskyblue',       'lightslategray',   'lightsteelblue',
    'lightyellow',     'lime',                  'limegreen',          'linen',            'magenta',
    'maroon',          'mediumaquamarine',      'mediumblue',         'mediumorchid',     'mediumpurple',
    'mediumseagreen',  'mediumslateblue',       'mediumspringgreen',  'mediumturquoise',  'mediumvioletred',
    'midnightblue',    'mintcream',             'mistyrose',          'moccasin',         'navajowhite',
    'navy',            'oldlace',               'olive',              'olivedrab',        'orange',
    'orangered',       'orchid',                'palegoldenrod',      'palegreen',        'paleturquoise',
    'palevioletred',   'papayawhip',            'peachpuff',          'peru',             'pink',
    'plum',            'powderblue',            'purple',             'red',              'rosybrown',
    'royalblue',       'saddlebrown',           'salmon',             'sandybrown',       'seagreen',
    'seashell',        'sienna',                'silver',             'skyblue',          'slateblue',
    'slategray',       'snow',                  'springgreen',        'steelblue',        'tan',
    'teal',            'thistle',               'tomato',             'turquoise',        'violet',
    'wheat',           'white',                 'whitesmoke',         'yellow',           'yellowgreen'
); // JsColor.prototype.colorNames = new Array(...);

JsColor.prototype.colorValues = new Array(
    0xF0F8FF,        0xFAEBD7,        0x00FFFF,        0x7FFFD4,        0xF0FFFF,
    0xF5F5DC,        0xFFE4C4,        0x000000,        0xFFEBCD,        0x0000FF,
    0x8A2BE2,        0xA52A2A,        0xDEB887,        0x5F9EA0,        0x7FFF00,
    0xD2691E,        0xFF7F50,        0x6495ED,        0xFFF8DC,        0xDC143C,
    0x00FFFF,        0x00008B,        0x008B8B,        0xB8860B,        0xA9A9A9,
    0x006400,        0xBDB76B,        0x8B008B,        0x556B2F,        0xFF8C00,
    0x9932CC,        0x8B0000,        0xE9967A,        0x8FBC8F,        0x483D8B,
    0x2F4F4F,        0x00CED1,        0x9400D3,        0xFF1493,        0x00BFFF,
    0x696969,        0x1E90FF,        0xB22222,        0xFFFAF0,        0x228B22,
    0xFF00FF,        0xDCDCDC,        0xF8F8FF,        0xFFD700,        0xDAA520,
    0x808080,        0x008000,        0xADFF2F,        0xF0FFF0,        0xFF69B4,
    0xCD5C5C,        0x4B0082,        0xFFFFF0,        0xF0E68C,        0xE6E6FA,
    0xFFF0F5,        0x7CFC00,        0xFFFACD,        0xADD8E6,        0xF08080,
    0xE0FFFF,        0xFAFAD2,        0xD3D3D3,        0x90EE90,        0xFFB6C1,
    0xFFA07A,        0x20B2AA,        0x87CEFA,        0x778899,        0xB0C4DE,
    0xFFFFE0,        0x00FF00,        0x32CD32,        0xFAF0E6,        0xFF00FF,
    0x800000,        0x66CDAA,        0x0000CD,        0xBA55D3,        0x9370DB,
    0x3CB371,        0x7B68EE,        0x00FA9A,        0x48D1CC,        0xC71585,
    0x191970,        0xF5FFFA,        0xFFE4E1,        0xFFE4B5,        0xFFDEAD,
    0x000080,        0xFDF5E6,        0x808000,        0x6B8E23,        0xFFA500,
    0xFF4500,        0xDA70D6,        0xEEE8AA,        0x98FB98,        0xAFEEEE,
    0xDB7093,        0xFFEFD5,        0xFFDAB9,        0xCD853F,        0xFFC0CB,
    0xDDA0DD,        0xB0E0E6,        0x800080,        0xFF0000,        0xBC8F8F,
    0x4169E1,        0x8B4513,        0xFA8072,        0xF4A460,        0x2E8B57,
    0xFFF5EE,        0xA0522D,        0xC0C0C0,        0x87CEEB,        0x6A5ACD,
    0x708090,        0xFFFAFA,        0x00FF7F,        0x4682B4,        0xD2B48C,
    0x008080,        0xD8BFD8,        0xFF6347,        0x40E0D0,        0xEE82EE,
    0xF5DEB3,        0xFFFFFF,        0xF5F5F5,        0xFFFF00,        0x9ACD32
  ); // JsColor.prototype.colorValues = new Array(...);

/**
 * Parse a string to a JsColor depending on the string's content contains:<br/>
 * - Only a decimal number: the color whose RGB value equals to it;<br/>
 * - A RGBA value group "RGBA(?, ?, ?, ?)": the color whose red, green, blue and
 *     alpha (if there is a fourth number) values equal to them;<br/>
 * - A hexadecimal number: the color whose RGB(A) value equals to it;<br/>
 * - A supported color name: the specific color;<br/>
 * - Others: An empty color (black).
 * @param str             Value of the color to be parsed
 * @returns  {JsColor}    new color with the given value
 */
JsColor.prototype.parseColor = function(str) {
    if (typeof str != 'string')
        return new JsColor();

    var value = str.trim().toLowerCase();
    if (value == '')
        return new JsColor();

    if (value.match(/\D/) == null)                                                  // Number string
        return new JsColor(parseInt(value));
    var rgb = value.match(/\d{1,}\b/g);
    if (rgb != null && (rgb.length == 3 || rgb.length == 4)) {                      // RGB(A) value group
        var hex = (rgb.length == 3) ?
                    (parseInt(rgb[0])<<16) | (parseInt(rgb[1])<<8) | parseInt(rgb[2]) :
                    (parseInt(rgb[0])<<16) | (parseInt(rgb[1])<<8) | parseInt(rgb[2]) | (parseInt(rgb[3])<<24);
        return new JsColor(hex);
    } // if (rgb != null && (rgb.length == 3 || rgb.length == 4))

    var rgb = value.match(/#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})\b/);  // Hexadecimal Color value
    if (rgb != null) {
        rgb = rgb[0].substring(1);
        if (rgb.length == 3)
            rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2];
        else if (rgb.length == 4)
            rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2] + rgb[3] + rgb[3];
        return new JsColor(parseInt(rgb, 16));
    } // if (rgb != null)

    for (var i = 0; i < JsColor.prototype.colorNames.length; i++)                   // Supported color name
        if (value == JsColor.prototype.colorNames[i])
            return new JsColor(JsColor.prototype.colorValues[i]);

    return new JsColor();                                                           // Others
}; // JsColor.prototype.parseColor = function(str)