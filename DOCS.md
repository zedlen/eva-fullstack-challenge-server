##GET /analytics/consumedMedications

This endpoint will satisfied the issue 01

Required parameters:
   * date_start = date string from when the search should take place the format of date have to be: YYYY-MM-DD
   * date_end = date string until when the search should take place the format of date have to be: YYYY-MM-DD
   * clinic = the name of the clinic to search, it have to ve in upper case
   * mode = the mode of the filter for medications only this two are accepted: LAX, STRICT
   * medications = an array of medications to filter, i.e.: ["HORMONE_THERAPY","ANTIBIOTICS"]

Example edpoint with parameters:

```
http://localhost:1337/analytics/consumedMedications?date_start=2019-11-01&date_end=2019-11-10&clinic=EXPLANADA&mode=STRICT&medications=["HORMONE_THERAPY","ANTIBIOTICS"]
```

The response will contsain an array of all bookigs that match the params, the bookings will contain a object called exploration, with the detail of it.

Sample format:
```
[
  {
    "exploration": {
      "id": 413,
      "consumedMedications": "[\"ANTIBIOTICS\",\"HORMONE_THERAPY\"]",
      "bookingId": 412
    },
    "id": 412,
    "name": "Nellie Boone",
    "email": "nellie_boone@gmail.com",
    "datetime": "2019-11-01T13:47:58.000Z",
    "clinicName": "EXPLANADA"
  },
  {
    "exploration": {
      "id": 930,
      "consumedMedications": "[\"HORMONE_THERAPY\",\"ANTIBIOTICS\"]",
      "bookingId": 929
    },
    "id": 929,
    "name": "Sean Rogers",
    "email": "sean_rogers@gmail.com",
    "datetime": "2019-11-08T20:53:36.000Z",
    "clinicName": "EXPLANADA"
  },
  ...
]
```