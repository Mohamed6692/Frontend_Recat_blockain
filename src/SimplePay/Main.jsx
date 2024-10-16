import React, { useEffect, useState } from 'react';
import '@simplepay-ai/widget';
import axios from 'axios';
import './Main.css'

const Main = ({ walletAddress, setCredits }) => {
    // Styles en ligne
    const styles = {
        container: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        body: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Utilisation de vh pour une hauteur relative à l'écran visible
        },
        appContainer: {
          width: '100%',
          height: '28.125rem', // Conversion de 450px en rem (450px = 28.125rem)
          maxWidth: '24rem', // Conversion de 390px en rem (390px = 24rem)
          borderRadius: '0.375rem', // Conversion de 6px en rem pour la bordure arrondie (6px = 0.375rem)
          overflow: 'hidden',
          border: '1px solid #e4e4e7',
        },
        title: {
          textAlign: 'left', // Alignement du titre à gauche
          margin: '1rem 0', // Utilisation de rem pour l'espacement autour du titre (16px = 1rem)
          color: 'white', // Couleur du titre en blanc
        },
        '@media (max-width: 768px)': {
          appContainer: {
            height: '100%', // Ajustement de la hauteur à 100% sur petits écrans
            maxWidth: 'unset', // Suppression de la limite de largeur pour petits écrans
            borderRadius: '0', // Bordures arrondies désactivées sur petits écrans
            border: '0', // Suppression de la bordure sur petits écrans
          },
        },
      };

    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const handlePaymentSuccess = async () => {
        try {
            // Récupérez le montant des crédits achetés via SimplePay
            const purchasedCredits = 100; // Vous pouvez remplacer cela par un montant réel si disponible via SimplePay
            
            // Envoyez une requête au backend pour ajouter les crédits à l'utilisateur
            const response = await axios.post('http://localhost:3000/api/addCredits', {
                walletAddress,
                credits: purchasedCredits,
            });

            if (response.status === 200) {
                // Mettez à jour les crédits dans l'état
                setCredits(prevCredits => prevCredits + purchasedCredits);
                alert('Crédits ajoutés avec succès à votre compte.');
            } else {
                alert('Erreur lors de l\'ajout des crédits.');
            }
        } catch (error) {
            console.error("Erreur lors du traitement du paiement:", error);
            alert('Erreur lors du traitement du paiement.');
        }
    };

    useEffect(() => {
        const paymentApp = document.querySelector('payment-app');

        // Écoutez l'événement de succès du paiement (à adapter selon la documentation de SimplePay)
        if (paymentApp) {
            paymentApp.addEventListener('paymentSuccess', handlePaymentSuccess);
        }

        return () => {
            if (paymentApp) {
                paymentApp.removeEventListener('paymentSuccess', handlePaymentSuccess);
            }
        };
    }, []);

    const connectWallet = () => {
        // Simulez la connexion du portefeuille
        setIsWalletConnected(true);
    };


    return (
        <div style={styles.container}>
            <h4 style={styles.title}>SimplePay</h4> {/* Titre aligné à gauche */}
            <div style={styles.body}>
                <div style={styles.appContainer}>
                    <payment-app
                        appId="eb651bb3-6e26-4f1d-9549-d96540300d8e"
                        clientId="707533d2-971d-4cd6-a2a5-9c6dd44c0fe5"
                        invoiceId=""
                        backToStoreUrl="https://simplepay.ai"
                        serverUrl="https://api.simplepay.ai/invoice"
                        dark
                        
                    ></payment-app>
                </div>
            </div>
        </div>
    );
};

export default Main;
