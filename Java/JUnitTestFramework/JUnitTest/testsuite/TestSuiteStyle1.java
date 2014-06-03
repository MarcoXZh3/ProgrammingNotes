package testsuite;

import junit.framework.Test;
import junit.framework.TestSuite;

import testcase.AdditionTest;
import testcase.StringTest;

public class TestSuiteStyle1 {
	/**
	 * Package several test classes into a suite
	 * @return	(Test) The packed test suite
	 */
	public static Test suite() {
		TestSuite suite = new TestSuite("Tests cases of all packages");
		suite.addTestSuite(AdditionTest.class);
		suite.addTestSuite(StringTest.class);
		return suite;
	} // public static Test suite()
} // public class TestSuite
