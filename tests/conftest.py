import pytest
import BACKEND.FileUpload
from firebase_admin import credentials, storage
from flask import Flask, jsonify, make_response, request
import json
from flask_cors import CORS
import requests
import os
import datetime as datetime

from BACKEND.FileUpload import create_app
import pytest

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    return app

@pytest.fixture
def client(app):
    return app.test_client()

