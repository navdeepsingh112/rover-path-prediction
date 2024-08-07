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

import os
import rasterio
import numpy as np
import pandas as pd

# Read the TIFF file
tif_path = '/home/mankirat/Documents/ch2data/DTM/data/derived/20240220/ch2_tmc_ndn_20240220T1230242871_d_dtm_d18.tif'  # Replace with your TIFF file path

output_dir = 'tiles'
tile_size = 1000  # Size of each tile

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with rasterio.open(tif_path) as src:
    elevation_data = src.read(1)  # Read the first band

# Assuming the data is 30000x30000
elevation_data = elevation_data[:30000, :30000]

# Replace invalid values (-32768) with NaN
elevation_data = np.where(elevation_data == -32768, np.nan, elevation_data)
# handle the value 128 also
elevation_data = np.where(elevation_data == 128, np.nan, elevation_data)

# Handle NaN values by interpolation or filling
elevation_data = pd.DataFrame(elevation_data).interpolate(method='linear', limit_direction='both').fillna(method='ffill').fillna(method='bfill').values

# Normalize the data
min_val = np.nanmin(elevation_data)
max_val = np.nanmax(elevation_data)
normalized_data = (elevation_data - min_val) / (max_val - min_val)

# Split data into tiles
num_rows, num_cols = normalized_data.shape
for i in range(0, num_rows, tile_size):
    for j in range(0, num_cols, tile_size):
        tile = normalized_data[i:i + tile_size, j:j + tile_size]
        tile_path = os.path.join(output_dir, f'tile_{i}_{j}.csv')
        pd.DataFrame(tile).to_csv(tile_path, header=False, index=False)

print("Tiles created successfully.")

