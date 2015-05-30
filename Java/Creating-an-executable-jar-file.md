Creating an executable jar file
===============================


 1. Compile the following source code (pay attention on how to load resources in jar package):

    ```java
    import java.io.File;
    import java.net.URL;
    import javax.swing.ImageIcon;
    import javax.swing.JOptionPane;
    
    /**
     * Executable Jar Example
     * @author  Marco
     * @version 1.0.0.0
     */
    public class ExecutableJar {
    	/**
    	 * Program main entry
    	 * @param args  (<code>String[]</code>) Command line arguments
    	 */
    	public static void main(String[] args) {
    		String strIcon = "resources/info.png";
    		// NOTE: inside the JAR file, use absolute path instead of relative paths!
    		URL url = System.class.getResource("/" + strIcon);
    		ImageIcon icon;
    		if (url == null)
    			icon = new ImageIcon(strIcon);
    		else
    			icon = new ImageIcon(url);
    		File iconFile = new File((url == null) ? strIcon : url.toString());
    		JOptionPane.showMessageDialog(null, iconFile.getAbsolutePath(), "Executable Jar",
    									  JOptionPane.PLAIN_MESSAGE, icon);
    	} // public static void main(String[] args)
    } // public class ExecutableJar
    ```
    You can find the source code [here] [1] and image file [here] [2].

 2. Create a manifest list file ```manifest.mf```, and set the class as main class.

    **Note**: The empty line after the ```Main-Class``` definition is necessary!

    ```sh
    Manifest-Version: 1.0
    Main-Class: ExecutableJar
    [\n]
    ```
    You can also find it [here] [3].

 3. Organize these files as follows (```manifest.mf``` need not to be together with those files):

    ```sh
    ../manifest.mf                # It will be copied into jar package while compiling
    ./                            # Current path
    ./ExecutableJar.class
    ./resources/
    ./resources/info.png
    ```

 4. Open your terminal and run this command at current path (you can give it any name instead
    of ```ExecutableJar.jar```):

    ```sh
    jar cvfm ExecutableJar.jar ../manifest.mf -C . *
    ```


Lincence
========

MIT


[1]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/ExecutableJar/ExecutableJar.java
[2]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/ExecutableJar/resources/info.png
[3]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/ExecutableJar/manifest.mf
