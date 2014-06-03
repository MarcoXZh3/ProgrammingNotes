package testcase;

import static org.junit.Assert.*;
import junit.framework.TestCase;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import source.Addition;

/**
 * Testing class - addition
 * @author  Marco
 * @version 1.0.0.0
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
