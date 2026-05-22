![Expo Go](https://img.shields.io/badge/Expo%20Go-55.0.24-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.83-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PocketBase](https://img.shields.io/badge/PocketBase-v0.36.9-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black)

# Installation

**Clone du projet**

```
git clone https://git.helmo.be/students/info/q240206/ticketing
cd ticketing
```

**Installation des dépendances**

```
npm install
```

**Exécuter l'application**

```
Android
npx expo run:android

Ios
npx expo run:ios

Web
npm run web
```

Pour démarrer l'application, nous vous conseillons d'exécuter la commande `npx expo run:android` car cette application
nécessite l'accès au lecteur NFC qui n'est pas géré par expo-go.

# Accès PocketBase

[Serveur Pocketbase](https://pocketbase.tomstudio.eu/_/#/login)

Identifiants :

- Login : `derdeyn.thomas@gmail.com`
- Mot de passe : `yum3wKDsW5dzCS`

# Comptes

**Compte Admin**

- Login : `thomas@helmo.be`
- mot de passe : `thomas@helmo.be`

**Compte Normal**

- Login : `tibo@helmo.be`
- mot de passe : `tibo@helmo.be`

# Librairie utilisé

**Injections de dépendences**

- Inversify
- Version : ^8.1.0

**Création de QrCode**

- react-native-qrcode-svg
- Version : ^6.3.21

**Scan de QrCode**

- expo-camera
- Version : ^55.0.18

**Lecture NFC**

- react-native-nfc-manager
- Version : ^3.17.2

**Outils visuels**

- lucide-react-native
- Version : ^1.8.0

Utilisé notamment pour tout les boutons "Décoratifs" (Ex : pin, calendar...)

**Base de données**

- Pocketbase
- Version : ^0.26.8