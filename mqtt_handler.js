const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtts://mqtt.deeplearning.md:8883';
    this.port = 8883;
    this.username = 'elena'; // mqtt credentials if these are needed to connect
    this.password = 'elena123';
    // this.clientId = `mqtts_${Math.random().toString(16).slice(3)}`
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    console.log()
    this.mqttClient = mqtt.connect(this.host, { username: this.username,
                                                password: this.password,
                                                // clientId: this.clientId,
                                                rejectUnauthorized: false,
                                                clean: true,
                                                // port: this.port
                                                connectTimeout: 4000,
                                                reconnectPeriod: 1000});
    // username and password not need for now.
    // this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('mytopic', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }
}

module.exports = MqttHandler;
