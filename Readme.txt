Pour démarrer le projet il faut avoir installé MongoDB, Visual Studio Code et NodeJS
https://www.mongodb.com/download-center/community?tck=docs_server
https://code.visualstudio.com/download
https://nodejs.org/en/download/

Une fois tout installé

1.- Il faut créer/activer le service de la base de données. Pour cela, dans votre répertoire du C:(disque dur) , vous allez vers "Program Files" ou "Program Files" (x86).
	Cherche le dossier "MongoDB" --> "Server"-->"4.x"-->"bin"-->"mongod.exe" Double click et le service va démarrer (une fenêtre type Terminal)
2.- Vas "File" -> "Open Folder"--> "LostAndFound_MEAN.v1.1"-->"LostAndFound": Clique "Ouvrir"
3.- Il faut ouvrir une ligne de commandes (Ctrl+Shift+P), use the View: Toggle Integrated Terminal command.
	3.1 On démarre le serveur avec "npm run dev"
4.- Il faut ouvrir une autre ligne de commandes
	4.1 Et il faut se positionnner dans le dossier "frontend" donc on tape "cd frontend"
	4.2 Finalement on tape "ng serve"
5.- Dans le navigateur il faut tapper "http://localhost:4200/"

Si tout est bon ca devrait marcher haha, sinon contacte moi xd.


Pour comprendre le code:

Dans le dossier frontend y'a que le frontend. Dans Angular, ce qu'il faut remarquer c'est le ObjectService. C'est lui qui fait les requêtes au serveur. Des fois j'ai écris Objet au lieu de Object (dans le code) parce que le mot Object est déjà reservé.

Tout ce qui est en dehors, c'est le serveur, il faut juste faire attention aux fichier appelés "Object".

Voili voilou.

