import paho.mqtt.client as mqtt
import time
import json
import math
import random
import os

BROKER = os.getenv("MQTT_BROKER_HOST", "localhost")
PORT = int(os.getenv("MQTT_BROKER_PORT", "1883"))
TOPIC = "sensor/emg/data"

client = mqtt.Client(client_id="sensor_mock")

def connect_mqtt():
    while True:
        try:
            print(f"Connecting to MQTT broker at {BROKER}:{PORT}")
            client.connect(BROKER, PORT, 60)
            print("Connected successfully!")
            break
        except Exception as e:
            print(f"Connection failed: {e}. Retrying in 5 seconds...")
            time.sleep(5)

def publish_data():
    t = 0
    while True:
        # Simulate EMG signal: a combination of a low freq wave and high freq noise
        base_signal = math.sin(t) * 0.5
        noise = random.uniform(-0.2, 0.2)
        emg_value = max(0, base_signal + noise + 0.3) # keep it mostly positive
        
        payload = {
            "timestamp": int(time.time() * 1000),
            "value": round(emg_value, 4),
            "muscle": "Biceps (Mock)"
        }
        
        client.publish(TOPIC, json.dumps(payload))
        print(f"Published: {payload}")
        
        t += 0.1
        time.sleep(0.1) # 10Hz for mock

if __name__ == "__main__":
    connect_mqtt()
    client.loop_start()
    try:
        publish_data()
    except KeyboardInterrupt:
        print("Stopping sensor mock...")
        client.loop_stop()
        client.disconnect()
