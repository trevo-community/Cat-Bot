#!bin/bash
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
PURPLE='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTRED='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'
clear

echo "${LIGHTPURPLE}Se ja estiver nele e so escolher nao"
read -p "Deseja baixar as dependencias para baixar o bot? 
(sim/nao): " response

if [ "$response" = "sim" ]; then
     Enter the cloned repository
     
  pkg install git
  clear
  pkg update
  clear
  pkg upgrade
clear
 pkg install ffmpeg
clear
  pkg install wget
clear
  pkg install nodejs
clear
  pkg install npm
clear
  pkg install yarn
clear
   # unzip node_modules.zip

    echo "Modules baixado e você está dentro dele!"
else
   echo "${RED}A instalação foi interrompida."
fi



while : 
do
echo "${ORANGE}"
cat << "EOF"
   ██░▀██████████████▀░███
   █▌▒▒░████████████░▒▒▐██
   █░▒▒▒░██████████░▒▒▒░██
   ▌░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▐█
   ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░█
   ███▀▀▀██▄▒▒▒▒▒▒▒▄██▀▀▀█
   █░░░▐█░▀█▒▒▒▒▒█▀░█▌░░░█
   ▌░░░▐▄▌░▐▌▒▒▒▐▌░▐▄▌░░▐█
   █░░░▐█▌░░▌▒▒▒▐░░▐█▌░░██
   ▒▀▄▄▄█▄▄▄▌░▄░▐▄▄▄█▄▄▀▒█
   ░░░░░░░░░░└┴┘░░░░░░░░░█
   ██▄▄░░░░░░░░░░░░░░▄▄███
   ████████▒▒▒▒▒▒█████████
   █▀░░███▒▒░░▒░░▒▀███████
   █▒░███▒▒╖░░╥░░╓▒▐██████
   █▒░▀▀▀░░║░░║░░║░░██████
   ██▄▄▄▄▀▀┴┴╚╧╧╝╧╧╝┴┴████
   ███████████████████████
EOF
echo 
echo "${YELLOW}         CLOVER-MODS"
echo "${LIGHTPURPLE}"

   node index.js
   sleep 1

done
