# MongoBank

## Installation mongodb

1. Se rendre sur le site de téléchargement de mongodb : https://www.mongodb.com/download-center?lang=fr-fr
2. Cliquez sur **Server**
3. Selectionnez la dernière version ainsi que votre OS.
4. Selectionnez le package **MSI**.
5. Cliquez sur **télécharger**.
6. à la fin du téléchargement , Accédez au répertoire où vous avez téléchargé MongoDB. Par défaut, c'est le répértoire **téléchargements**.
7. Exécutez le fichier **.msi**.
8. Cliquez sur **next**.
9. Acceptez les conditions.
10. Cliquez sur **complete**.
11. Selectionnez **Run service as network Service user** et cliquez **next**
12. Cliquez sur **next**.
13. Vérifiez l'installation en ouvrant un interpréteur de commande et en copiant la ligne suivante : **"C:/Program Files/MongoDB/Server/4.0/bin/mongo.exe"**

## Basic use of mongodb in mongo Shell

### Add a new document to a collection
```console
db.mycollection.insertOne(name: "sue" , age : 26)
```

### Find a document in a mcollection
```console
db.mycollection.find()
```

### Update a document in a collection
```console
db.mycollection.updateOne({name:{$eq : "sue"} },{$set : {age : "18 "} })
```

### Delete a document in a collection
```console
db.mycollection.deleteOne({name : "sue"})
```
## Installation MongoBank

### Prérequis

1. Mongo v4.0 or later
2. NodeJS v10.15 or later

### Installation

1. Clonez le repository
2. Ouvrez un interpréteur de commande et allez dans le dossier du projet
3. Tapez la commande **npm install**
4. Une fois l'installation des dépendances terminées, tapez la commande **npm start**
