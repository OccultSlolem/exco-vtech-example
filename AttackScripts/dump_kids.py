# Dumps kids from the database.
# Phrasing.

import requests

RANGE = 3

def main():
    for p in range(RANGE):
        json = {
            "id": p
        }
        res = requests.post('http://localhost:3030/getKids', json=json)
        print("Dumped kids from parent " + str(p))
        print(res.text)

if __name__ == "__main__":
    main()
