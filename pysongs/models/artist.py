class Artist:
    def __init__(self, id_art, name, genre, external_url, image):
        self.id = id_art
        self.name = name
        self.genre = genre
        self.external_url = external_url
        self.image = image
    
    def __repr__(self):
        return f"Artist({self.id}, {self.name}, {self.genre}, {self.external_url}, {self.image})"
