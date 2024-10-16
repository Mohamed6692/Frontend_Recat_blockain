import React, { useEffect,useState, useCallback} from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { FaWallet, FaSignOutAlt ,FaDollarSign} from 'react-icons/fa'; 
import { auth } from './firebase';
import { signInWithCustomToken, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'


const ConnectWallet = ({ setCredits, credits, setIsAuthenticated }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false); // État pour vérifier la connexion du portefeuille


  // Fonction pour vérifier et mettre à jour les crédits après un achat
  const checkCreditsAfterPurchase = async (walletAddress) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getUserCredits?walletAddress=${walletAddress}`);
      const { credits } = response.data;
      setCredits(credits); // Mettez à jour les crédits affichés dans l'interface utilisateur
    } catch (error) {
      console.error('Erreur lors de la vérification des crédits:', error);
    }
  }; 

  // Mémorisation de fetchCredits avec useCallback
  const fetchCredits = useCallback(async (walletAddress) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getUserCredits?walletAddress=${walletAddress}`);
      const { credits } = response.data;
      setCredits(credits);
      console.log('Credits momo: ', credits);
    } catch (error) {
      console.error("Erreur lors de la récupération des crédits:", error);
    }
  }, [setCredits]); // Dépendance uniquement sur setCredits



  // Fonction d'authentification avec Firebase
  const authenticateWithFirebase = useCallback(async (walletAddress) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await axios.post('http://localhost:3000/api/getFirebaseToken', { walletAddress });
      const { token } = response.data;
      const userCredential = await signInWithCustomToken(auth, token);
      console.log('Authenticated user:', userCredential.user);

      await fetchCredits(walletAddress);
      setIsAuthenticated(true);  // Mettez à jour l'état d'authentification ici
    } catch (error) {
      console.error("Erreur lors de l'authentification avec Firebase:", error);
      setError('Authentication error. Please try again.');
    }
  }, [fetchCredits, setIsAuthenticated]); // Dépendance sur fetchCredits et setIsAuthenticated



  // Vérifier si l'utilisateur est déjà connecté lors du chargement de la page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const walletAddress = user.uid.replace('wallet-', '');
        setWalletAddress(walletAddress);
        console.log('Wallet Address:', walletAddress); 
        setIsWalletConnected(true);
        await fetchCredits(walletAddress);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Nettoyage de l'abonnement
  }, [fetchCredits, setIsAuthenticated]);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        await authenticateWithFirebase(address);
        await fetchCredits(address);
        // checkCreditsAfterPurchase(address); // Vérifiez les crédits après la connexion
      } catch (error) {
        alert('Wallet connection error. Make sure MetaMask is installed and you are logged in.');
        console.error("Wallet connection error:", error);
      }
    } else {
      alert('Please install MetaMask or another wallet.');
    }
  };


  const updateCredits = async () => {
    const newCredits = prompt("Enter the new amount of credits:", credits);
    
    // Vérifiez si l'utilisateur a cliqué sur "Annuler" ou a laissé le champ vide
    if (newCredits === null || newCredits.trim() === "") {
        alert("The credit amount cannot be empty.");
        return;
    }

    const numericCredits = Number(newCredits);
    
    // Vérifiez si la conversion a réussi
    if (isNaN(numericCredits)) {
        alert("Please enter a valid number for credits.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/updateUserCredits', {
            walletAddress: walletAddress,
            newCredits: numericCredits,
        });
        alert(response.data.message);
        setCredits(response.data.credits); // Mettez à jour les crédits dans l'interface utilisateur
    } catch (error) {
        console.error("Error updating credits:", error);
        alert('Error updating credits. Check the console for details.');
    }
};



  const disconnectWallet = () => {
    setWalletAddress(null);
    setCredits(0);
    auth.signOut(); // Déconnecter l'utilisateur de Firebase
    setIsAuthenticated(false); // Mettez à jour l'état d'authentification ici
  };

  return (
    <ChakraProvider>
      <div>
        {walletAddress ? (
          <>
           {/* Bouton pour mettre à jour les crédits */}
           <Button 
              className="button-margin" // Ajoutez la classe ici si vous voulez l'espacement en dessous aussi
              bg='green.500'
              color='black' 
              borderColor='black' 
              variant='solid' 
              height='40px' 
              mr='5px' 
              _hover={{ cursor: 'pointer' }} 
              onClick={updateCredits} 
              style={{ fontSize: '12px' }}
            >
              Update credits <FaDollarSign style={{ marginLeft: '8px' }} />
            </Button>
            <Button 
              className="button-margin" // Ajoutez la classe ici
              bg='#ad3030' 
              color='white' 
              borderColor='black' 
              variant='solid' 
              height='44px' 
              mr='5px' 
              _hover={{ cursor: 'pointer' }} 
              onClick={disconnectWallet} 
              style={{ fontSize: '12px' }}
            >
              Disconnect: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              <FaSignOutAlt style={{ marginLeft: '8px' }} />
            </Button>
             {/* <p>Crédits: {credits}</p> */}
          </>
        ) : (
          <Button 
            colorScheme='blue' 
            onClick={connectWallet}
            style={{ 
              fontSize: '12px', 
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              height:'43px' 
            }}
          >
            Connect Wallet
            <FaWallet style={{ marginLeft: '8px' }} />
          </Button>
        )}
      </div>
    </ChakraProvider>
  );
};

export default ConnectWallet;
