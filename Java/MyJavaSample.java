/*                    MyJavaSample:    Basic Syntax about
                                       Java Structured Programming Language
 =======================================================================================================
    * Textbook: Introduction to Java Programming 8th Edition
    * Author: Y. Daniel Liang
    * Indexes:
    >> JOptionPane (1): showMessageDialog()    ---------------------------------------    A13
        >> Line: 213
    >> Long String in different Lines    ---------------------------------------------    A20
        >> Line: 74; 83; 103
    >> the Scanner    ----------------------------------------------------------------    A21
        >> Line: 59, 107
    >> Numeric Variables' Value Range    ---------------------------------------------    Supplement E, A25
        >> Line: 246
    >> Current System Time: System.currentTimeMillis()    ----------------------------    A29
        >> Line: 231
    >> The Math Class (No explicit import)    ----------------------------------------    A35
    >> Escape Characters    ----------------------------------------------------------    A36
        >> Line: 283
    >> Convert Numeric Strings to Numbers    -----------------------------------------    A44
        >> Line: 113
    >> JOptionPane (2): showInputDialog()    -----------------------------------------    A44
        >> Line: 122
    >> Random Numbers: Math.random()    ----------------------------------------------    A64
        >> Line: 81; 220
    >> Format Identifiers    ---------------------------------------------------------    A76
        >> Line: 300
    >> JOptionPane (3): showConfirmDialog()    ---------------------------------------    A78
        >> Line: 86
    >> Regular Array's Length: theArray.length    ------------------------------------    A159
        >> Line: 212
    >> Array Initialing Syntax    ----------------------------------------------------    A160
        >> Line: 67
    >> To Print a Character Array (char[])    ----------------------------------------    A160-161
        >> Line: 217
    >> Traverse Arrays with Syntax for-each    ---------------------------------------    A161-162
        >> Line: 200
    >> Memory Copy of Arrays    ------------------------------------------------------    A166
        >> Line: 162; 171; 180; 189
    >> Variable Argues List of Functions    ------------------------------------------    A172
        >> Line: 82; 204
    >> The ArrayList Class    --------------------------------------------------------    A178
        >> Line: 68
    >> The Ragged Array        ------------------------------------------------------    A190
        >> Line: 142
*/

import java.util.ArrayList;
import java.util.Scanner;
import javax.swing.JOptionPane;

/**
 * Basic Syntax about Java Structured Programming Language
 * To Draw a Multiply Table and Display a Range of Random Numbers
 * @author    Marco
 * @version    1.0.0.0
*/
public class MyJavaSample {

    private static Scanner input = new Scanner(System.in);

    /**
     * The Main Entry
     * @param args              (<code>String[]</code>) Command Line argues
     */
    public static void main(String[] args) {
        int nFormat[] = {1, 'A' - '\0'};                                  // Initialize the array
        ArrayList<String> strExpressions = new ArrayList<>();             //the ArrayList Class
        String str;
        int nLoop = JOptionPane.CANCEL_OPTION;
        do {
            System.out.println();
            System.out.println("        JavaDemo 1: Multiply Table within 5");
            System.out.println("===============================" +       // Long string in different Lines
                               "================================");
            /* Acquire the range and the layout */
            nFormat = updateFormat(nFormat);
            /* Generate the Multiply Table */
            calculateTable(nFormat[0], nFormat[1], strExpressions);
            /* Print the Multiply Table and random numbers */
            str = "rand = min + Math.random() * (max - min);\nmin <= rand < max";
            printTable(strExpressions, str.toCharArray());            // Variable argues List
            System.out.println("===============================" +     // Long string in different Lines
                               "================================");
            str = theCurrentTime() + "\nContinue?";
            nLoop = JOptionPane.showConfirmDialog(null, str,
                                                  "JOptionPane.showConfirmDialog",
                                                  JOptionPane.OK_OPTION,
                                                  JOptionPane.PLAIN_MESSAGE);
        }while(nLoop == JOptionPane.OK_OPTION);
        System.exit(0);        // 0 means a normal Termination 
    }// public static void main(String[] args)

    /** Acquire the Range and the Layout
     * @param nFormat           (<code>int[]</code>) Multiply Table Parameters (Initial Value will be ignored)
     * @return                  (<code>int[]</code>) New Multiply Table Parameters (Will be used to Print the Table)
     */
    public static int[] updateFormat(int[] nFormat) {
        String strText, strMessage = "";
        /* Update the nFormat[0] */
        do {
            if ( (nFormat[0] <= 0) || (nFormat[0] >= 5) )
                strMessage = "The range " + nFormat[0] +     // Long string in different Lines
                             " is NOT valid. Please re-enter a number\n";
            strMessage += "Please input a range (within 5)";
            System.out.print(strMessage);
            strText = input.nextLine();                    // the Scanner
            if (strText == null)
                System.exit(0);
            if ( strText.equals("") )
                nFormat[0] = 0;
            else
                nFormat[0] = Integer.parseInt(strText);    // Convert the numeric strings to a number
        } while ( (nFormat[0] <= 0) || (nFormat[0] >= 5) );

        /* Update the nFormat[1] */
        strMessage = "";
        do {
            if ( (nFormat[1] < ('A' - '\0') ) || (nFormat[1] > ('D'- '\0') ) )
                strMessage = "The layout is NOT valid. Please re-enter\n";
            strMessage += "Please select a layout:\n  A. L-T    B. L-B\n  C. R-B    D. R-T";
            strText = JOptionPane.showInputDialog(null, strMessage, 
                                                  "JOptionPane.showInputDialog",
                                                  JOptionPane.INFORMATION_MESSAGE); 
            if (strText == null)
                System.exit(0);
            if ( strText.equals("") )
                nFormat[1] = -1;
            else
                nFormat[1] = strText.toUpperCase().charAt(0) - '\0';
        } while ( (nFormat[1] < ('A' - '\0') ) || (nFormat[1] > ('D'- '\0') ) );
        return nFormat;
    }// public static int[] updateFormat(int[] nFormat)

    /** Generate the Multiply Table
     * @param nDimension        (<code>int</code>) Range of the Multiply Table
     * @param nLayout           (<code>int</code>) Layout of the Multiply Table
     * @param strExpressions    (<code>ArrayList&lt;String&gt;</code>) The expressions' String Array
     */
    public static void calculateTable(int nDimension, int nLayout, ArrayList<String> strExpressions) {
        String strText;
        int[][] nResult = new int[nDimension][];            // Initialize a ragged array
        for (int i = 0; i < nDimension; i++)                // this array is not used in this demo
            nResult[i] = new int[i+1];

        /* First: generate a expressions square matrix sized nDimension * nDimension */
        strExpressions.clear();
        for (int i = 0; i < nDimension; i++) {
            strText = "";
            for (int j = 0; j < nDimension; j++)
                strText += String.format("%2d * %2d = %2d\t", (i + 1), (j + 1), (i+1) * (j+1));
            strExpressions.add(strText);
        } // for (int i = 0; i < nDimension; i++)

        /* Second: according to the layout, cover useless expressions with spaces */
        char[] chSrc = "            ".toCharArray(), chTar;
        switch (nLayout) {
            case ('A' - '\0'):
                for (int i = 0; i < nDimension; i++) {
                    for (int j = nDimension - i; j < nDimension; j++) {
                        chTar = strExpressions.get(i).toCharArray();
                        System.arraycopy(chSrc, 0, chTar, j * 13, 12);    // Memory Copy of Arrays
                        strExpressions.set(i, new String(chTar));
                    }// for (int j = 0; j < nDimension; j++)
                }// for (int i = 0; i < nDimension; i++)
                break;
            case ('B' - '\0'):
                for (int i = 0; i < nDimension; i++) {
                    for (int j = i+1; j < nDimension; j++) {
                        chTar = strExpressions.get(i).toCharArray();
                        System.arraycopy(chSrc, 0, chTar, j * 13, 12);    // Memory Copy of Arrays
                        strExpressions.set(i, new String(chTar));
                    }// for (int j = 0; j < nDimension; j++)
                }// for (int i = 0; i < nDimension; i++)
                break;
            case ('C' - '\0'):
                for (int i = 0; i < nDimension; i++) {
                    for (int j = 0; j < nDimension - i - 1; j++) {
                        chTar = strExpressions.get(i).toCharArray();
                        System.arraycopy(chSrc, 0, chTar, j * 13, 12);    // Memory Copy of Arrays
                        strExpressions.set(i, new String(chTar));
                    }// for (int j = 0; j < nDimension; j++)
                }// for (int i = 0; i < nDimension; i++)
                break;
            case ('D' - '\0'):
                for (int i = 0; i < nDimension; i++) {
                    for (int j = 0; j < i; j++) {
                        chTar = strExpressions.get(i).toCharArray();
                        System.arraycopy(chSrc, 0, chTar, j * 13, 12);    // Memory Copy of Arrays
                        strExpressions.set(i, new String(chTar));
                    }// for (int j = 0; j < nDimension; j++)
                }// for (int i = 0; i < nDimension; i++)
                break;
            default:
                System.out.println("default");
                break;
        }// switch case(nLayout)
    }// public static void calculateTable(int nDimension, int nLayout, ArrayList<String> strExpressions)

    /** Print the Multiply Table and Random Numbers
     * @param strExpressions    (<code>ArrayList&lt;String&gt;</code>) String Array of the expressions
     * @param charFormation     (<code>char...</code>) Expression of the Randomizing Formula
     */
    public static void printTable(ArrayList<String> strExpressions, char... charFormation) {
        char[] charExpression;
        for (int i = 0; i < strExpressions.size(); i++) {
            charExpression = strExpressions.get(i).toCharArray();
            for (char c: charExpression)                        // the for-each loop
                System.out.print(c);
            System.out.println();
        }// for (int i = 0; i < strExpressions.size(); i++)
        if (charFormation.length != 0) {                        // acquire a regular array's length
            JOptionPane.showMessageDialog(null, new String(charFormation),
                                          "JOptionPane.showMessageDialog",
                                          JOptionPane.PLAIN_MESSAGE); 
            System.out.println("====================  Random Numbers Demo  ====================");
            System.out.println(charFormation);                // print a char[] array
            System.out.println("Instances: nMin = 10; nMax = 20;");
            for (int i = 0; i < 100; i++) {
                System.out.print("  " + (int)(10 + Math.random() * (20 - 10)) );
                if (((i+1) % 10) == 0)                        // 10 <= the int < 20
                    System.out.println();
            }// for (int i = 0; i < 100; i++)
        }// if (charFormation.length != 0)
    }// public static void printTable(ArrayList<String> strExpressions, char... charFormation)

    /** Acquire current system time
     * @return                  (<code>String</code>) Current time in string
     */
    public static String theCurrentTime() {
        long totalMilliseconds = System.currentTimeMillis();
        /* milliseconds ever since 1970/01/01, 0:00:00 */
        long totalSeconds = totalMilliseconds / 1000;
        long currentSecond = totalSeconds % 60;
        long totalMinutes = totalSeconds / 60;
        long currentMinute = totalMinutes % 60;
        long totalHours = totalMinutes / 60;
        long currentHour = (totalHours % 24 - 7) % 24;            // "- 7" converts GMT to Canada time
        String str = String.format("Current Time (Standard) is: %2d:%2d:%2d", (int)currentHour,
                                   (int)currentMinute, (int)currentSecond);
        return str;
    }// public String theCurrentTime()

}// public class MyJavaSample

/*                        Numeric Variables' Value Range (IEEE 754)
=======================================================================================================
    Type            Size                            Range
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    byte            8-bit Signed Integer            -2^7 (-128) ~ 2^7 - 1 (127)
    short           16-bit Signed Integer           -2^15 (-32768) ~ 2^15 - 1 (32767)
    int             32-bit Signed Integer           -2^31 (-2147483648) ~ 2^31 - 1 (2147483647)
    long            64-bit Signed Integer           -2^63 ~ 2^63 - 1
    float           32-bit Decimal (IEEE 754)       Negative:    -3.4028235E+38 ~ -1.4E-45
                                                    Positive:    1.4E-45 ~ 3.4028235E+38
    double          64-bit Decimal    (IEEE 754)    Negative:    -1.7976931348623157E+308 ~ -4.9E-324
                                                    Positive:    4.9E-324 ~ 1.7976931348623157E+308
=======================================================================================================
*/

/*                                Exceptional Float Values
* Integers divided by 0 are invalid, causing exception: ArithmeticException
* Float Numbers divided by 0 are valid. And the results include the following 3 conditions:
* >> POSITIVE_INFINITY: Positive float numbers divided by 0;
* >> NEGATIVE_INFINITY: Negative float numbers divided by 0;
* >> NaN:    the float number 0.0 divided by 0.
 *                        Basic Arithmetic of Exceptional Float Numbers
=======================================================================================================
        X            Y            X + Y        X - Y        X * Y        X / Y        X % Y
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        Finite       P/N 0.0     Finite        Finite       P/N 0.0      P/N INFI     NaN
        Finite       P/N INFI    P/N INFI      Infinite     P/N 0.0      P/N 0.0      X
        P/N 0.0      P/N 0.0     P/N 0.0       P/N 0.0      P/N 0.0      NaN          NaN
        P/N INFI     Finite      P/N INFI      P/N INFI     P/N 0.0      P/N INFI     NaN
        P/N INFI     P/N INFI    P/N INFI      Infinite     P/N 0.0      NaN          NaN
        P/N 0.0      P/N INFI    P/N INFI      P/N 0.0      NaN          P/N 0.0      P/N 0.0
        NaN          AnyValue    NaN           NaN          NaN          NaN          NaN
        AnyValue     NaN         NaN           NaN          NaN          NaN          NaN
=======================================================================================================
* Note: if one of the operators is a NaN, the result will always be NaN.
*/

/*                                Escape Characters
=======================================================================================================
        Type            Escape Characters        Name                  UNICODE
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        Controls        \b                    Backspace                \u0008
                        \t                    Tab                      \u0009
                        \n                    Linefeed                 \u000A
                        \f                    FormFeed                 \u000C
                        \r                    CarriageReturn           \u000D
        Exceptions      \\                    Backslash                \u005C
                        \"                    DoubleQuotation          \u0022
                        \'                    SingleQuotation          \u0027
                        \0                    Null                     \u0000
        Octal           \000 ~ \377           0 ~ 255                  NoValue
=======================================================================================================
*/

/*                                Format Identifiers
=======================================================================================================
        Identifier    Description        Identifier    Description
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        %c            Character          %d            Integer (Decimal)
        %s            String             %f            Float Value (Decimal)
        %b            Boolean            %e(%E)        Float Value with Scientific Notation (Decimal)
        %%            Percentage (%)     %o            Integer (Octal)
        %n            Linefeed           %x            Integer (Hexadecimal)
=======================================================================================================
* Samples:
* >> %5c     Characters. Add spaces before (Right-Alignment) to reach length 5
* >> %-5c    Characters. Add spaces afterwards (Left-Alignment) to reach length 5
* >> %10s    String. Add spaces before (Right-Alignment) to reach length 10
* >> %-10s   String. Add spaces afterwards (Left-Alignment) to reach length 10
* >> %3b     Output "true" or "false". Right-Alignment. Ignore length limit
* >> %-8b    Output "true" or "false". Left-Alignment. Ignore length limit
* >> %5d     Integer. Add spaces before (Right-Alignment). Ignore length limit if too long
* >> %-5d    Integer. Add spaces afterwards (Left-Alignment). Ignore length limit if too long
* >> %05d    Integer. Add 0s before (Right-Alignment). Ignore length limit if too long
*            Note: %-05d is invalid and will cause exception thrown
* >> %.2f    Float Value. Set decimal part length to 2. 
*            Round off if decimal part longer than 2.
* >> %08.2f  Float Value. Add 0s before (Right-Alignment) to reach total length of 8 including
*            decimal point and decimal part length of 2. 
*            Round off if decimal part longer than 2. Ignore if integer part longer than 5
*            Note: %-08.2f is invalid and will cause exception thrown
* >> %-8.2f  Float Value. Add spaces afterwards (Left-Alignment) to reach total length of 8 including
*            decimal point and decimal part length of 2. 
*            Round off if decimal part longer than 2. Ignore if integer part longer than 5
* >> %08.2e  Similar with %08.2f. Exponent part length of 2
* >> %-8.2E  Similar with %-8.2f. Exponent part length of 2
*/
