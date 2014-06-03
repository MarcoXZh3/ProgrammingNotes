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
