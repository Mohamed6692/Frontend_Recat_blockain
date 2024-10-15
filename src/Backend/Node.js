const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
};

const app = express();
app.use('/api', cors(corsOptions)); 
app.use(bodyParser.json());

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-service-account.json'))
});

// Simuler la base de données utilisateur
let usersCredits = {
    'wallet-0xc227c39367a3207f197ecbfd77305a25b07f71bf': 0, // credit votre portefeuille ici
    'wallet-0x1234abcd': 100,  // Adresse corrigée
    'wallet-0x5678efgh': 50,
  };

// Route pour générer un token Firebase
app.post('/api/getFirebaseToken', async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const uid = `wallet-${walletAddress}`;
    const token = await admin.auth().createCustomToken(uid);
    res.json({ token });
  } catch (error) {
    console.error("Erreur lors de la génération du token Firebase:", error);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour obtenir les crédits de l'utilisateur
app.get('/api/getUserCredits', (req, res) => {
  const { walletAddress } = req.query;
  const credits = usersCredits[`wallet-${walletAddress}`] || 0;
  res.json({ credits });
});



// Route pour modifier les crédits d'un utilisateur existant
app.post('/api/updateUserCredits', (req, res) => {
   
    const { walletAddress, newCredits } = req.body;
  
    // Valider le montant des nouveaux crédits
    if (typeof newCredits !== 'number' || newCredits < 0) {
      return res.status(400).json({ message: 'Credits must be a positive number.' });
    }
  
    const uid = `wallet-${walletAddress}`;
    
    // Vérifier si l'utilisateur existe
    if (usersCredits[uid] !== undefined) {
      usersCredits[uid] = newCredits; // Mettre à jour les crédits de l'utilisateur
      return res.json({ message: 'Credits updated successfully', credits: usersCredits[uid] });
      console.log('enter')
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  });
  



// Route pour gérer le webhook de SimplePay
app.post('/api/simplepay-webhook', (req, res) => {
  const { walletAddress, amountPaid } = req.body;

  if (!walletAddress || !amountPaid) {
    return res.status(400).send('Invalid request');
  }

  // Mise à jour des crédits de l'utilisateur
  const userKey = `wallet-${walletAddress}`;
  if (!usersCredits[userKey]) {
    usersCredits[userKey] = 0;
  }
  
  usersCredits[userKey] += amountPaid; // Ajoutez le montant payé aux crédits de l'utilisateur

  console.log(`Les crédits pour ${walletAddress} ont été mis à jour. Nouveau solde : ${usersCredits[userKey]}`);
  res.status(200).send('Credits updated successfully');
});

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
