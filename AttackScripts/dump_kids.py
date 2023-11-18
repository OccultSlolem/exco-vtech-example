# Dumps kids from the database.
# Phrasing.

import requests

RANGE = 1

def main():
    for p in range(RANGE):
        data = {
            "id": p + 1
        }
        res = requests.post('http://localhost:3030/getKids', json=data)
        print("Dumped kids from parent " + str(p))
        print(res.text)

if __name__ == "__main__":
    main()
