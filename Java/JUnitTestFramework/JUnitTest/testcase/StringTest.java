package testcase;

import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Testing class - Java String behavior
 * @author  Marco
 * @version 1.0.0.0
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
