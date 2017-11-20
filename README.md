#PFE - Architecture framework over a requirements justification engine: biomedial application

## Stakeholders:
  * Owner: Clément Duffau ([duffau@i3s.unice.fr](duffau@i3s.unice.fr))
  * Students: 
    * Carlier Maxime ([maxime.carlier@etu.unice.fr](maxime.carlier@etu.unice.fr))
    * Chevalier Mathias ([mathias.chevalier@etu.unice.fr](mathias.chevalier@etu.unice.fr))
    
## Technologies

  * Angular 2
  * JointJS - Diagram Design Library

##Test server (Jenkins)

**Prerequisite :**  
npm install -g typescript  
npm install -g karma-cli  

**Tools used**  
For unit testing we use *Jasmine Framework* to write unit tests, and *Karma* tool then to launch unit tests.

**Launch command :**  
npm install  
tsc && concurrently \"tsc -w\" \"karma start karma.conf.js\"

##Production server

**Prerequisite :**  
npm install -g typescript  

**Launch command :**  
npm install --production  
concurrent \"npm run tsc:w\" \"npm run lite\"  
