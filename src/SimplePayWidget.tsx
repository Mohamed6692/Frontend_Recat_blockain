import React from 'react';
import '@simplepay-ai/widget';

interface SimplePayWidgetProps {
  price: string;
  appId: string;
  clientId: string;
  backToStoreUrl: string;
  dark?: boolean; // optional
  invoiceId?: string; // optional
}

const SimplePayWidget: React.FC<SimplePayWidgetProps> = ({
  price,
  appId,
  clientId,
  backToStoreUrl,
  dark = false,
  invoiceId,
}) => {
  return (
    <div>
      <payment-app
        price={price}
        appId={appId}
        clientId={clientId}
        backToStoreUrl={backToStoreUrl}
        dark={dark ? 'true' : 'false'}
        invoiceId={invoiceId}
      />
    </div>
  );
};

export default SimplePayWidget;
