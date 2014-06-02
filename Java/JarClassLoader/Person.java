// Person.jar!/jar/Person.class
package jar;

/**
 * Class in JAR file
 * @author  Marco
 * @version 1.0
 */
public class Person {

    /**
     * Name of the person
     */
    private String name;

    /**
     * Constructor - create a person with on name or age
     */
    public Person() {
        this("");
    } // public Person()

    /**
     * Constructor - create a person with name and age
     * @param name  (<code>String</code>) Name of the person
     */
    public Person(String name) {
        this.name = name;
    } // public Person(String name)
    
    /**
     * Get name of the person
     * @return  (<code>String</code>) Name of the person
     */
    public String getName() {
        return name;
    } // public String getName()

    /**
     * Set the name of the person
     * @param name  (<code>String</code>) Name to be set
     */
    public void setName(String name) {
        this.name = name;
    } // public void setName(String name)
    
    /**
     * Set both name and age of the person
     * @param firstName (<code>String</code>) Name to be set
     * @param lastName  (<code>String</code>) Name to be set
     */
    public void setFullName(String firstName, String lastName) {
        this.name = firstName + " " + lastName;
    } // public void setAll(String name, int age)

} // public class Person
