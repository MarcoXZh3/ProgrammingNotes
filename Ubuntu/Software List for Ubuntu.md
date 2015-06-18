Ubuntu Software Center
======================

1. Bumble Bee (NVIDIA driver solution)
   ```sh
    sudo apt-get install bumblebee bumblebee-nvidia primus linux-headers-generic
    lspci | grep -i vga
   ```

2. 7zip

3. Adobe Flash Player && Pepper Flash Plugin

4. Chinese Calendar

5. Chromium

6. Firefox Addons: ChmFox, UnMHT, Firebug*

7. Dropbox

   If update from source code, you can find current installation at ```$HOME/.dropbox-dist```
   or ```/var/lib/dropbox/.dropbox-dist```

8. GIMP

9. Inkscape

10. Banshee

11. VLC

12. GStreamer


Developer Essentials
====================

1. Git

2. Java
   ```sh
   sudo add-apt-repository ppa:webupd8team/java
   sudo apt-get update
   sudo apt-get install oracle-java8-installer
   ```

3. TexLive

   1. Mount the TexLive ISO image with Disk Image Mounter

   2. Run installation script as root user

      ```sh
      sudo -i
      cd /media/the_user/TeXLive2015
      ./install-tl
      ```

      Type ```i``` when asked during installation. The installation may continues for minutes.

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

   4. Set the paper size to ```letter```

      ```sh
      sudo -i               # You must login as root user for paper setting
      tlmgr paper letter
      ```

   5. Test your installation

      ```sh
      latex small2e
      ```

   6. If you cannot import EPS files

      ```sh
      sudo apt-get install texlive-font-utils
      ```

4. R-base, R-base-dev
   ```sh
   sudo add-apt-repository "deb http://cran.rstudio.com/bin/linux/ubuntu $(lsb_release -cs)/"
   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
   sudo apt-get update
   sudo apt-get install r-base r-base-dev
   ```

5. RStudio: run the ```deb``` package; in the RStudio console, add necessary packages:
   ```sh
   install.packages('e1071', dependencies=TRUE)             # Naive Bayes Classifier
   install.packages('irr', dependencies=TRUE)               # Inter-Rater Reliability
   install.packages('scatterplot3d', dependencies=TRUE)     # 3D Scatter Plot
   install.packages('extrafont', dependencies=TRUE)         # Tools for using fonts
   install.packages('fontcm', dependencies=TRUE)            # Computer Modern font
   ```

6. Eclipse

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

7. Build Essentials
   ```sh
   sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging \
                         python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools \
                         qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script \
                         libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev
   ```

8. Malicious
   ```sh
   sudo apt-get install python-pip fonts-cmu
   sudo pip install wheel natsort sqlite sqlite3 pillow
   cd pylzma-0.4.6/     # Download pylzma first, currently version 0.4.6
   sudo python setup.py build
   sudo python setup.py install
   ```
