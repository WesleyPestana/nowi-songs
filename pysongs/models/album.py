class Album:
    def __init__(self, id_alb, name, artists, quantity, external_url, image):
        self.id = id_alb
        self.name = name
        self.artists = artists
        self.quantity = quantity
        self.external_url = external_url
        self.image = image
    
    def __repr__(self):
        return f"Album({self.id}, {self.name}, {self.artists}, {self.quantity}, {self.external_url}, {self.image})"
