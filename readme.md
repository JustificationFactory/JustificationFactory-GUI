
#INTRODUCTION

This is a Web software for read and create argumentation diagram.  

Main Javascript Frameworks used :    
 - JointJS : to design diagram
 - Angular 2 : to structure Web application

#INSTALLATION

##Test serveur (Jenkins)

**Prerequisite :**  
npm install -g typescript  
npm install -g karma-cli  

**Tools used**  
For unit testing we use *Jasmine Framework* to write unit tests, and *Karma* tool then to launch unit tests 

**Launch command :**  
npm install  
tsc && concurrently \"tsc -w\" \"karma start karma.conf.js\"

##Production server

**Prerequisite :**  
npm install -g typescript  

**Launch command :**  
npm install --production  
concurrent \"npm run tsc:w\" \"npm run lite\"  


#DEV HELPER

##"typings\\" directory
Pour mettre à jour le fichier le typings personalisé. Par exemple, ajouter : typings/pdfkit.d.ts. Puis lancer la commande suivante :
>typings install --global --save file:typings/pdfkit.d.ts

Puis enfin supprimer : typings/pdfkit.d.ts (qui était un fichier temporaire)
