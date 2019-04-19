# README #

### How do I set up? ###
* Create DB
* Set database configuration in .env
* Run localhost:3000/sync (script to create table with one user)

### NOTE: Fork this project and send me your github link ###

1) ### Create user endpoint ###

### THE RESULT OF THIS CAN BE CHECKED ON /public/login and /user 

* Create user endpoint for add, update and delete user. (Changed should be reflected in the DB)
* Each endpoint must validate data type. (ex: validate email. If is not valid, return code error with error description).
* Implement jwt Auth. For login, the user should call to /login and use his name and email as credentials.
* Only users logged in should be able to edit their data.

2) ### Create a query to get sales by year and month from this table ###

### THE RESULT OF THIS CAN BE CHECKED ON /public/sales-report

| id  | provider_id | client_id  | price | created             |
| --- |:-----------:| ----------:| -----:| -------------------:|
|  1  | 3049        |   493      | $1600 | 2018-09-12 10:32:13 |
|  2  | 3495        |   540      | $1200 | 2018-09-16 11:32:27 |
|  3  | 5444        |   493      | $1000 | 2018-10-14 13:32:16 |
|  4  | 3049        |   493      | $1400 | 2018-10-12 10:32:13 |
|  5  | 3495        |   540      | $1650 | 2018-10-16 11:32:27 |
|  6  | 5444        |   124      | $1100 | 2019-01-14 13:32:16 |
|  7  | 3495        |   453      | $1900 | 2019-02-16 11:32:27 |
|  8  | 5444        |   123      | $900  | 2019-03-14 13:32:16 |


Ouput example:

| year | month | reservation | total |
| ---  |:-----:| -----------:| -----:|
| 2018 |  09   |   2         | $2800 |
| 2018 |  10   |   3         | $4050 |
| 2019 |  01   |   1         | $1100 |
| 2019 |  02   |   1         | $1900 |
| 2019 |  03   |   1         | $900  |


3) ### What are the differences between? ###

```throw new Error('something bad happened');```

### this "throw" a custom instance of error that would be catched in any try-catch parent ###

```callback(new Error('something bad happened'));```

### this pass an instance of error as a parameter, this error should be used inside the callback because the callback is outside of the parent scope so it would not be catched outside the callback body ###

### POSTMAN PROJECT CAN BE DOWNLOADED FROM THIS URL
[POSTMAN-PROJECT] https://drive.google.com/file/d/1z2tcetI8YaWU3i9V53QR9lxLlLSjJxkR/view?usp=sharing