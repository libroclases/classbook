const express = require('express');
const QRCode = require('qrcode');
const app = express();
const PORT = 9000;


// Creating the data
let data = {
    name:"Employee Name",
    age:27,
    department:"Police",
    id:"aisuoiqu3234738jdhf100223"
}
 
// Converting the data into String format

 
let stringdata = 'base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAY9SURBVO3BQW4sy7LgQDKg/W+ZfYY+SiBRJXXc993M/mGtSxzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYsc1rrIDx9S+UsVb6hMFU9U3qh4ojJVPFGZKiaVqeKJyl+q+MRhrYsc1rrIYa2L/PBlFd+k8kRlqpgq3qiYVN5QeaIyVTxR+aaKb1L5psNaFzmsdZHDWhf54ZepvFHxRsWkMlU8UfmEyhsVn6j4JpU3Kn7TYa2LHNa6yGGti/zwP07lL1VMKpPKVPGkYlJ5UvFfdljrIoe1LnJY6yI//MepTBVPVKaKJypTxaQyqTypmFSmikllqvhfdljrIoe1LnJY6yI//LKK31TxROUNlScqTyqeqEwVk8pU8ZsqbnJY6yKHtS5yWOsiP3yZyl9SmSqeVEwqU8WkMlVMKk9UpopJZaqYVKaKSWWqeKJys8NaFzmsdZHDWhexf/gfovKk4onKGxWTypOKJypTxf8lh7UucljrIoe1LvLDh1SmikllqphUpopJZar4SxWfqPiEylTxTSpTxROVqeKbDmtd5LDWRQ5rXeSHD1W8ofJGxTepTBVPVKaKSWWqeEPlScUTlaliUnlScZPDWhc5rHWRw1oXsX/4QypTxaTyiYpJ5Y2KSWWqeENlqnii8qTim1SmikllqphUpopPHNa6yGGtixzWusgPH1KZKr6p4onKpPJGxaTyCZWpYlJ5UjGpPFGZKp6ovFHxpOKbDmtd5LDWRQ5rXcT+4YtU3qiYVJ5UTCpTxROVJxWTylQxqUwVv0llqvgmlaniicpU8YnDWhc5rHWRw1oXsX/4RSpPKt5QmSomlZtVfELlExXfpDJVfOKw1kUOa13ksNZFfvgylTdUvqliUpkqJpWpYlJ5o+INlScVb1R8k8pfOqx1kcNaFzmsdRH7hy9SmSomlTcq3lB5o2JSmSqeqLxR8UTlScUTlU9UvKEyVXzisNZFDmtd5LDWRX74YxWTylQxqUwVTyqeqDypmFQ+UTGpPKl4Q2WqmFSmijdUnlR802GtixzWushhrYv88MtUnlQ8qXiiMlV8U8UTlaliUpkqJpVJ5UnFE5VPqEwVk8qkMlV84rDWRQ5rXeSw1kV++LKKSWWqmFTeqHii8qTiicqTiqliUvlExaTyRsUbKlPFpDJVTCrfdFjrIoe1LnJY6yL2D/8fqUwVT1Smik+o/KWKT6i8UfFfcljrIoe1LnJY6yI/fEjljYo3VKaKN1SmiicVn1D5TRWTyidUpoonKlPFNx3WushhrYsc1rqI/cMXqUwVv0nlScWk8kbFpDJVPFGZKp6oTBWTypOKJyq/qeITh7UucljrIoe1LvLDh1SmiicqU8UTlScVb1RMKlPFpDJVfJPKE5Wp4onKVDFVPFGZKiaV33RY6yKHtS5yWOsi9g9fpDJVfJPKk4o3VKaKJypTxaTylyqeqEwVk8qTikllqvimw1oXOax1kcNaF/nhQypTxROVT1Q8UZkqPqEyVUwqb1Q8UZkqJpVJ5Q2VJxWTylQxqUwVnzisdZHDWhc5rHWRHz5U8UbFN6lMFU9U3qj4TSpvVEwqU8UbKpPKVPGXDmtd5LDWRQ5rXeSHD6n8pYqpYlKZKp5UTCpTxZOKJypPKiaVSeUTKlPFGypTxW86rHWRw1oXOax1kR++rOKbVN6oeENlqviEylTxTRWTypOKNyqeqEwV33RY6yKHtS5yWOsiP/wylTcq3lB5UjFVPFGZKp6oTBWTylTxpOITKp9QmSqeqEwVnzisdZHDWhc5rHWRH/7jKp6oTBVvqHyi4g2VqeITFU9UpopJ5S8d1rrIYa2LHNa6yA//cSpTxVTxROVJxaTyRGWqeKPiicpU8YbKE5UnFZPKNx3WushhrYsc1rrID7+s4jdVTCpTxaQyVUwqk8pUMak8UXlSMak8qZhU3qh4ojJVTCpTxTcd1rrIYa2LHNa6yA9fpvKXVKaK36QyVUwqU8WkMqk8qZhUpopJ5YnKk4pJ5YnKVPGJw1oXOax1kcNaF7F/WOsSh7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LvL/ADPNDnMJfhV5AAAAAElFTkSuQmCC';

// Print the QR code to terminal
   
// Converting the data into base64 

    app.get('/generateQR', async (req, res) => {
        try {
          const url = stringdata;
          const qrCodeImage = await QRCode.toDataURL(url);
          res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
        } catch (err) {
          console.error('Error generating QR code:', err);
          res.status(500).send('Internal Server Error');
        }
      });

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    


