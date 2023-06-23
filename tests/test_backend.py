def test_backend(client):
  response = client.get('/getCourses')
  flag = True
  print('CHeck this' + response.json())
  # for course in response.json():
  #   if 'courseCode' not in course:
  #     flag = False
  assert flag is True