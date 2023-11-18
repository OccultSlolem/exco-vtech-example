# Makes kids ( ͡° ͜ʖ ͡°)
import requests
import json

RANGE = 1
KIDS_PER_PARENT = 1

def main():
    for p in range(RANGE):
        try:
            for c in range(KIDS_PER_PARENT):
                data = {
                    "username": "kid" + str(c),
                    "domain": "localhost",
                    "ll_child_id": c + 1,
                    "ll_parent_id": p + 1,
                    "parent_id": p + 1,
                    "country_lang": "en",
                }

                res = requests.post("http://localhost:3030/addchild", json=data)
                print("Added kid " + str(c + 1) + " to parent " + str(p + 1) + " with status code " + str(res.status_code))
        except:
            print("Failed to add kid to parent " + str(p))
            continue

if __name__ == "__main__":
    main()
