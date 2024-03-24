# Projet de gestion des films et des commentaires

Ce projet vise à créer une API pour gérer les films et les commentaires associés à l'aide de Next.js. L'API permettra de récupérer, d'ajouter, de mettre à jour et de supprimer des films, ainsi que de gérer les commentaires associés à ces films.

## Technologies utilisées

- Next.js
- MongoDB
- swagger

## Installation

1. Clonez le repository :

git clone https://github.com/a-diallo96/devCloud.git

2. Installez les dépendances :

npm install

3. Configurez votre base de données MongoDB dans le fichier `.env.local`.

4. Démarrez le serveur :

npm run dev

## Architecture du projet

Le projet est structuré de la manière suivante :

- `pages/api/`: contient les endpoints de l'API
- `pages/swagger/`: contient la documentation de l'API générée par Swagger
- `services/`: contient les services qui interagissent avec la base de données
- `public/`: contient les fichiers statiques

## Documentation de l'API

La documentation de l'API est générée automatiquement par Swagger et est accessible dans le site mongodb Atlas "sample_mflix"
