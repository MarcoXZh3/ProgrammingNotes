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
