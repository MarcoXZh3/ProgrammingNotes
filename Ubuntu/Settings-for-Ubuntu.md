Adjust Grub menu
================

This is to move Windows before Ubuntu.

1. Enter root user mode and goto directory ```/etc/grub.d/```:
   ```sh
    sudo -i
    cd /etc/grub.d
    ls -l
   ```

2. Adjust order of loader files.

   Find the Windows loader file (In this condition, it is ```30_os-prober```). 
   Move it before Linux loader (```10_linux```) by changing its name.
   Change the number prefix only. Do not touch any other part of the file name.

   ```sh
    mv 30_os-prober 08_os-prober
    mv 30_uefi-firmware 08_uefi-firmware
    ls -l
   ```

3. Set menu item timeout
   ```sh
   nano /etc/default/grub
   
   GRUB_TIMEOUT=5
   ```

4. To make it effective, update the grub:
   ```sh
   update-grub
   exit
   ```


Adjust Tooltip colors
=====================

The default tooltip background color is black while default foreground color is white.

1. Open the current theme's setting file with text editor:

   ```sh
   sudo gedit /usr/share/themes/Ambiance/gtk-2.0/gtkrc
   ```

2. Locate the first line and change values as follows:

   ```
    tooltip_fg_color: #000000
    tooltip_bg_color: #f5f5b5
   ```

3. Save the settrings. Sometimes you have to re-login to make if effective


GEdit Chinese Garbled
=====================

```sh
dconf write /org/gnome/gedit/preferences/encodings/auto-detected \
    "['CURRENT', 'GBK', 'GB18030', 'GB2312', 'UTF-8', 'UTF-16']"
```


Add SSH key to System
=====================

**Note that git 2.5.0 and later use ```.bash_profile``` as default config file instead of ```.bashrc```**

   https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git


MHTML Support of Google Chrome/Chromium
=======================================

Open the ```chrome://flags``` page, and enable the ```Save Page as MHTML``` option.


