Creating an executable jar file
===============================


  In Java program, it is possible to invoke system commands by calling the function ```exec(...)```
  from class ```java.lang.Runtime```. Hoever, there are several issues that should be carefully
  dealt with:

  1. When running a system command, there might be output messages as well as error messages for
     the command. In a Java program, these messages are provided through streams. If these message
     streams are not handled, the program will be halted.

  2. Some system commands will not generate output messages until some conditions are met (For
     example, ```ping``` will only output message when it received a reply). To handle them
     correctly, it is a good practice to put error stream and input stream into different thread.

  3. If you are to operate specific files or directories, it is not enough to provide path only
     inside the command string. You have to provide a ```java.io.File``` instance directing to
     that path. (See the 3rd example)

  4. Though both string and string array of command are supported by ```Runtime.exec(...)```,
     the array is recommended because of some system compatibility issues.


|Command string array|           Windows          |        Ubuntu        |
| :----------------: | :------------------------: | :------------------: |
|    ```cmd[0]```    | ```cmd``` or ```cmd.exe``` |    ```/bin/sh```     |
|    ```cmd[1]```    |   ```/c``` or ```/k```     | ```-c``` or ```-k``` |
|    ```cmd[2]```    |     Commands such as ```ping 127.0.0.1```         |


   - "/c" means run command and close the command line window. You will receive only
     command message;
   - "/k" means run command but leave the command line window open. In this condition
     you will receive one more piece of message showing the current path.


  5. To wait for the command finishing running and retrieve its processing status, you can just
     call the function ```Process.waitFor()```.



Here is the source code of the example. You can also find it [here] [1].

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Run system command inside Java programs
 * @author  Marco
 * @version 1.0
 */
public class RunCmd {

    /**
     * Inner class for logging messages in separated thread
     * @author  Marco
     * @version 1.0
     */
    private static class MsgThread extends Thread {

        /**
         * Input stream for logging message
         */
        private InputStream is = null;

        /**
         * Constructor - create a new thread with the logging stream
         * @param is
         */
        public MsgThread(InputStream is) {
            this.is= is;
        } // public MsgThread(InputStream is)

        /**
         * Running the thread: log command messages in console
         */
        @Override public void run() {
            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                String line = null;
                while ((line = reader.readLine()) != null)
                    System.out.println(line);
                reader.close();
            } catch (Exception e) {
                e.printStackTrace();
            } // try - catch (Exception e)
        } // @Override public void run()
    } // private static class MsgThread extends Thread

    /**
     * Run the command with specified environment settings
     * @param cmd           (<code>String[]</code>) The command to be run
     * @param envp          (<code>String[]</code>) The environment settings
     * @param dir           (<code>File</code>) Specified directory for running command
     * @return              (<code>int</code>) Return value of executing the command
     * @throws Exception    Any possible exception
     */
    public static int runCmd(String[] cmd, String[] envp, File dir) throws Exception {
        // Run the command
        Process proc = Runtime.getRuntime().exec(cmd, envp, dir);
        // Log the process's output information in an independent thread
        new MsgThread(proc.getInputStream()).start();
        // Log the process's error information in an independent thread
        new MsgThread(proc.getErrorStream()).start();
        // Close input stream of the command executing process
        proc.getOutputStream().close();
        // Wait for finishing the process and return the status value 
        return proc.waitFor();
    } // public static int runCmd(String cmd, String[] envp, File dir)

    /**
     * Program main entry
     * @param args  (<code>String[]</code>) Command line arguments
     */
    public static void main(String[] args) throws Exception {
            String[] cmd = {"cmd", "/c", "ping 127.0.0.1"};
            String[] envp = null;
            System.out.println("\nReturn value: " + RunCmd.runCmd(cmd, envp, null));

            // This command will list out files in "./" but not in "D:"
            // To get correct answer, refer to next case.
            cmd = new String[] {"cmd.exe", "/k", "dir /s"};
            int returnValue = RunCmd.runCmd(cmd, envp, null);
            System.out.println("\nReturn value: " + returnValue + "\n");

            // In this case, there exists the file "D:\1.txt"
            File delFile = new File("D:\\1.txt");
            if (! delFile.exists())
                delFile.createNewFile();
            cmd = new String[] {"cmd", "/k", "del 1.txt"};
            File directory = new File("D:\\");
            System.out.println("\nReturn value: " + RunCmd.runCmd(cmd, envp, directory));
    } // public static void main(String[] args)

} // public class RunCmd
```


[1]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/Java/RunCmd.java
