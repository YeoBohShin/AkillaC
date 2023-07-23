from BACKEND.FileUpload import create_app
import json

# def test_std(client):

#     response = client.get('/test')
#     data =response.json
#     print('Check this:', data)
#     if response.status_code == 200:
#       try:

#         data =response.json()
#         print('Check this:', data)
#         # Rest of your code...

#       except ValueError:
#         print('Error: Invalid JSON data')
#     else:
#       print('Error: Request failed with status code', response.status_code)


def test_get_courses(client):
  response = client.get('/getCourses')
  
  if response.status_code == 200:
    try:  
      data =response.data
      flag = False
      if b"courseCode" in data:
        flag = True

      assert flag == True
      # Rest of your code...

    except ValueError:
      print('Error: Invalid JSON data')
  else:
    print('Error: Request failed with status code', response.status_code)


def test_get_years(client):
  response = client.get('/getYears?courseCode=TEST', json = {})

  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert data == [
        {'courseCode': 'TEST', 'pypYear': '1213', 'semester': 'Sem1', 'midOrFinals': 'Midterms'},
    ]
    except ValueError:
      print('Error: Invalid JSON data')
  else:
    print('Error: Request failed with status code', response.status_code)
      

def test_get_file_names(client):
  response = client.get('/getFileNames?courseCode=TEST&pypYear=1213&semester=Sem1&midOrFinals=Mid', json = {})

  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert 'file' in data[0]

    except ValueError:
      print('Error: Invalid JSON data')
  else:
    print('Error: Request failed with status code', response.status_code)


def test_get_forum_threads(client):
  response = client.get('/get_threads?courseCode=TEST&pypYear=1213&semester=SEM1&midOrFinals=MIDTERMS')
  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert 'threadID' in data[0]

    except ValueError:
      print('Error: Invalid JSON data')

def test_get_forum_replies(client):
  response = client.get('/get_replies?courseCode=TEST&pypYear=1213&semester=SEM1&midOrFinals=MIDTERMS&parentID=Axpve5A6tjGUAG5eo6XZ')
  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert 'replyID' in data[0]

    except ValueError:
      print('Error: Invalid JSON data')

def test_likes(client):
  response = client.get('/like?courseCode=TEST&pypYear=1213&semester=SEM1&midOrFinals=MIDTERMS&id=Axpve5A6tjGUAG5eo6XZ&userID=0n7yZMSfXIbkAJcViQRJ9Kab5yc2')
  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      if type(data) is not str:
        assert 'likes' in data

    except ValueError:
      print('Error: Invalid JSON data')

def test_dislikes(client):
  response = client.get('/dislike?courseCode=TEST&pypYear=1213&semester=SEM1&midOrFinals=MIDTERMS&userID=0n7yZMSfXIbkAJcViQRJ9Kab5yc2')
  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      if type(data) is not str:
        assert 'dislikes' in data[0]

    except ValueError:
      print('Error: Invalid JSON data')