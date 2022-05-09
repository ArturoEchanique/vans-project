# vans proyect

End Points

Server Routes

| METHOD |             URL              |       DESCRIPTION |
| ------ | :--------------------------: | ----------------: |
| POST   |         /auth/signup         |          register |
| POST   |         /auth/login          |             login |
| GET    |         /auth/verify         |            verify |
|        |                              |                   |
| GET    |      /vans/get-all-vans      |      get all vans |
| GET    |   /vans/get-oneVan/:van_id   | ger one van by id |
| POST   |       /vans/create-van       |        create van |
|        |                              |                   |
| GET    |     /user/get-all-users      |     get all users |
| GET    |  /user/getOneUser/:user_id   | ger one van by id |
|        |                              |                   |
| POST   |       /bookings/create       |   create bookings |
| GET    |      /bookings/get-all       |  get all bookings |
| GET    |    /bookings/:booking_id     |  get one bookings |
| POST   | /bookings/edit/:bookings_id  |     edit bookings |
| POST   | /bookings/delete/:booking_id |   delete bookings |

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
