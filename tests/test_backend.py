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
  response = client.get('/getYears?courseCode=Test', json = {})

  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert data == [
        {'courseCode': 'Test', 'pypYear': '1213', 'semester': 'Sem1', 'midOrFinals': 'Midterms'},
    ]
    except ValueError:
      print('Error: Invalid JSON data')
  else:
    print('Error: Request failed with status code', response.status_code)
      

def test_get_file_names(client):
  response = client.get('/getFileNames?courseCode=Test&pypYear=1213&semester=Sem1&midOrFinals=Mid', json = {})

  if response.status_code == 200:
    try:
      data = json.loads(response.data)
      print(data)
      assert 'file' in data[0]

    except ValueError:
      print('Error: Invalid JSON data')
  else:
    print('Error: Request failed with status code', response.status_code)