import React, { useEffect, useState } from 'react';
import '@simplepay-ai/widget';
import axios from 'axios';
import './Main.css'

const AccesLogin = () => {
    // Styles en ligne
    const styles = {
        container: {
          margin: 0,
          padding: 0,
          marginTop: '4rem',
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
          color: 'white', // Couleur du titre en blanc
          textAlign: 'center',
          backgroundColor: '#c7abab8a',
          padding: '1rem 0 1rem 0', // Padding supérieur
          width: '100%', 
        },
        title2: {
            textAlign: 'center', // Alignement du titre à gauche
            marginTop: '7rem',  // Utilisation de rem pour l'espacement autour du titre (16px = 1rem)
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

   

    return (
        <div style={styles.container}>
            <div style={styles.body}>
                <div style={styles.appContainer}>
                <h4 style={styles.title}>SimplePay</h4>
                 <p style={styles.title2}>Log in to access SymplePay processing</p>
                </div>
            </div>
        </div>
    );
};

export default AccesLogin;
