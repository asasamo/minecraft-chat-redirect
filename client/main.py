import os
import time
import yaml
import requests

with open("config.yml", "r") as ymlfile:
    config = yaml.load(ymlfile, Loader=yaml.FullLoader)


SERVER_URI = "http://" + config["server"]["host"] + ":" + \
    str(config["server"]["port"]) + config["server"]["location"]


def follow(thefile):
    thefile.seek(0, 2)
    while True:
        line = thefile.readline()
        if not line:
            time.sleep(0.1)
            continue
        yield line


if __name__ == "__main__":
    # logfile = open(os.getenv("APPDATA")+"/.minecraft/logs/latest.log", "r")  # Windows
    logfile = open("/home/" + os.getenv("USER") +
                   "/.minecraft/logs/latest.log", "r")  # Linux
    loglines = follow(logfile)
    for line in loglines:
        if "[Render thread/INFO]: [CHAT]" in line:
            line = line.replace("\n", "")
            print("New chat event: ", line)
            r = requests.post(SERVER_URI, json={"message": line}, headers={
                              "api-token": config["server"]["api-token"]})
            if r.status_code == 200:
                print("Request sent, status code: " +
                      str(r.status_code) + ", " + r.text)
            else:
                print("Request failed, check the api-token!")
