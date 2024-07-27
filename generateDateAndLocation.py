import datetime
import random
import requests
from bs4 import BeautifulSoup

YOUR_API_KEY = ""

def generate_date_and_location(num_of_date, deviation, num_of_location, YOUR_API_KEY):
    date_and_location_data = {"dateWithLocation":{}}
    dates = generate_random_date(num_of_date, deviation)
    for unix_date in dates:
        zip_codes = generate_random_zipcode(num_of_location)
        lat_longs = get_lat_long_using_zip(zip_codes, YOUR_API_KEY)
        names = get_location_name_using_lat_long(lat_longs, YOUR_API_KEY)
        generate_sample_date_and_location(date_and_location_data, num_of_location, unix_date, lat_longs, names)

    return date_and_location_data


def generate_random_date(num_of_date, deviation):
    dates = set()
    sg_now = datetime.datetime.now()
    sg_now = sg_now.replace(hour=0, minute=0, second=0, microsecond=0)
    while len(dates) < num_of_date:
        random_days = random.randint(-1 * deviation, deviation)
        future_date = sg_now + datetime.timedelta(days=random_days)
        unix_timestamp = int(future_date.timestamp())
        dates.add(unix_timestamp)
    
    return list(dates)
    

def generate_random_zipcode(number_of_postal_required):
    url = "https://www.fakexy.com/fake-address-generator-sg"
    zip_codes = []
    for _ in range(number_of_postal_required):
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        zip_code_row = soup.find(string='Zip/Postal Code')
        zip_code = zip_code_row.find_next('td').text.strip()
        zip_codes.append(zip_code)

    return zip_codes

def get_lat_long_using_zip(zipcodes, YOUR_API_KEY):
    lat_longs = []
    for zipcode in zipcodes:
        url = ('https://maps.googleapis.com/maps/api/geocode/json?address=' +
        '{zipcode}&sensor=true&key={YOUR_API_KEY}'.format(zipcode=zipcode, YOUR_API_KEY=YOUR_API_KEY))
        response = requests.get(url)
        lat = response.json()['results'][0]['geometry']['location']['lat']
        long = response.json()['results'][0]['geometry']['location']['lng']
        lat_longs.append([lat, long])

    return lat_longs

def get_location_name_using_lat_long(lat_longs, YOUR_API_KEY):
    names = []
    for lat, long in lat_longs:
        url = ('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        '{lat},{long}&sensor=true&key={YOUR_API_KEY}'.format(lat=lat, long=long, YOUR_API_KEY=YOUR_API_KEY))
        response = requests.get(url)
        name = response.json()['results'][0]['formatted_address']
        names.append(name)

    return names

def generate_sample_date_and_location(date_and_location_data, num_of_location, date, lat_longs, names):
    locations_obj = {"locations":[]}
    date_and_location_data["dateWithLocation"][str(date)] = locations_obj
    for idx in range(num_of_location):
        [lat, long] = lat_longs[idx]
        location_details = {"name": names[idx], "location": {"latitude":lat, "longitude":long}}
        locations_obj["locations"].append(location_details)

#print(generate_random_date(num_of_date=3, deviation=5))
data = generate_date_and_location(num_of_date=3, deviation=5, num_of_location=2, YOUR_API_KEY=YOUR_API_KEY)
url = 'https://6698c57b2069c438cd6feb5e.mockapi.io/dateAndLocations'
headers = {'Content-type': 'application/json'}
response = requests.post(url, json=data, headers=headers)

if response.status_code == 201:
    print("Data sent successfully")
else:
    print("Error sending data:", response.text)