import React, { useEffect } from 'react';
import { Client, CryptocurrencyListRequest, HttpError, Cryptocurrency as ApiCryptocurrency } from '@simplepay-ai/api-client'; // Ensure correct types

const api = new Client({
    apiKey: '<place your API key here>',
});

const CryptoList: React.FC = () => {
    useEffect(() => {
        const fetchCryptocurrencies = async () => {
            try {
                const request: CryptocurrencyListRequest = {};
                // Assuming `list` returns an array of `ApiCryptocurrency` instead of `CryptocurrencyListResponse`
                const cryptocurrencies: ApiCryptocurrency[] = await api.cryptocurrency.list(request);
                console.debug(cryptocurrencies);
            } catch (e) {
                if (e instanceof HttpError) {
                    console.error(e.code);
                } else {
                    console.error('Unknown error occurred', e);
                }
            }
        };

        fetchCryptocurrencies();
    }, []);

    return (
        <div>
            <h1>Cryptocurrency List</h1>
        </div>
    );
};

export default CryptoList;
