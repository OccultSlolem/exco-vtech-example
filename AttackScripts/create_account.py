# Creates a test account

import requests

NUM_ACCOUNTS = 3

def main():
    for a in range(NUM_ACCOUNTS):
        try:
            ACCOUNT = {"email":f"asdf{a}@asdf.asdf","password":"asdfasdf","firstName":"asdf","lastName":"asdf","passwordHint":"asdf","secretQuestion":"asdf","secretAnswer":"asdf","clientLocation":"Narnia","registrationUrl":"http://localhost:3030/signup.html","country":"asdf","address":"asdf","city":"asdf","state":"asdf","zip":"asdf"}
            res = requests.post('http://localhost:3030/signup', json=ACCOUNT)
            print("Created account " + str(a) + " with status code " + str(res.status_code))
        except:
            continue

if __name__ == "__main__":
    main()