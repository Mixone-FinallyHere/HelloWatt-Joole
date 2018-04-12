# Challenge Hello Watt

Vous cherchez un job/stage? Découvrez [nos offres d'emplois](https://hello-watt.welcomekit.co/).

## Mise en place

- Cloner ce dépo (ne pas en faire un fork)
- Faites vos modifications
- Faites un commit en local

 Requirements:
- Python 3.6
- Django 1.11 (Doc: https://docs.djangoproject.com/fr/1.11/)

Une fois django installé il vous suffit de vous placer dans le dossier joole, d'éxecuter la commande: "python manage.py runserver"
et finnalement de vous rendre à l'adresse http://localhost:8000 pour avoir un aperçu du projet.

## Votre mission

Ce projet possède déjà une base de donnée contenant les informations de consommation d'électricité de 100 clients pour les années 2016 et 2017.
Votre mission est de mettre en forme ces données sur une même page.

Sur cette page votre objectif est d'afficher:

- Les dépenses annuelles
- La courbe de consommation de l'année 2017
- D'identifier si le client a un chauffage électrique ou non (hint: en hiver la consommation électrique est bien plus importante en cas de chauffage électrique)
- De détecter un dysfonctionnement: cela se traduit généralement par un changement brusque d'une année à l'autre

Les fichiers que vous avez à modifier sont:

- joole/dashboard/templates/dashboard/results.html
- joole/dashboard/views.py
- joole/dashboard/static/dashboard/css/results.css
- joole/dashboard/static/dashboard/css/results.js

Libre à vous de modifier d'autres fichiers si vous considerez que c'est nécessaire.
Si besoin, vous avez accès aux données dans la base depuis http://localhost:8000/admin/ avec le login admin (mdp: admin)

## Librairies à votre disposition

Certaines librairies sont déjà inclusent pour vous simplifier la tache:
Bootstrap 3.3,
JQuery 2.1,
Morrisjs 0.5,
FontAwesome 4,

## Envoyer votre résultat

Une fois que vous avez terminé, merci d'envoyer votre résultat par mail à votre correspondant chez Hello Watt.
Soit sous la forme d'un lien vers votre projet Github, ou un zip du projet (sans oublier le .git).
