# importing libraries
import paho.mqtt.client as paho
import ssl
from time import sleep
from random import uniform
import datetime
import os

connflag = False
cwd = os.getcwd()


def on_connect(client, userdata, flags, rc):                # func for making connection
    global connflag
    print("Connected to AWS")
    connflag = True
    # if connection is successful, rc value will be 0
    print("Connection returned result: " + str(rc))
    # print(flags)


def on_message(client, userdata, msg):                      # Func for Sending msg
    print(msg.topic+" "+str(msg.payload))

# def on_log(client, userdata, level, buf):
#    print(msg.topic+" "+str(msg.payload))


mqttc = paho.Client()
# create an mqtt client object
# attach call back function
mqttc.on_connect = on_connect
# attach on_connect function written in the
# mqtt class, (which will be invoked whenever
# mqtt client gets connected with the broker)
# is attached with the on_connect function
# written by you.


# assign on_message func
mqttc.on_message = on_message
# attach on_message function written inside
# mqtt class (which will be invoked whenever
# mqtt client gets a message) with the on_message
# function written by you

#### Change following parameters ####
awshost = "a10wsohe016ayp-ats.iot.ap-south-1.amazonaws.com"      # Endpoint
awsport = 8883                                              # Port no.
# Thing_Name
clientId = "raspberry_pi_weighbridge"
# Thing_Name
thingName = "raspberry_pi_weighbridge"
# Amazon's certificate from Third party                                     # Root_CA_Certificate_Name
caPath = open("awsiot\src\AmazonRootCA1.pem")
# <Thing_Name>.cert.pem.crt. Thing's certificate from Amazon
certPath = open(
    "awsiot\src\945959e1353d18bb1275061dcd00380e68f20d4ef25fe93433bff2b31be2fbb6-certificate.pem.crt")
# <Thing_Name>.private.key Thing's private key from Amazon
keyPath = open(
    "awsiot\src\945959e1353d18bb1275061dcd00380e68f20d4ef25fe93433bff2b31be2fbb6-private.pem.key")

mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED,
              tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)  # pass parameters

# connect to aws server
mqttc.connect(awshost, awsport, keepalive=60)

mqttc.loop_start()                                          # Start the loop

while 1:
    sleep(5)
    if connflag == True:
        timeStamp = datetime.datetime.now()
        # Generating Temperature Readings
        tempreading = uniform(20.0, 25.0)
        message = '{"timeStamp":'+'"' + \
            str(timeStamp)+'",'+'"weight":'+str(weight)+'}'
        # topic: temperature # Publishing Temperature values
        mqttc.publish("temperatureTopic", message, 1)
        # Print sent temperature msg on console
        print("msg sent: temperature " + "%.2f" % tempreading)
    else:
        print("waiting for connection...")
