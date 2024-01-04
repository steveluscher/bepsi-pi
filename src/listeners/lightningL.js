const WebSocket = require('ws');
const { dispenseFromPayments } = require('../machine');

// WebSocket URL
const wsUrl = 'wss://send.laisee.org/api/v1/ws/V5UfKc845cdrKrsmMijExW';

const startLightningListener = async () => {
        
    // Create a new WebSocket connection
    const ws = new WebSocket(wsUrl);

    // Event listener for when the connection is open
    await ws.on('open', function open() {
    console.log('Connected to the lightning lnbit.');
    });

    // Event listener for when a message is received from the server
    await ws.on('message', function message(data) {
    //console.log('Received message from server:', data);
    const messageStr = data.toString('utf-8'); // Convert buffer to string
    console.log('Received message from server:', messageStr);
    // example: 0-1000
    pinNo = messageStr.split('-')[0];
    dispenseFromPayments(pinNo, 'sats')
    });

    // Event listener for handling errors
    await ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
    });

  };
  
  module.exports = {
    startLightningListener,
  };
