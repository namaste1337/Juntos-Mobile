
zipalign -p 4 Juntos-unsigned.apk Juntos.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore juntos.keystore Juntos.apk juntos
jarsigner -verify -verbose Juntos.apk
