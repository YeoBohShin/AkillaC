class Post:
    def __init__(self, author, thread_content, course_code, timestamp, parent_id):
        self.author = author
        self.thread_content = thread_content
        self.course_code = course_code
        self.timestamp = timestamp
        self.parent_id = parent_id
        self.likes = 0

    @staticmethod
    def from_dict(source):
        author = source['author']
        thread_content = source['threadContent']
        course_code = source['courseCode']
        timestamp = source['timestamp']
        parent_id = source['parentID']

        return Post(author, thread_content, course_code, timestamp, parent_id)

    def to_dict(self):
        dest = {
            'author': self.author,
            'threadContent': self.thread_content,
            'courseCode': self.course_code,
            'timestamp': self.timestamp,
            'parentID': self.parent_id,
            'likes' : self.likes
        }

        return dest

    def __repr__(self):
        return f"Post(author={self.author}, \
          thread_content={self.thread_content}, \
            course_code={self.course_code}, \
              timestamp={self.timestamp}, \
                parent_id={self.parent_id}, likes={self.likes}"
