 # To install it to somewhere else just type nmp install to install the node_modules
# Rest Api for Car Charging application

## Entities:
- User
- Car
- Station 
- Provider
- Charger
- StationHostCharger(id_charger,id_station)
- ProviderSuppliesStation(id_station,id_provider)
- StationOffersDiscountCharger(id_charger,id_station)
- Transcation(id_user,id_charger,id_station)
- UserHasCar(id_user,id_car)
- CarChargedTransaction(id_car,id_transaction)

## Entrypoint
- List all Users GET http://localhost:8080/users
- Create User POST http://localhost:8080/users
- Get User GET http://localhost:8080/users/id_user
- Update User PUT http://localhost:8080/users/id_user
- Delete User DEL http://localhost:8080/users/id_user

- List all Car GET http://localhost:8080/cars
- Create Car POST http://localhost:8080/cars
- Get Car GET http://localhost:8080/cars/id_car
- Update Car PUT http://localhost:8080/cars/id_car
- Delete Car DEL http://localhost:8080/cars/id_car

- List all Station GET http://localhost:8080/stations
- Create Station POST http://localhost:8080/stations
- Get Station GET http://localhost:8080/stations/id_station
- Update Station PUT http://localhost:8080/stations/id_station
- Delete Station DEL http://localhost:8080/stations/id_station

- List all Provider GET http://localhost:8080/providers
- Create Provider POST http://localhost:8080/providers
- Get Provider GET http://localhost:8080/providers/id_provider
- Update Provider PUT http://localhost:8080/providers/id_provider
- Delete Provider DEL http://localhost:8080/providers/id_provider

- List all Charger GET http://localhost:8080/chargers
- Create Charger POST http://localhost:8080/chargers
- Get Charger GET http://localhost:8080/chargers/id_charger
- Update Charger PUT http://localhost:8080/chargers/id_charger
- Delete Charger DEL http://localhost:8080/chargers/id_charger

- List all StationHostCharger GET http://localhost:8080/stationhostcharger
- Create StationHostCharger POST http://localhost:8080/stationhostcharger
- Get StationHostCharger GET http://localhost:8080/stationhostcharger/id_charger&id_station
- Update StationHostCharger PUT http://localhost:8080/stationhostcharger/id_charger&id_station
- Delete StationHostCharger DEL http://localhost:8080/stationhostcharger/id_charger&id_station

- List all ProviderSuppliesStation GET http://localhost:8080/providersuppliesstation
- Create ProviderSuppliesStation POST http://localhost:8080/providersuppliesstation
- Get ProviderSuppliesStation GET http://localhost:8080/providersuppliesstation/id_provider&id_station
- Update ProviderSuppliesStation PUT http://localhost:8080/providersuppliesstation/id_provider&id_station
- Delete ProviderSuppliesStation DEL http://localhost:8080/providersuppliesstation/id_provider&id_station

- List all StationOffersDiscountCharger GET http://localhost:8080/stationoffersdiscountcharger
- Create StationOffersDiscountCharger POST http://localhost:8080/stationoffersdiscountcharger
- Get StationOffersDiscountCharger GET http://localhost:8080/stationoffersdiscountcharger/id_charger&id_station
- Update StationOffersDiscountCharger PUT http://localhost:8080/stationoffersdiscountcharger/id_charger&id_station
- Delete StationOffersDiscountCharger DEL http://localhost:8080/stationoffersdiscountcharger/id_charger&id_station

- List all Transcations GET http://localhost:8080/transcations
- Create Transcations POST http://localhost:8080/transcations
- Get Transcations GET http://localhost:8080/transcations/id_transcation
- Update Transcations PUT http://localhost:8080/transcations/id_transcation
- Delete Transcations DEL http://localhost:8080/transcations/id_transcation

- List all UserHasCar GET http://localhost:8080/userhascar
- Create UserHasCar POST http://localhost:8080/userhascar
- Get UserHasCar GET http://localhost:8080/userhascar/id_user&id_car
- Update UserHasCar PUT http://localhost:8080/userhascar/id_user&id_car
- Delete UserHasCar DEL http://localhost:8080/userhascar/id_user&id_car

- List all CarChargedTransaction GET http://localhost:8080/carchargedtransaction
- Create CarChargedTransaction POST http://localhost:8080/carchargedtransaction
- Get CarChargedTransaction GET http://localhost:8080/carchargedtransaction/id_transaction&id_car
- Update CarChargedTransaction PUT http://localhost:8080/carchargedtransaction/id_transaction&id_car
- Delete CarChargedTransaction DEL http://localhost:8080/carchargedtransaction/id_transaction&id_car



