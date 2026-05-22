# Versions des frameworks

- Expo 55
- React Native 0.83

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

# Accès PocketBase

[Serveur Pocketbase](https://pocketbase.tomstudio.eu/)

Identifiants :

- Login : `derdeyn.thomas@gmail.com`
- Mot de passe : `yum3wKDsW5dzCS`