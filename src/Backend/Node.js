const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuration CORS
const corsOptions = {
  origin: '*', // 
  optionsSuccessStatus: 200
};

const app = express();
app.use('/api', cors(corsOptions)); 
app.use(bodyParser.json());

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-service-account.json'))
});

// Initialiser Firestore
const db = admin.firestore();


// Simuler la base de données utilisateur
let usersCredits = {
    'wallet-0x3aed31e353ac03b0a212810e17a96286c5027e9b': 0, // credit votre portefeuille ici
    'wallet-0x1234abcd': 100,  // Adresse corrigée
    'wallet-0x5678efgh': 50,
    'wallet-0x052e149b092135a65a5A8d4befb47760b77B7960': 0,
  };

// Route pour générer un token Firebase
app.post('/api/getFirebaseToken', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).send("Wallet address is required.");
  }

  try {
    const uid = `wallet-${walletAddress}`;
    const token = await admin.auth().createCustomToken(uid);

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      await userRef.set({
        walletAddress: walletAddress,
        credits: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    const userData = { walletAddress, credits: userDoc.exists ? userDoc.data().credits : 0 };
    res.json({ token, user: userData });
    
  } catch (error) {
    console.error("Error retrieving Firestore document:", error);
    res.status(500).send("Server error while recovering user.");
  }
});



// Route pour obtenir les crédits de l'utilisateur
app.get('/api/getUserCredits', async (req, res) => {
  const { walletAddress } = req.query;
  const uid = `wallet-${walletAddress}`;

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const { credits } = userDoc.data();
      res.json({ credits });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error retrieving credits:', error);
    res.status(500).send('Erreur serveur');
  }
});


// Route pour mettre à jour les crédits d'un utilisateur existant
app.post('/api/updateUserCredits', async (req, res) => {
  const { walletAddress, newCredits } = req.body;

  if (typeof newCredits !== 'number' || newCredits < 0) {
    return res.status(400).json({ message: 'Credits must be a positive number.' });
  }

  const uid = `wallet-${walletAddress}`;

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.update({ credits: newCredits });
      res.json({ message: 'Credits updated successfully', credits: newCredits });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error("Error updating credits:", error);
    res.status(500).send("Error serveur");
  }
});





// // Route pour obtenir les crédits de l'utilisateur
// app.get('/api/getUserCredits', (req, res) => {
//   const { walletAddress } = req.query;
//   const credits = usersCredits[`wallet-${walletAddress}`] || 0 ;
//   res.json({ credits });
// });



// // Route pour modifier les crédits d'un utilisateur existant
// app.post('/api/updateUserCredits', (req, res) => {
//   console.log('Route /api/updateUserCredits called');
//     const { walletAddress, newCredits } = req.body;
  
//     // Valider le montant des nouveaux crédits
//     if (typeof newCredits !== 'number' || newCredits < 0) {
//       return res.status(400).json({ message: 'Credits must be a positive number.' });
//     }
  
//     const uid = `wallet-${walletAddress}`;
//     console.log(uid);
//     // Vérifier si l'utilisateur existe
//     if (usersCredits[uid] !== undefined) {
//       console.log(usersCredits[uid]);
//       usersCredits[uid] = newCredits; // Mettre à jour les crédits de l'utilisateur
//       return res.json({ message: 'Credits updated successfully', credits: usersCredits[uid] });

//     } else {
//       return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//     }
//   });
  



// Route pour gérer le webhook de SimplePay
// app.post('/api/simplepay-webhook', (req, res) => {
//   const { walletAddress, amountPaid } = req.body;

//   if (!walletAddress || !amountPaid) {
//     return res.status(400).send('Invalid request');
//   }

//   // Mise à jour des crédits de l'utilisateur
//   const userKey = `wallet-${walletAddress}`;
//   if (!usersCredits[userKey]) {
//     usersCredits[userKey] = 0;
//   }
  
//   usersCredits[userKey] += amountPaid; // Ajoutez le montant payé aux crédits de l'utilisateur

//   console.log(`Les crédits pour ${walletAddress} ont été mis à jour. Nouveau solde : ${usersCredits[userKey]}`);
//   res.status(200).send('Credits updated successfully');
// });

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
