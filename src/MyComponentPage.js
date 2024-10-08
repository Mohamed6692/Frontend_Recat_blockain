import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@simplepay-ai/widget';
import Main from './SimplePay/Main';
import Editor from '@monaco-editor/react';
import './App.css';
import Appwal from './cnx/src/App.tsx'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Blockchain from './blockchain';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Pour activer les tooltips
import TooltipIcon from './Info';
import '@rainbow-me/rainbowkit/styles.css';
import MoreIcon from '@mui/icons-material/MoreVert';
import CryptoList from './SelectCryto.js';
import ConnectWallet from './connectWallet.js';
import './index.css';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './cnx/src/wagmi.ts';
import './App.css';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import { ChakraProvider } from '@chakra-ui/react'; // Importez ChakraProvide
import { InfoIcon, PhoneIcon, AtSignIcon } from '@chakra-ui/icons'; // Import des icônes supplémentaires


const queryClient = new QueryClient();


function MyComponentPage() {

  const [inputText, setInputText] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [labelActive, setLabelActive] = useState(false);
  const [showConnectButton, setShowConnectButton] = useState(false); // State to handle Connect Wallet visibility
  const [creditBalance, setCreditBalance] = useState(100);
  const [menuOpen, setMenuOpen] = useState(false);
  

  const handleEditorDidMount = (editor, monaco) => {
    // Define and apply the custom theme once Monaco is available
    monaco.editor.defineTheme('customNight', {
      base: 'vs-dark', // Use a dark base theme
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#34C759' }, // Green text color for comments
      ],
      colors: {
        'editor.background': '#141515', // Violet background color
        'editor.foreground': '#34C759', // Green text color for general content
      },
    });
    // Apply the custom theme
    monaco.editor.setTheme('customNight');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  
  const handleProcessText = () => {
    const formattedText = inputText;
    setCodeOutput(formattedText); // Mettre à jour la zone de code avec le texte formaté
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeOutput);
    alert('Code copied to clipboard!');
  };

  const handleLinkClick = (link) => {
    // Logique pour gérer le clic sur le lien
    console.log(`Clicked on: ${link}`);
    // Ajoutez votre logique de navigation ou autre ici
  };
  const handleWalletClick = () => {
    setShowConnectButton(true); // Affiche le ConnectButton lorsque l'utilisateur clique sur "Connect wallet"
  };
  
  const handleRevert = () => {
    setInputText(''); // Effacer le champ de texte d'entrée
    setCodeOutput(''); // Effacer la zone de sortie de code
    setLabelActive(false);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      alert('Text pasted from clipboard!');
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>Crypto - ICO Crypto, Blockchain & Cryptocurrency Web Template</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="shortcut icon" type="image/x-icon" href="./assets/img/favicon.png" />
      <link rel="stylesheet" href="./assets/css/bootstrap-5.0.0-alpha-1.min.css" />
      <link rel="stylesheet" href="./assets/css/LineIcons.2.0.css" />
      <link rel="stylesheet" href="./assets/css/animate.css" />
      <link rel="stylesheet" href="./assets/css/main.css" />
     

      <div>
        {/* Internet Explorer upgrade warning */}
        {/*[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]*/}

        {/* Preloader */}
        <div className="preloader d-none">
          <div className="loader">
            <div className="ytp-spinner">
              <div className="ytp-spinner-container">
                <div className="ytp-spinner-rotator">
                  <div className="ytp-spinner-left">
                    <div className="ytp-spinner-circle"></div>
                  </div>
                  <div className="ytp-spinner-right">
                    <div className="ytp-spinner-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="header navbar-area">
        <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="index.html">
                <img src={`${process.env.PUBLIC_URL}/assets/img/logo.svg`} alt="Logo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto" style={{ display: 'flex', gap: '0', paddingLeft: '0' }}>
                  <li className="nav-item" style={{ margin: '0' }}>
                    <button type="button" className="btn btn-light" style={{ margin: '0' }}>Credit Balance: ${creditBalance}</button>
                  </li>
                  <li className="nav-item" style={{ margin: '0' }}>
                    <a className="page-scroll active" href="#docs"> 
                      <button type="button" className="btn btn-light" > Docs <i className="bi bi-box-arrow-in-right"></i></button>
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: '0px' ,marginRight: '3px'}}>
                    <a className="page-scroll active" href="#list-crytpo"> 
                     <CryptoList/>
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: '0px' ,marginRight: '3px'}}>
                    <a className="page-scroll active" href="#list-crytpo"> 
                     <ConnectWallet/>
                    </a>
                  </li>

                  {/* <li className="nav-item" style={{ margin: '0' }}>
                    <a className="page-scroll" href="#wallet">
                      <React.StrictMode>
                        <WagmiProvider config={config}>
                          <QueryClientProvider client={queryClient}>
                            <RainbowKitProvider>
                              <Appwal />
                            </RainbowKitProvider>
                          </QueryClientProvider>
                        </WagmiProvider>
                      </React.StrictMode>
                    </a>
                  </li> */}

                  <li className="nav-item" style={{ margin: '0px' }}>
                    <a className="page-scroll active" href="#more"> 
                      <ChakraProvider> {/* Enveloppez votre application ici */}
                        <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<HamburgerIcon />}
                          variant='outline'
                          bg='white'  // Couleur de fond blanche
                          color='black' // Couleur du texte noire (facultatif pour contraste)
                          _hover={{ bg: 'gray.200' }} // Couleur de fond lors du hover
                          _active={{ bg: 'gray.300' }} // Couleur de fond lorsque le bouton est activé
                         />
                            <MenuList>
                              {/* Menu item pour "How to Use" */}
                              <MenuItem color="black">
                                How to Use
                                <InfoIcon style={{ marginLeft: '70px' }}/> {/* Ajout de l'icône après le texte */}
                              </MenuItem>

                              {/* Menu item pour "Pricing Options" */}
                              <MenuItem color="black">
                                Pricing Options
                                <ExternalLinkIcon style={{ marginLeft: '40px' }} /> {/* Ajout de l'icône après le texte */}
                              </MenuItem>

                              {/* Menu item pour "Contact Us" */}
                              <MenuItem color="black">
                                Contact Us
                                <PhoneIcon style={{ marginLeft: '70px' }} /> {/* Ajout de l'icône après le texte */}
                              </MenuItem>
                            </MenuList>

                        </Menu>
                      </ChakraProvider>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          </div>
        </div>
      </header>

      {/* ========================= header end ========================= */}


     

      {/* ========================= hero-section start ========================= */}
      <section id="home" className="hero-section">
        <div className="shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="container">
          <div className="row align-items-center">
            
          <div className="container">
              <div className="d-flex  justify-content-center align-items-center">
                <h3 style={{ color: 'white' }}>Crypto</h3>
                <TooltipIcon />
                
              </div>      
                  <div className="row mt-2">
                    {/* Input Section */}

                      <div className="col-lg-6">
                        <div className="form-floating mb-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Enter your smart contract address"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onFocus={() => setLabelActive(true)} // Activer le label au focus
                            onBlur={() => setLabelActive(inputText !== '')} // Garder le label actif si le champ n'est pas vide
                            style={{ backgroundColor: 'rgb(20, 21, 21)', color: '#34C759', fontSize: '14px' }} // Ajuster la taille de la police globale
                          />
                          <style jsx>{`
                            #floatingInput::placeholder {
                              font-size: 12px; /* Taille spécifique du placeholder */
                               color: #34C759;
                            }
                          `}</style>
                          <button className="btn btn-outline-secondary" 
                            onClick={pasteFromClipboard} 
                            type="button"
                            title="Paste from clipboard">
                            <i className="bi bi-file-diff-fill"></i>
                          </button>
                        </div>

                        {/* <label 
                          htmlFor="floatingInput" 
                          className="custom-label"
                          style={{ 
                            color: '#34C759', 
                            display: labelActive || inputText ? 'none' : 'block', // Disparaître si le label est actif ou s'il y a du texte
                            fontSize: '0.8rem', // Ajustez cette valeur pour réduire la taille du texte
                            marginBottom: '0.7rem'
                          }}
                        >
                          Enter your smart contract address
                        </label> */}
                      </div>
                      <button 
                      className="btn btn-outline-secondary mb-3" 
                      style={{ 
                        width: '300px', 
                        backgroundColor: 'black', // Couleur de fond noire
                        color: '#34C759', // Couleur du texte verte
                        borderColor: '#34C759', // Couleur de la bordure pour correspondre au texte
                      }} 
                      onClick={handleProcessText}
                    >
                      Get Flattened Code | $2
                    </button>        
                      <Main/>
                    </div>
                    {/* Output Section - Styled as Code Editor */}
                    <div className="col-lg-6">
                      <div className="editor-container">
                          <Editor
                          height="390px"
                          width="100%"
                          defaultLanguage="javascript"
                          value={codeOutput}
                          theme="customNight"
                          onMount={handleEditorDidMount} // Ensure Monaco is ready before applying the theme
                          options={{
                            readOnly: true,
                            lineNumbers: 'on',
                          }}
                        />
                    </div>
                      {/* Boutons */}
                      <div className="d-flex justify-content-start mt-2">
                        <button 
                          className="btn btn-outline-secondary me-2" 
                          style={{ 
                            backgroundColor: 'black', // Couleur de fond noire
                            color: '#34C759', // Couleur du texte verte
                            borderColor: '#34C759', // Couleur de la bordure pour correspondre au texte
                            width: '350px',
                          }} 
                          onClick={copyToClipboard}
                        >
                          Copy Code
                        </button>
                        <button 
                          className="btn btn-outline-secondary" 
                          style={{ 
                            backgroundColor: 'black', // Couleur de fond noire
                            color: '#34C759', // Couleur du texte verte
                            borderColor: '#34C759', // Couleur de la bordure pour correspondre au texte
                            width: '350px',
                          }} 
                          onClick={handleRevert}
                        >
                          Revert
                        </button>
                      </div>
                        {/* Boîte d'instructions semi-transparente */}
                        <div
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent
                            padding: '20px',
                            borderRadius: '8px',
                            color: 'white',
                            marginBottom: '20px',
                            marginTop: '20px',
                            lineHeight: '1.5', // Hauteur des lignes
                            textAlign: 'left',
                          }}
                        >
                         <h4 style={{ marginLeft: '10px' }}>Instructions for SimplePay</h4>
                          <ol> {/* Align text properly */}
                            <li style={{ marginLeft: '10px' }}>Step 1: Enter the required code in the input field.</li>
                            <li style={{ marginLeft: '10px' }}>Step 2: Click the "Process Text" button to process your input.</li>
                            <li style={{ marginLeft: '10px' }}>Step 3: Use the "Copy Code" button to copy the output code.</li>
                            <li style={{ marginLeft: '10px' }}>Step 4: You can revert the changes using the "Revert" button.</li>
                          </ol>
                        </div>
                      </div>       
                  </div>
                </div> 
            </div>
          </div>
      </section>

        {/* JS scripts */}
        <script src="./assets/js/bootstrap.bundle-5.0.0.alpha-1-min.js"></script>
        <script src="./assets/js/contact-form.js"></script>
        <script src="./assets/js/wow.min.js"></script>
        <script src="./assets/js/main.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
            
      </div>
    </div>
  );
}

export default MyComponentPage;