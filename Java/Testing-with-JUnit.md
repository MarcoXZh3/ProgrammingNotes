A JUnit test case defines the fixture to run multiple tests. To define a test case:

  1. Implement a subclass of ```junit.framework.TestCase```;

  2. Define instance variables that store the state of the fixture;

  3. Initialize the fixture state by overriding ```junit.framework.TestCase.setUp()```;

  4. Clean-up after a test by overriding ```junit.framework.TestCase.tearDown()```.


Getting ready
=============

1. Create new Java project “JUnitTestSample” in Eclipse.
  
2. Add JUnit library to the project build path:
  
  - Right click the project in the “**Package explorer**” View and select
    “**Build Path**” -> “**Add Libraries…**”

  - In the pop-up dialog, select “**JUnit**” and click “**Next**”.

  - You will accept the default version of JUnit (currently JUnit 4) and click “**Finish**”.


Create new class for testing
============================

In the default source folder “**src**”, create a new class ```Addition``` as follows
(You can find the source code of it [here] [1]):

```java
package source;

/**
 * Addition implementation for testing
 * @author Marco
 * @version    1.0.0.0
 */
public class Addition {

   /**
    * Margin of error
    */
   public final double EPSILON = 1E-10;

   /**
    * Adding two numbers
    * @param d1    (<code>double</code>) first number
    * @param d2    (<code>double</code>) second number
    * @return      (<code>double</code>) summation
    */
   public double add(double d1, double d2) {
       return d1 + d2;
   } // public double add(double d1, double d2)

   /**
    * Adding two array of numbers
    * @param d1    (<code>double[]</code>) first array of numbers
    * @param d2    (<code>double[]</code>) second array of numbers
    * @return      (<code>double[]</code>) array of summations
    */
   public double[] add(double[] d1, double[] d2) {
       if (d1.length != d2.length)
           return null;
       double[] result = new double[d1.length];
       for (int i = 0; i < d1.length; i++)
           result[i] = d1[i] + d2[i];
       return result;
   } // public double[] add(double[] d1, double[] d2)

} // public class Addition
```


Create test cases
=================

1. Create a new source folder “**JUnitTest**”.
   (You may want maintain test case files in separated source folder).

   Note that all test case classes are extended from ```junit.framework.TestCase```.

2. Create the first test case class ```StringTest``` inside this source folder as follows
   (You can find the source code of it [here] [2]):

    ```java
    package testcase;

    import junit.framework.TestCase;
    import org.junit.After;
    import org.junit.Before;
    import org.junit.Test;

    /**
     * Testing class - Java String behavior
     * @author    Marco
     * @version    1.0.0.0
     */
    public class StringTest extends TestCase {

        private String str1 = null;
        private String str2 = null;
        private String str3 = null;

        /**
         * Initialization of the test
         */
        @Before public void setUp() {
            str1 = "Hello World!";
            str2 = "Hello World!";
            str3 = new String("Hello World!");
        } // public void setUp()

        /**
         * Clean-up of the test
         */
        @After public void tearDown() {
            str1 = null;
            str2 = null;
            str3 = null;
        } // public void tearDown()

        /**
         * Test case: test same-assertion
         */
        @Test public void testAssertSame() {
            // All three strings have the same content of "Hello World!"
            assertEquals(str1, "Hello World!");
            assertEquals(str2, "Hello World!");
            assertEquals(str3, "Hello World!");
            // str1, str2 and the "Hello World!" are exactly the same object
            assertSame(str1, "Hello World!");
            assertSame(str1, str2);
            // str3 is not the same object as the previous one
            assertNotSame("Hello World!", str3);
            assertNotSame(str1, str3);
        } // public void testAssertSame()

    } // public class StringTest extends TestCase
    ```

   Now you can run the test to figure out whether there is any bug existing.

   Take a notice of all the results on testing Java string equality and figure out the
   JVM optimizing mechanism.

3. Create the second test case class ```AdditionTest``` as follows
   (You can find the source code of it [here] [3]):

    ```java
    package testcase;

    import static org.junit.Assert.*;
    import junit.framework.TestCase;
    import org.junit.After;
    import org.junit.Before;
    import org.junit.Test;
    import source.Addition;

    /**
     * Testing class - addition
     * @author    Marco
     * @version    1.0.0.0
     */
    public class AdditionTest extends TestCase {
        /**
         * The class to be tested
         */
        private Addition calc = null;

        /**
         * Initialization of the test
         */
        @Before public void setUp() {
            assertNull(calc);
            calc = new Addition();
        } // public void setUp()

        /**
         * Clean-up of the test
         */
        @After public void tearDown() {
            calc = null;
            assertNull(calc);
        } // public void tearDown()

        /**
         * Test case: test basic addition
         */
        @Test public void testAddtion() {
            assertNotNull(calc);
            double d1 = 0.9, d2 = 0.05, result = 0.95;
            // 0.9 + 0.05 = 0.9500000000000001
            assertEquals(calc.add(d1, d2), result, calc.EPSILON);
            assertNotEquals(calc.add(d1, d2), result);
            assertTrue(Math.abs(calc.add(d1, d2) - result) < calc.EPSILON);
            assertFalse(calc.add(d1, d2) == result);
        } // public void testAddtion()

        /**
         * Test case: test addition for array
         */
        @Test public void testArrayAddtion() {
            assertNotNull(calc);
            double[] d1 = {0.9, 0.9, 0.9}, d2 = {0.05, 0.05, 0.05}, result = calc.add(d1, d2);
            // 0.9 + 0.05 = 0.9500000000000001
            assertArrayEquals(calc.add(d1, d2), result, calc.EPSILON);
        } // public void testArrayAddtion()

    } // public class AdditionTest extends TestCase
    ```

   Now you can run the test to figure out whether there is any bug existing
   in the class ```Addition```.


Create test suites
==================

You may want to test several cases all at once. The test suite may help in this case.
It is simply as follows:

  1. Test suite - style 1 (source code [here] [4]):

    ```java
    package testsuite;

    import junit.framework.Test;
    import junit.framework.TestSuite;

    import testcase.AdditionTest;
    import testcase.StringTest;

    public class TestSuiteStyle1 {
        /**
         * Package several test classes into a suite
         * @return    (Test) The packed test suite
         */
        public static Test suite() {
            TestSuite suite = new TestSuite("Tests cases of all packages");
            suite.addTestSuite(AdditionTest.class);
            suite.addTestSuite(StringTest.class);
            return suite;
        } // public static Test suite()
    } // public class TestSuite
    ```

  2. Test suite - style 2 (source code [here] [5]):

    ```java
    package testsuite;

    import org.junit.runner.RunWith;
    import org.junit.runners.Suite;
    import testcase.AdditionTest;
    import testcase.StringTest;

    @RunWith(Suite.class)
    @Suite.SuiteClasses({
        // Add all testing classes you want here
        AdditionTest.class,
        StringTest.class
    }) // @Suite.SuiteClasses()

    public class TestSuiteStyle2 {
        // This class remains completely empty, 
        // being used only as a holder for the above annotations
    } // public class TestSuiteStyle2
    ```

Run it now to test all included test cases all in one time.

You may add other test suites with any combination of any test cases.


Appendix: File structure
========================

```sh
./                                             # Current path
./src/                                         # Source code path
./src/source/
./src/source/Addition.java

./JUnitTest/                                   # JUnit test path
./JUnitTest/testcase/
./JUnitTest/testcase/AdditionTest.java
./JUnitTest/testcase/StringTest.java
./JUnitTest/testsuite/
./JUnitTest/testsuite/AllTests.java
```


[1]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/JUnitTestFramework/src/source/Addition.java
[2]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/JUnitTestFramework/JUnitTest/testcase/StringTest.java
[3]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/JUnitTestFramework/JUnitTest/testcase/AdditionTest.java
[4]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/JUnitTestFramework/JUnitTest/testsuite/TestSuiteStyle1.java
[5]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/JUnitTestFramework/JUnitTest/testsuite/TestSuiteStyle2.java