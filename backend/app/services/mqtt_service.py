import paho.mqtt.client as mqtt
import json
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class MQTTService:
    def __init__(self):
        self.client = mqtt.Client(client_id="fastapi_backend_client")
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_disconnect = self.on_disconnect

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Connected to MQTT Broker!")
            # Subscribe to topics
            self.client.subscribe("sensor/emg/data")
            self.client.subscribe("sensor/emg/status")
        else:
            logger.error(f"Failed to connect to MQTT, return code {rc}")

    def on_disconnect(self, client, userdata, rc):
        logger.warning(f"Disconnected from MQTT with code {rc}")
        if rc != 0:
            logger.info("Unexpected disconnection. Attempting reconnection...")

    def on_message(self, client, userdata, msg):
        topic = msg.topic
        payload = msg.payload.decode("utf-8")
        # In a real app we might store this in MongoDB or a time-series DB
        # logger.debug(f"Received message on {topic}: {payload}")

    def start(self):
        logger.info(f"Starting MQTT client, connecting to {settings.MQTT_BROKER_HOST}:{settings.MQTT_BROKER_PORT}")
        try:
            self.client.connect_async(settings.MQTT_BROKER_HOST, settings.MQTT_BROKER_PORT, 60)
            self.client.loop_start()
        except Exception as e:
            logger.error(f"MQTT connect failed: {e}")

    def stop(self):
        self.client.loop_stop()
        self.client.disconnect()

mqtt_client = MQTTService()
