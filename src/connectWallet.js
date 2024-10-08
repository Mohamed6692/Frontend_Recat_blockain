import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { WalletIcon } from '@chakra-ui/icons'; // Import de l'icône de portefeuille
import { FaWallet,FaSignOutAlt } from 'react-icons/fa'; // Importation de l'icône de portefeuille

const ConnectWallet = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletAddress, setWalletAddress] = useState(null);



  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]); // Stocker l'adresse du portefeuille
      } catch (error) {
        console.error("Erreur de connexion au portefeuille:", error);
      }
    } else {
      alert('Veuillez installer MetaMask ou un autre portefeuille.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null); // Réinitialiser l'adresse du portefeuille
  };




  // Fonction pour tronquer l'adresse du portefeuille
  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`; // Ex: 0x1234...abcd
  };

  return (
    <ChakraProvider>
      <div>
        {walletAddress ? (
          <Button colorScheme='red' onClick={disconnectWallet} style={{ fontSize: '12px' }}>
            Disconnect : {truncateAddress(walletAddress)} {/* Afficher l'adresse du portefeuille tronquée */}
            <FaSignOutAlt style={{ marginLeft: '8px' }} />
          </Button>
        ) : (
            <Button colorScheme='blue' 
            onClick={connectWallet}
            style={{ 
              fontSize: '12px', 
              backgroundColor: 'white', // Couleur de fond blanc
              color: 'black', // Couleur du texte noir
              border: '1px solid black', // Bordure noire pour le bouton
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
