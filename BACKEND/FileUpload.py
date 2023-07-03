import firebase_admin
from firebase_admin import credentials, storage, firestore
from flask import Flask, jsonify, make_response, request
import json
from Post import Post
from flask_cors import CORS
import requests
from datetime import datetime
import random

fb_app = None

def create_app():
  global fb_app

  # Check if the Firebase app is already initialized
  if fb_app is None:
      # Initialize Firebase Admin SDK
      cred = credentials.Certificate('serviceAccountKey.json')
      fb_app = firebase_admin.initialize_app(cred, { 
          'storageBucket': 'akillac-f1499.appspot.com'
      })

  app = Flask(__name__)
  CORS(app, resources={r"/*": {"origins": "http://localhost:3000/"}})
  # Get a reference to the default Firebase Storage bucket
  bucket = storage.bucket(app=fb_app)
  db = firestore.client()



  # @app.route('/upload', methods=['POST'])
  # def upload_file(src_file_path, module_code, year, sem, ans_qns):
  #   # Input for ans_qns = Answers or Questions

  #   destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
  #   # Get a reference to the default Firebase Storage bucket
  #   bucket = storage.bucket()

  #   # Upload the file to Firebase Storage
  #   blob = bucket.blob(destination_path)
  #   blob.upload_from_filename(src_file_path)

  # courseCode, pypYear, semester, midOrFinals, ansOrQuestions, file
  @app.route('/upload', methods=['POST'])
  def upload_file_from_Flask():
    courseCode = request.form['courseCode'].upper()
    pypYear = request.form['pypYear']
    semester = request.form['semester']
    midOrFinals = request.form['midOrFinals']
    ansOrQuestions = request.form['ansOrQuestions']
    file = request.files['file']

    if file:
      destination_path = f'Modules/{courseCode}/{pypYear}{semester}{midOrFinals}/{courseCode}_{pypYear}{semester}{midOrFinals}{ansOrQuestions}'
      bucket = storage.bucket()
      blob = bucket.blob(destination_path)
      blob.upload_from_file(file, content_type = 'application/pdf')
      return 'File Uploaded Successfully'
    

  # %%
  ## TO EDIT CUrrently using flask

  @app.route('/download', methods=['GET'])
  def download_file(courseCode, pypYear, semester, midOrFinals, ansOrQuestions):
    # Input for ans_qns = Answers or Questions

    destination_path = f'Modules/{courseCode}/{pypYear}{semester}{midOrFinals}/{courseCode}_{pypYear}{semester}{midOrFinals}{ansOrQuestions}'
    # Get a reference to the default Firebase Storage bucket
    bucket = storage.bucket()

    # Upload the file to Firebase Storage
    blob = bucket.blob(destination_path)
    url = blob.generate_signed_url(
          version="v4",
          method="GET"
      )

    # Create a Flask response with the file content
    response = jsonify({'file': url})

    return response


  # def upload_file_from_blob(b, module_code, year, sem, ans_qns):
  #     # Input for ans_qns = Answers or Questions
      
  #     destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
  #     # Get a reference to the default Firebase Storage bucket
  #     bucket = storage.bucket()

  #     # Download the file from the URL
  #     file_content = b.file[0].preview

  #     # Upload the file to Firebase Storage
  #     blob = bucket.blob(destination_path)
  #     blob.upload_from_string(file_content, content_type='application/pdf')

  #     return 'File uploaded to Firebase Storage successfully'

  # %% [markdown]
  # b = [{path: "tut3.pdf", preview: "blob:http://localhost:3000/9f05a114-70bc-498b-bbc4-576feb72984e"}]
  # upload_file(b, 'btest', 2022, 2, 'Answer')

  @app.route('/getCourses', methods=['GET'])
  def get_Courses():
      # Get a reference to the default Firebase Cloud Storage bucket
      bucket = storage.bucket()
      
      print(bucket.name)  # Print the bucket name for debugging

      courses = []
      # blobs = bucket.list_blobs(prefix='Modules/')
      blobs = bucket.list_blobs(prefix='Modules/')
      dict = {}
      # Extract subfolder names from the blobs
      for blob in blobs:
          course = {}
          name = blob.name.split('/')
          if name[0] == 'Modules' and name[1] != "" and name[1] not in dict:
            print(name[1])
            dict[name[1]] = 1
            course['courseCode'] = name[1]
            courses.append(course)
      
      print(dict)
      print(courses)

      response = make_response(json.dumps(courses))
      return response



  @app.route('/getYears', methods=['GET'])
  def get_years():
      # Get a reference to the default Firebase Cloud Storage bucket
      bucket = storage.bucket()
      
      files = []

      course = request.args.get('courseCode')

      # List all files and folders in the bucket with a prefix of 'Modules/course/'
      blobs = bucket.list_blobs(prefix=f'Modules/{course}/')

      prefix = set()
      # Extract file names and paths from the blobs
      for blob in blobs:
          name = blob.name.split('/')
          if not blob.name.endswith('/') and name[1] == course and name[2] not in prefix:
              prefix.add(name[2])
              file_name = name[2]
              next_file = {}
              next_file['courseCode'] = course
              next_file['pypYear'] = file_name[0:4]
              next_file['semester'] = file_name[4:8]
              next_file['midOrFinals'] = file_name[8:11]
              if next_file['midOrFinals'] == 'Fin':
                  next_file['midOrFinals'] = 'Finals'
              else:
                  next_file['midOrFinals'] = 'Midterms'
              files.append(next_file)
      
      response = make_response(json.dumps(files))

      return response




  @app.route('/getFileNames', methods=['GET'])
  def get_file_names_and_paths():
      # Get a reference to the default Firebase Cloud Storage bucket
      bucket = storage.bucket()

      course = request.args.get('courseCode')
      pyp_year = request.args.get('pypYear')
      semester = request.args.get('semester')
      mid_or_finals = request.args.get('midOrFinals')

      # Construct the file name prefix based on the provided attributes
      prefix = f'Modules/{course}/{pyp_year}{semester}{mid_or_finals}'

      files = []

      # List all files in the bucket with the specified prefix
      blobs = bucket.list_blobs(prefix=prefix)

      # Extract file names and paths from the blobs
      for blob in blobs:
          url = blob.generate_signed_url(
              version="v4",
              expiration=datetime.timedelta(minutes=15),
              method="GET"
          )
          name = blob.name.split('/')
          if not blob.name.endswith('/'):
              file_name = blob.name.replace(prefix + '_', '')
              next_file = {}
              next_file['courseCode'] = course
              next_file['pypYear'] = pyp_year
              next_file['semester'] = semester
              next_file['midOrFinals'] = 'Finals' if mid_or_finals == 'Fin' else 'Midterms'
              next_file['ansOrQuestions'] = name[-1].split('_')[-1][11:].split('.')[0]
              next_file['file'] = url
              files.append(next_file)

      response = make_response(json.dumps(files))

      return response

  @app.route('/test', methods=['GET'])
  def pytest_test():
      return jsonify({'message': 'ok'})

# ### Forum
# author
# ""
# parentID
# ""
# threadContent
# ""
# threadID
# ""
# timestamp
# ""

  @app.route('/create_thread', methods=['GET', 'POST'])
  def create_thread():
    author = request.args.get('author')
    thread_content = request.args.get('threadContent')
    courseCode = request.args.get('courseCode')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    parentID = None

    new_doc = Post(author, thread_content, courseCode, timestamp, parentID)

    threads_collection = db.collection('Forum').document(courseCode).collection('Threads')
    result = threads_collection.add(new_doc.to_dict())

    return f"Thread created with ID: {result[1].id}" # boh shin need to save this in order for it to be passed as argument

  @app.route('/reply_to_thread', methods=['GET', 'POST'])
  def reply_to_thread():
    author = request.args.get('author')
    parent_id = request.args.get('parentID')
    reply_content = request.args.get('replyContent')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    courseCode = request.args.get('courseCode')

    new_doc = Post(author, reply_content, courseCode, timestamp, parent_id)

    replies_collection = db.collection('Forum').document(courseCode).collection('Threads').document(parent_id).collection('Replies')
    result = replies_collection.add(new_doc.to_dict())
    return f"Reply created with ID: {result[1].id}"
  
  
  @app.route('/get_threads', methods=['GET', 'POST'])
  def get_threads():
    courseCode = request.args.get('courseCode')
    threads_collection = db.collection('Forum').document(courseCode).collection('Threads')
    threads = threads_collection.stream()
    threads_list = []
    for thread in threads:
      thread_dict = thread.to_dict()
      thread_dict['threadID'] = thread.id
      threads_list.append(thread_dict)
    return jsonify(threads_list)
     
  @app.route('/get_replies', methods=['GET', 'POST'])
  def get_replies():
    courseCode = request.args.get('courseCode')
    parent_id = request.args.get('parentID')
    replies_collection = db.collection('Forum').document(courseCode).collection('Threads').document(parent_id).collection('Replies')
    replies = replies_collection.stream()
    replies_list = []
    for reply in replies:
      reply_dict = reply.to_dict()
      reply_dict['replyID'] = reply.id
      replies_list.append(reply_dict)
    return jsonify(replies_list)



  return app

  



if __name__ == '__main__':
    app = create_app()
    app.run()

