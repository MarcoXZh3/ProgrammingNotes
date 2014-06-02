import java.io.File;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;


/**
 * Executable Jar Example
 * @author  Marco
 * @version 1.0.0.0
 */
public class JarClassLoader {
    /**
     * Program main entry
     * @param args  (<code>String[]</code>) Command line arguments
     */
    public static void main(String[] args) throws Exception {
        // Load class from JAR file
        URL[] urls = {(new File("Person.jar")).toURI().toURL()};
        URLClassLoader loader = new URLClassLoader(urls);
        Class<?> myClass = loader.loadClass("jar.Person");
        loader.close();

        // Create new instance with default constructor
        Object person1 = myClass.newInstance();

        // Invoke a method with one parameter
        Method setName = person1.getClass().getMethod("setName", String.class);
        setName.invoke(person1, "John Smith");

        // Invoke method with no parameter
        Method getName = person1.getClass().getMethod("getName");
        String str = (String)getName.invoke(person1);
        System.out.println("Name: " + str);

        // Invoke a method with more than one parameters
        Method setFullName = person1.getClass().getMethod("setFullName", String.class, String.class);
        setFullName.invoke(person1, "Marco", "Polo");
        System.out.println("Name: " + getName.invoke(person1));

        // Create new instance with parameterized constructor
        Class<?>[] paramType = {String.class};
        Constructor<?> constructor = myClass.getConstructor(paramType);
        Object[] param = {"John Smith"};
        Object person2 = constructor.newInstance(param);
        System.out.println("Name: " + person2.getClass().getMethod("getName").invoke(person2));
    } // public static void main(String[] args) throws Exception
} // public class JarClassLoader
