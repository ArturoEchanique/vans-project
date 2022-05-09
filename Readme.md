# vans proyect

End Points

Server Routes

| METHOD |                           URL                           |       DESCRIPTION |
| ------ | :-----------------------------------------------------: | ----------------: |
| POST   |                      /auth/signup                       |          register |
| POST   |                       /auth/login                       |             login |
| GET    |                      /auth/verify                       |            verify |
|        |                                                         |                   |
| GET    |                   /vans/get-all-vans                    |      get all vans |
| GET    |                /vans/get-oneVan/:van_id                 | ger one van by id |
| POST   |                    /vans/create-van                     |        create van |
|        |                                                         |                   |
| GET    |                   /user/get-all-users                   |     get all users |
| GET    |                /user/get-one-user/:user_id                | ger one van by id |
|        |                                                         |                   |
| GET    |            /reseravations/get-reseravations             |      get all vans 
| GET    | /reseravations/get-one-reseravation/:reseravations_id | ger one van by id |
| POST   |           /reseravations/create-reseravations           |        create van |

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
