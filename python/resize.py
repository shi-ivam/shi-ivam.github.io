
import os
import math
from PIL import Image
import json

top = 0
left = 0
right = 0
bottom = 0

# open info.json and get the values
with open('info.json', 'r') as f:

    # load the json file
    data = json.load(f)
    # print(data)
    shape = data["shapes"][0]["points"]
    left = shape[0][0]
    top = shape[0][1]
    right = shape[1][0]
    bottom = shape[1][1]

for file in os.listdir("images"):

    input_file = os.path.join('images', file)
    im = Image.open(input_file)
    im1 = im.crop((left, top+5, right, bottom))
    size = im1.size
    # resize the image to 1000 width
    im1 = im1.resize((1500,math.floor(size[1]/size[0]*1500)),Image.ANTIALIAS)
    im1.save(os.path.join('output', file))