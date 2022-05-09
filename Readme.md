# vans proyect

#End Points

#Server Routes

| METHOD |            URL            |       DESCRIPTION |
| ------ | :-----------------------: | ----------------: |
| POST   |       /auth/signup        |          register |
| POST   |        /auth/login        |             login |
| GET    |       /auth/verify        |            verify |
|        |                           |                   |
| GET    |     /vans/getAllVans      |      get all vans |
| GET    |  /vans/getOneVan/:van_id  | ger one van by id |
| POST   |       /vans/saveVan       |        create van |
|        |                           |                   |
| GET    |     /user/getAllUsers     |     get all users |
| GET    | /user/getOneUser/:user_id | ger one van by id |

#Client Routes

|      URL       |                  DESCRIPTION |
| :------------: | ---------------------------: |
|  /signup-user  |                  signup-user |
|     /login     |                        login |
|      /\*       |                        error |
|     /home      |                     searcher |
|    /profile    |                 user profile |
|    /results    | results of the user research |
| /became-renter |         about being a renter |
| /singup-renter |               signup- renter |
| /login-renter  |               login - renter |
|                |                              |
| /van-register  |                   van singup |
|  /van-details  |                  van details |
|   /checkout    |                     checkout |
