# Makes kids ( ͡° ͜ʖ ͡°)
import requests

RANGE = 1
KIDS_PER_PARENT = 1

def main():
    for p in range(RANGE):
        try:
            for c in range(KIDS_PER_PARENT):
                data = {
                    'username': "kid" + str(c),
                    'domain': 'localhost:3030',
                    'll_child_id': c,
                    'll_parent_id': p,
                    'parent_id': p,
                    'county_lang': 'en',
                }
                print(data)
                res = requests.post('http://localhost:3030/add_child', json=data)
                print("Added kid " + str(c) + " to parent " + str(p) + " with status code " + str(res.status_code))
        except:
            print("Failed to add kid to parent " + str(p))
            continue

if __name__ == "__main__":
    main()
