export default function useQRCodeStyling (options)  {
    //Only do this on the client
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const QRCodeStylingLib = require("qr-code-styling");
      // @ts-ignore
      const qrCodeStyling = new QRCodeStylingLib(options);
      return qrCodeStyling;
    }
    return null;
  };