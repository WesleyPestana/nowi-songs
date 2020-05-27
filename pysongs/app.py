import json
from flask import Flask, render_template
from pysongs.services import api

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/musics/')
def musics():
    return render_template('musics.html')


@app.route('/musics/<song>')
def list_musics(song):
    data = api.search_music(song)

    data_json = json.dumps([ob.__dict__ for ob in data])

    return data_json


@app.route('/artists/')
def artists():
    return render_template('artists.html')


@app.route('/artists/<artist>')
def list_artists(artist):
    data = api.search_artist(artist)

    data_json = json.dumps([ob.__dict__ for ob in data])

    return data_json


@app.route('/albums/')
def albums():
    return render_template('albums.html')


@app.route('/albums/<album>')
def list_albums(album):
    data = api.search_album(album)

    data_json = json.dumps([ob.__dict__ for ob in data])

    return data_json
