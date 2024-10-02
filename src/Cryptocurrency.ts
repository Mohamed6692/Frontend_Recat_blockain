// Importations des types depuis le client API SimplePay
import type { Cryptocurrency as ApiCryptocurrency, Network as ApiNetwork } from '@simplepay-ai/api-client';
import type { Invoice as ApiInvoice } from '@simplepay-ai/api-client';

  

import {
    
    InvoiceCreateRequest as ApiInvoiceCreateRequest,
    InvoiceCreateErrors as ApiInvoiceCreateErrors,
    HttpError,
    ValidationError,
    InvoiceService, // Service pour gérer les factures
    CryptocurrencyService 
} from '@simplepay-ai/api-client';

// Définition des interfaces pour les taux de cryptomonnaie
interface CryptocurrencyRates {
    [key: string]: number; // Exemple : { "USD": 50000, "EUR": 45000 }
}

// Interface pour la cryptomonnaie personnalisée
interface CustomCryptocurrency {
    id: string; // ID de la cryptomonnaie
    symbol: string; // Symbole de la cryptomonnaie
    name: string; // Nom de la cryptomonnaie
    decimals: number; // Nombre de décimales
    stable: boolean; // Indique si c'est une stablecoin
    networks?: CustomNetwork[]; // Liste des blockchains acceptées
    rates?: CryptocurrencyRates; // Taux de conversion vers les devises fiat
}

// Interface pour le réseau personnalisé
interface CustomNetwork {
    id: string; // ID du réseau
    symbol: string; // Symbole du réseau
    name: string; // Nom du réseau
    type: string; // Type de réseau
}



export type CryptocurrencyListErrors = {
    appId?: 'uuid4';
    rates?: 'boolean';
    networks?: 'boolean';
};

// Définition de la requête pour la liste des cryptomonnaies
type CryptocurrencyListRequest = {
    appId?: string; // ID de l'application
    rates?: boolean; // Inclure les taux
    networks?: boolean; // Inclure la liste des réseaux
};

// Interface pour la facture (invoice)
interface Invoice {
    /**
     * ID de la facture
     * 
     * @example '6ef3cc15-24ae-4192-9744-a9017ed153cc'
     */
    id: string;

    /**
     * ID de la facture parente
     * 
     * @example 'dd90187e-d1d0-405f-bf2f-242c15403297'
     */
    parentId: string | null;

    /**
     * ID du client final qui effectue le paiement
     * 
     * @example '46778124-f9e0-4eba-ae1a-ecd5c0d9e90b'
     */
    clientId: string;

    /**
     * Adresse du portefeuille du client
     * 
     * @example '0x41ce73496136A0072013B9187550e30841eDeD74'
     */
    from: string;

    /**
     * Adresse du portefeuille du destinataire
     * 
     * @example '0x1105F97fBAB9674Ef069331F2b48E9B870ed9Adc'
     */
    to: string;

    /**
     * Montant de la facture en cryptomonnaie
     * 
     * @example '501.723934'
     */
    amount: string;

    /**
     * Prix de la facture en monnaie fiduciaire
     * 
     * @example '500.00'
     */
    price: string;

    /**
     * Type de la facture
     * 
     * @example 'payment'
     */
    type: 'payment';

    /**
     * Statut de la facture
     * 
     * @example 'success'
     */
    status: InvoiceStatus;

    /**
     * Hash de la transaction
     * 
     * @example '0xe9e91f1ee4b56c0df2e9f06c2b8c27c6076195a88a7b8537ba8313d80e6f124e'
     */
    txHash: string | null;

    /**
     * Numéro de bloc
     * 
     * @example 1000000
     */
    txBlock: number | null;

    /**
     * Date et heure de création de la facture
     * 
     * @example '2024-07-31T00:48:53Z'
     */
    createdAt: string;

    /**
     * Date et heure de mise à jour de la facture
     * 
     * @example '2024-07-31T00:49:28Z'
     */
    updatedAt: string;

    /**
     * Date d'expiration de la facture
     * 
     * @example '2024-07-31T01:14:28Z'
     */
    expireAt: string;

    /**
     * Cryptomonnaie utilisée pour la facture
     */
    cryptocurrency: ApiCryptocurrency;

    /**
     * Réseau blockchain utilisé
     */
    network: ApiNetwork;

    /**
     * Monnaie fiduciaire utilisée
     */
    currency: Currency;

    /**
     * Données personnalisées attachées à la facture
     * 
     * @example {
     *   someKey: 'someValue'
     * }
     */
    payload: InvoicePayload | null;
}

// Interface pour la création d'une requête de facture
type InvoiceCreateRequest = {
    appId: string;
    type: 'payment';
    parentId: string | null;
    clientId: string;
    from: string;
    cryptocurrency: string;
    network: string;
    currency: string;
    price: number;
    payload?: InvoicePayload | null;
};

// Énumération des statuts possibles d'une facture
enum InvoiceStatus {
    Created = 'created',
    Processing = 'processing',
    Confirming = 'confirming',
    Success = 'success',
    Rejected = 'rejected',
    Canceled = 'canceled',
    Expired = 'expired'
}

// Interface pour la monnaie fiduciaire
interface Currency {
    code: string; // Exemple : USD, EUR
    symbol: string; // Exemple : $, €
    rate: number; // Taux de conversion
}

// Interface pour les données personnalisées de la facture
interface InvoicePayload {
    [key: string]: any;
}

// Interface pour les erreurs de création de facture
type InvoiceCreateErrors = {
    appId?: 'required' | 'uuid4' | 'invalid';
    type?: 'required' | 'oneof';
    parentId?: 'uuid4';
    clientId?: 'required' | 'ascii' | 'max' | 'invalid';
    from?: 'required' | 'alphanum' | 'invalid';
    cryptocurrency?: 'required' | 'alpha' | 'uppercase' | 'invalid';
    network?: 'required' | 'alpha' | 'lowercase' | 'invalid';
    currency?: 'required' | 'alpha' | 'uppercase' | 'invalid';
    price?: 'required' | 'numeric' | 'gte' | 'lte';
    payload?: 'len';
};

// Exemple de création de facture avec gestion des erreurs
try {
    const request: InvoiceCreateRequest = {
        appId: 'c4affb7c-586c-48a2-803b-8379b1e1e8b2', // ID de votre application
        type: 'payment', // Type de facture
        clientId: '46778124-f9e0-4eba-ae1a-ecd5c0d9e90b', // ID du client final
        from: '0x41ce73496136A0072013B9187550e30841eDeD74', // Adresse du portefeuille du client
        cryptocurrency: 'USDT', // Symbole de la cryptomonnaie
        network: 'ethereum', // Symbole du réseau
        currency: 'USD', // Monnaie fiduciaire
        price: 500 // Prix de la facture
        ,
        parentId: null
    };

    // Création de la facture via l'API
    // const invoice = await api.invoice.create(request);
    // console.debug(invoice);
} catch (e) {
    // Gestion des erreurs de validation
    if (e instanceof ValidationError) {
        const error = e as ValidationError<InvoiceCreateErrors>;
        console.error(error.errors);
    }

    // Gestion des erreurs HTTP
    if (e instanceof HttpError) {
        const error = e as HttpError;
        console.error(error.code);
    }
}


try {
    const request: CryptocurrencyListRequest = {
        // Request is optional and may be omitted
    };

    // const cryptocurrencies = await api.cryptocurrency.list(request);

    // console.debug(cryptocurrencies);
} catch (e) {
    if (e instanceof HttpError) {
        const error = e as HttpError;

        console.error(error.code);
    }
}