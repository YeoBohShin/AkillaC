import pytest
from BACKEND.FileUpload import app
from firebase_admin import credentials, storage
from flask import Flask, jsonify, make_response, request
import json
from flask_cors import CORS
import requests
import os
import datetime as datetime

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client
