# import rasterio
# import numpy as np
# import csv

# # Path to the .tif file
# tif_path = '/home/mankirat/Documents/ch2data/DTM/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'

# # Open the .tif file using rasterio
# with rasterio.open(tif_path) as src:
#     # Read the data into a numpy array
#     data = src.read(1)  # Assuming the data is in the first band

# # Define the row and column ranges
# row_start = 57181
# row_end = 84558
# col_start = 0
# col_end = 1017

# # Extract the specific range of data
# subset_data = data[row_start:row_end+1, col_start:col_end+1]

# # Path to the output CSV file
# csv_path = 'output_data.csv'

# # Save the subset data to a CSV file
# with open(csv_path, mode='w', newline='') as file:
#     writer = csv.writer(file)
#     for row in subset_data:
#         writer.writerow(row)

# print(f'Data saved to {csv_path}')

# from osgeo import gdal
# import numpy as np

# # Open the TIF file
# tif_file = '/home/mankirat/Documents/ch2data/DTM/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'
# dataset = gdal.Open(tif_file)

# # Read the first raster band
# band = dataset.GetRasterBand(1)
# elevation_data = band.ReadAsArray()

# # Since data is SignedLSB2 (16-bit signed integer), the array is already in correct format
# # Apply any necessary scaling factor if specified in XML metadata (assuming scale_factor = 1 for this example)
# scale_factor = 1.0  # Replace with actual scale factor if available
# elevation_data = elevation_data * scale_factor

# # Get georeferencing info (corner coordinates)
# geotransform = dataset.GetGeoTransform()
# projection = dataset.GetProjection()

# # Print some information
# print(f"GeoTransform: {geotransform}")
# print(f"Projection: {projection}")
# print(f"Elevation Data Shape: {elevation_data.shape}")

# # Optionally, save the elevation data to a new GeoTIFF with georeferencing
# output_tif = 'path/to/output_elevation_data.tif'
# driver = gdal.GetDriverByName('GTiff')
# out_dataset = driver.Create(output_tif, band.XSize, band.YSize, 1, gdal.GDT_Float32)
# out_dataset.SetGeoTransform(geotransform)
# out_dataset.SetProjection(projection)
# out_band = out_dataset.GetRasterBand(1)
# out_band.WriteArray(elevation_data)
# out_band.SetNoDataValue(np.nan)
# out_dataset.FlushCache()

# import numpy as np
# from osgeo import gdal

# # Open the TIF file
# dataset = gdal.Open('/home/mankirat/Documents/ch2data/DTM/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif')

# band = dataset.GetRasterBand(1)

# # Read the data into a numpy array
# elevation_data = band.ReadAsArray()

# # Identify no-data values
# no_data_value = band.GetNoDataValue()
# if no_data_value is None:
#     no_data_value = -32768  # Assuming this as no-data if not defined

# # Mask no-data values
# elevation_data = np.ma.masked_equal(elevation_data, no_data_value)

# # Mask 128 values if they are identified as invalid or no-data
# invalid_value = 128  # Assuming this as invalid if documentation supports
# elevation_data = np.ma.masked_equal(elevation_data, invalid_value)

# # Print some statistics of the cleaned data
# print("Min elevation:", np.min(elevation_data))
# print("Max elevation:", np.max(elevation_data))
# print("Mean elevation:", np.mean(elevation_data))

# import rasterio
# import numpy as np
# import pandas as pd

# # Read the TIFF file
# tif_path = '/home/mankirat/Documents/ch2data/DTM/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'  # Replace with your TIFF file path
# with rasterio.open(tif_path) as src:
#     elevation_data = src.read(1)  # Read the first band

# # Replace invalid values (e.g., 128) with NaN and fill NaNs
# elevation_data = np.where(elevation_data == 128, np.nan, elevation_data)
# elevation_data = pd.DataFrame(elevation_data).fillna(method='ffill').fillna(method='bfill').values

# # Normalize the data
# min_val = np.nanmin(elevation_data)
# max_val = np.nanmax(elevation_data)
# normalized_data = (elevation_data - min_val) / (max_val - min_val)

# # Save the processed data to a CSV file
# processed_file_path = 'processed_elevation_data.csv'
# pd.DataFrame(normalized_data).to_csv(processed_file_path, header=False, index=False)

# print(f"Processed data saved to {processed_file_path}")

# import os
# import rasterio
# import numpy as np
# import pandas as pd

# # Read the TIFF file
# tif_path = 'E:/develop/isro/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'  # Replace with your TIFF file path

# output_dir = 'tiles'
# tile_size = 1000  # Size of each tile

# if not os.path.exists(output_dir):
#     os.makedirs(output_dir)

# with rasterio.open(tif_path) as src:
#     elevation_data = src.read(1)  # Read the first band

# # Assuming the data is 30000x30000
# elevation_data = elevation_data[:30000, :30000]

# # Replace invalid values (-32768) with NaN
# elevation_data = np.where(elevation_data == -32768, np.nan, elevation_data)
# # handle the value 128 also
# elevation_data = np.where(elevation_data == 128, np.nan, elevation_data)

# # Handle NaN values by interpolation or filling
# elevation_data = pd.DataFrame(elevation_data).interpolate(method='linear', limit_direction='both').fillna(method='ffill').fillna(method='bfill').values

# # Normalize the data
# min_val = np.nanmin(elevation_data)
# max_val = np.nanmax(elevation_data)
# normalized_data = (elevation_data - min_val) / 10

# # Split data into tiles
# num_rows, num_cols = normalized_data.shape
# for i in range(0, num_rows, tile_size):
#     for j in range(0, num_cols, tile_size):
#         tile = normalized_data[i:i + tile_size, j:j + tile_size]
#         tile_path = os.path.join(output_dir, f'tile_{i}_{j}.csv')
#         pd.DataFrame(tile).to_csv(tile_path, header=False, index=False)

# print("Tiles created successfully.")

# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# from pds4_tools import pds4_read

# # Path to your PDS4 label file (XML)
# label_file_path = 'E:/develop/isro/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.xml'

# # Read the PDS4 data
# pds4_data = pds4_read(label_file_path)
# print(pds4_data.structures, "yo")

# # Assuming 'Array_2D_Image' is the correct structure for the DEM data
# dem_data_structure = pds4_data['ARRAY_0']  # Adjust index if needed
# elevation_data = dem_data_structure.data

# # Replace missing data values (-32768) with NaN
# elevation_data = np.where(elevation_data == -32768, np.nan, elevation_data)

# square_data = elevation_data[
#     elevation_data.shape[0] // 2 - 5: elevation_data.shape[0] // 2 + 5,
#     elevation_data.shape[1] // 2 - 5: elevation_data.shape[1] // 2 + 5
# ]

# # Create a DataFrame to store the elevation data
# square_df = pd.DataFrame(square_data)

# # Save the DataFrame to a CSV file
# csv_file_path = 'elevation_square.csv'
# square_df.to_csv(csv_file_path, index=False)

# print(f"Elevation data of the 10x10 pixel square has been saved to {csv_file_path}")

# # Optionally, plot the extracted square
# plt.figure(figsize=(6, 6))
# plt.imshow(square_data, cmap='terrain')
# plt.colorbar(label='Elevation (meters)')
# plt.title('10x10 Pixel Square Elevation Data')
# plt.xlabel('Sample')
# plt.ylabel('Line')
# plt.show()

import rasterio
import numpy as np
import pandas as pd
import json
# Path to your DEM file
# dem_file_path = 'E:/develop/isro/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'

dem_file_path = './src/tmc/ortho.tif'

# Define the size of the square and calculate the offset
square_size = 10
offset = square_size // 2

# Open the DEM file
with rasterio.open(dem_file_path) as dataset:
    # Read the DEM data (first band)
    elevation_data = dataset.read(1)
    
    # Replace missing data values (-32768) with NaN
    elevation_data = np.where(elevation_data == -32768, np.nan, elevation_data)
    
    # Get the dimensions of the image
    rows, cols = elevation_data.shape
    print(rows,cols)
    # Calculate the start and end row and column indices
    start_row = 5000
    end_row = 10000
    start_col = 0
    end_col = 6000
    
    # Extract the 10px x 10px square
    # square = elevation_data[start_row:end_row, start_col:end_col]
    square = elevation_data[0:rows, 0:cols]
    
    # Create a DataFrame for the extracted data
    # df = pd.DataFrame(square/10)
    square = np.nan_to_num(square, nan=0)
    data_list = ((square-255)* -1 ).tolist()
    # Save the DataFrame to a CSV file
    # csv_file_path = 'elevation_data_center_square.csv'
    # df.to_csv(csv_file_path, index=False, header=False)
    json_file_path = 'ortho.json'
    with open(json_file_path, 'w') as json_file:
        json.dump(data_list, json_file)

# print(f"CSV file saved to {csv_file_path}")
