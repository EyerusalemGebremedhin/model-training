"use client"

import mqtt from "mqtt";

const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL, {
    username: process.env.NEXT_PUBLIC_MQTT_USER,
    password: process.env.NEXT_PUBLIC_MQTT_PASS
})

export default client


