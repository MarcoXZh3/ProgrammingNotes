1. Download the latest release of JDK (JDK 8 update 25) and extract it.

   ```sh
   tar -xvf jdk-8u25-linux-x64.tar.gz
   ```

2. Create ```JVM``` directory and move java source folder to it:

   ```sh
   sudo mkdir /usr/lib/jvm
   sudo mv jdk1.8.0_25 /usr/lib/jvm/jdk1.8.0_25
   ```

3. Set up system varibles

   ```sh
   sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.8.0_25/bin/java" 1
   sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.8.0_25/bin/javac" 1
   sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.8.0_25/bin/javaws" 1
   ```

4. Configure java path priority

   A list of paths will be shown for each of the following command. Select the one you want to use.

   ```sh
   sudo update-alternatives --config java
   sudo update-alternatives --config javac
   sudo update-alternatives --config javaws
   ```

5. Set java environment variables to all users

   - Open the profile setting

     ```sh
     sudo gedit /etc/profile
     ```

   - Append the following commands to it

     ```
     # Java SE Environment Variables Setting for Linux
     export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_25
     export PATH=$PATH:$JAVA_HOME/bin
     ```

   - Save and exit.

6. Varify installation

   ```sh
   java -version
   javac -version
   ```
