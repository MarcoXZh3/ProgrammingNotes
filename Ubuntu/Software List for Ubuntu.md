Ubuntu Software Center
======================

1. 7zip

2. Adobe Flash Player && Pepper Flash Plugin

3. Chinese Calendar

4. Chromium

5. Firefox Addons: ChmFox, UnMHT, Firebug*

6. Dropbox

7. GIMP

8. Inkscape

9. Banshee

10. VLC

11. GStreamer


Developer Essentials
====================

1. Build Essentials
   ```sh
   sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging \
                         python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools \
                         qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script \
                         libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev
   ```

2. Git

3. python-pip
   ```sh
   sudo pip install wheel natsort sqlite requests pillow networkx
   cd pylzma-0.4.8/     # Download pylzma first, currently version 0.4.8
   sudo python setup.py build
   sudo python setup.py install
   ```

4. Java
   ```sh
   sudo add-apt-repository ppa:webupd8team/java
   sudo apt-get update
   sudo apt-get install oracle-java8-installer
   ```

5. Eclipse

   + Download Eclipse IDE package

   + Extract it and get the ```eclipse``` folder, move it to ```/usr/lib/```:
     ```sh
     sudo mv eclipse/ /usr/lib/eclipse/
     ```

   + Create a launcher shortcut:
     ```sh
     sudo gedit /usr/share/applications/eclipse.desktop
     ```

   + Paste the following content into the ```eclipse.desktop``` file and save:
     ```sh
     [Desktop Entry]
     Name=Eclipse
     Type=Application
     Exec=/usr/lib/eclipse/eclipse
     Terminal=false
     Icon=/usr/lib/eclipse/icon.xpm
     Comment=Integrated Development Environment
     NoDisplay=false
     Categories=Development;IDE;
     Name[en]=Eclipse
     ```

   + Now the Eclipse IDE can be found from the Unity Dash

6. TexLive

   1. Mount the TexLive ISO image with Disk Image Mounter

   2. Run installation script as root user

      ```sh
      sudo -i
      cd /media/the_user/TeXLive2015
      ./install-tl
      ```

      Type ```o``` for options and ```i``` for installation. The installation may continues for minutes.

   3. Post-installation

      - Set up paths (1)

        ```sh
        sudo gedit /etc/bash.bashrc
        ```

      - Append the following commands to it

        ```sh
        # Texlive 2015
        PATH=$PATH:/usr/local/texlive/2015/bin/x86_64-linux; export PATH
        MANPATH=$MANPATH:/usr/local/texlive/2015/texmf/doc/man; export MANPATH
        INFOPATH=$INFOPATH:/usr/local/texlive/2015/texmf/doc/info; export INFOPATH
        ```

      - Seupt paths (2)

        ```sh
        sudo gedit /etc/manpath.config
        ```

      - Append the following commands to it

        ```sh
        # Texlive 2015
        MANPATH_MAP /usr/local/texlive/2015/bin/x86_64-linux /usr/local/texlive/2015/texmf/doc/man
        ```

        You have to relaunch new terminals to run LaTeX commands.

   4. Test your installation

      ```sh
      latex small2e
      ```

   6. Extra useful packages

      ```sh
      sudo apt-get install texlive-latex-extra texlive-font-utils fonts-cmu
      ```

7. R-base, R-base-dev
   ```sh
   sudo add-apt-repository "deb http://cran.rstudio.com/bin/linux/ubuntu $(lsb_release -cs)/"
   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
   sudo apt-get update
   sudo apt-get install r-base r-base-dev
   ```

8. RStudio: run the ```deb``` package; in the RStudio console, add necessary packages:
   ```sh
   install.packages('e1071', dependencies=TRUE)             # Naive Bayes Classifier
   install.packages('irr', dependencies=TRUE)               # Inter-Rater Reliability
   install.packages('scatterplot3d', dependencies=TRUE)     # 3D Scatter Plot
   install.packages('fontcm', dependencies=TRUE)            # Computer Modern font
   install.packages('extrafont', dependencies=TRUE)         # Tools for using fonts
   library(fontcm)
   library(extrafont)
   font_import()
   ```

