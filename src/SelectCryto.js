import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptos(response.data);

        // Trouver Ethereum dans les crypto-monnaies récupérées
        const ethOption = response.data.find(crypto => crypto.id === 'ethereum');
        if (ethOption) {
          setSelectedCrypto({
            value: ethOption.id,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={ethOption.image} alt={ethOption.name} style={{ width: '30px', marginRight: '10px' }} />
                {ethOption.name} ({ethOption.symbol.toUpperCase()})
              </div>
            ),
          });
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const cryptoOptions = cryptos.map(crypto => ({
    value: crypto.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={crypto.image} alt={crypto.name} style={{ width: '30px', marginRight: '10px' }} />
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </div>
    )
  }));

  return (
    <ChakraProvider>
      <div>
        <Button onClick={onOpen}>
          {selectedCrypto ? selectedCrypto.label : 'Ouvrir le Modal'} {/* Texte du bouton */}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#089f09" >Select a cryptocurrency</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                value={selectedCrypto}
                onChange={(selectedOption) => {
                  setSelectedCrypto(selectedOption);
                  onOpen(); // Ouvrir le modal lors de la sélection
                }}
                options={cryptoOptions}
                placeholder="Sélectionnez une crypto-monnaie"
              />

              {selectedCrypto && (
                <div style={{ marginTop: '20px' }}>
               <strong><h3 style={{ fontSize: '12px', color: 'black' }}>Details of the selected:</h3></strong> 
                {cryptos.map(crypto => 
                  crypto.id === selectedCrypto.value && (
                    <div key={crypto.id} style={{ fontSize: '10px', color: 'black' }}>
                      <p style={{ fontSize: '10px', color: 'black' }}><strong>Nom :</strong> {crypto.name}</p>
                      <p style={{ fontSize: '10px', color: 'black' }}><strong>Adresse :</strong> {crypto.id}</p>
                      <img src={crypto.image} alt={crypto.name} style={{ width: '30px' }} />
                    </div>
                  )
                )}
              </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default CryptoList;
