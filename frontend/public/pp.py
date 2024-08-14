import json
import numpy as np
from PIL import Image
from scipy.ndimage import zoom
# def reduce_grayscale_data(grayscale_data):
#     # Convert the grayscale data to a numpy array if it's not already
#     grayscale_array = np.array(grayscale_data)
    
#     # Get the original dimensions
#     original_height, original_width = grayscale_array.shape
    
#     # Calculate the reduced dimensions
#     reduced_width = original_width // 2
#     reduced_height = original_height // 2
    
#     # Initialize the reduced grayscale data array
#     reduced_array = np.zeros((reduced_height, reduced_width), dtype=np.uint8)
    
#     # Fill the reduced array by averaging 2x2 blocks
#     for i in range(reduced_height):
#         for j in range(reduced_width):
#             block = grayscale_array[2*i:2*i+2, 2*j:2*j+2]
#             reduced_array[i, j] = np.mean(block)
    
#     return reduced_array
def reduce_grayscale_data(grayscale_data, reduction_factor=10.75):
    # Convert the grayscale data to a numpy array if it's not already
    grayscale_array = np.array(grayscale_data)
    
    # Calculate the reduced dimensions using the reduction factor
    reduced_height = int(grayscale_array.shape[0] / reduction_factor)
    reduced_width = int(grayscale_array.shape[1] / reduction_factor)
    
    # Resize the array using bilinear interpolation
    reduced_array = zoom(grayscale_array, (1/reduction_factor, 1/reduction_factor), order=1)
    
    # Convert the resulting array to uint8 if necessary
    reduced_array = reduced_array.astype(np.uint8)
    
    return reduced_array

def save_grayscale_texture(grayscale_data, output_filename):
    # Reduce the grayscale data dimensions by half
    reduced_grayscale = reduce_grayscale_data(grayscale_data , 2)
    # reduceee = np.array(grayscale_data)
    # Convert the reduced grayscale data to a PIL image
    image = Image.fromarray(reduced_grayscale, mode='L')
    
    # Save the image as a PNG file
    image.save(output_filename)

def read_grayscale_data_from_json(json_filename):
    # Read grayscale data from the JSON file
    with open(json_filename, 'r') as f:
        data = json.load(f)
    
    # Assuming the grayscale data is stored under a specific key (e.g., "grayscaleData")
    grayscale_data = data
    
    if grayscale_data is None:
        raise ValueError("Grayscale data not found in the JSON file.")
    
    return grayscale_data

# Example usage
json_filename = 'jsons/ortho2.json'  # The JSON file containing the grayscale data
output_filename = 'orthob.png'  # The output PNG file

grayscale_data = read_grayscale_data_from_json(json_filename)
save_grayscale_texture(grayscale_data, output_filename)

print(f"Texture saved as {output_filename}")
