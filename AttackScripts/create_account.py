# Creates a test account

import requests
import random

NUM_ACCOUNTS = 1
KIDS_MIN_PER_ACCOUNT = 1
KIDS_MAX_PER_ACCOUNT = 3

def main():
    for a in range(NUM_ACCOUNTS):
        try:
            ACCOUNT = {"email":f"asdf{a}@asdf.asdf","password":"asdfasdf","firstName":"asdf","lastName":"asdf","passwordHint":"asdf","secretQuestion":"asdf","secretAnswer":"asdf","clientLocation":"Narnia","registrationUrl":"http://localhost:3030/signup.html","country":"asdf","address":"asdf","city":"asdf","state":"asdf","zip":"asdf"}
            res = requests.post('http://localhost:3030/signup', json=ACCOUNT)
            print("Created account " + str(a + 1) + " with status code " + str(res.status_code))

            if KIDS_MAX_PER_ACCOUNT == 0: continue

            NUM_KIDS = random.randint(KIDS_MIN_PER_ACCOUNT, KIDS_MAX_PER_ACCOUNT)
            for k in range(NUM_KIDS):
                KID = {"username":f"asdf{a}","domain":"localhost","ll_child_id":k+1,"ll_parent_id":a+1,"parent_id":a+1,"country_lang":"en"}
                res = requests.post('http://localhost:3030/addchild', json=KID)
                print("Added kid " + str(k + 1) + " to account " + str(a + 1) + " with status code " + str(res.status_code))
        except:
            continue

if __name__ == "__main__":
    main()