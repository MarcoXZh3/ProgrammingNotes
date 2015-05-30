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

13. Developer Essentials

    1. Java
       ```sh
       sudo add-apt-repository ppa:webupd8team/java
       sudo apt-get update
       sudo apt-get install oracle-java8-installer
       ```

    2. Texmaker
       ```sh
       sudo add-apt-repository ppa:tsvetko.tsvetkov/trusty-backports
       sudo apt-get update
       sudo apt-get install texmaker
       ```

    3. TexLive

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
       sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex \
                             python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 \
                             libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl \
                             libgle3 python-dev
       ```

    8. Malicious
       ```sh
       sudo apt-get install git python-pip fonts-cmu
       sudo pip install wheel natsort sqlite sqlite3 pillow
       cd pylzma-0.4.6/     # Download pylzma first, currently version 0.4.6
       sudo python setup.py build
       sudo python setup.py install
       ```
