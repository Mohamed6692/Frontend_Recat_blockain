import { ConnectButton, WalletButton } from '@rainbow-me/rainbowkit';
import './App.css'
import "@rainbow-me/rainbowkit/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
  RainbowKitProvider,
  AvatarComponent,
} from '@rainbow-me/rainbowkit';

// Fonction pour générer une couleur en fonction de l'adresse
import { generateColorFromAddress } from './utils.ts';


// Composant personnalisé pour l'avatar
export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = generateColorFromAddress(address);
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: 20,
        width: 20,
      }}
    >
      
    </div>
  );
};


const Appwal = () => {

  const { connectModalOpen } = useConnectModal();
  const { accountModalOpen } = useAccountModal();
  const { chainModalOpen } = useChainModal();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0,
      }}
    >
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {!connected ? (
                <WalletButton wallet="metamask" />
              ) : (
                <div style={{ display: 'flex', gap: 30 }}>
                  {/* Bouton pour changer de chaîne avec icône */}
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="btn btn-light"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    {chain.iconUrl && (
                      <img
                        src={chain.iconUrl}
                        alt={`${chain.name} icon`}
                        style={{ width: '20px', height: '20px' }}
                      />
                    )}
                    {chain.name} 
                  </button>

                  {/* Bouton pour afficher les détails du compte */}
                  {/* <button
                    onClick={openAccountModal}
                    type="button"
                    className="btn btn-light"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    {account.displayName}
                    {account.ensAvatar}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}{' '}
                  </button> */}

                <button
                    onClick={openAccountModal}
                    type="button"
                    className="btn btn-light"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                     {account.displayBalance
                     
                      ? ` (${account.displayBalance})`
                      : ''}{' '}
                  {account.address && (
                    <CustomAvatar 
                      address={account.address} 
                      ensImage={account.ensAvatar} 
                      size={20} 
                    />
                  )}
                      
                    {account.displayName}
                    {account.ensAvatar}
                   
                  </button>

                </div>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default Appwal;
