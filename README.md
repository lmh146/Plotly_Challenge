# Belly Button Biodiversity

## Overview
This project utilizes a JSON formatted dataset of a handful of microbial species to create a dashboard displaying the microbes found in different in various samples from human navels. The dashboard consists of a bar chart that displays the top 10 operational taxonomic units (OTUs) found in that individual; a bubble chart of all the specimen found sized to display their prevelance in the navel; and a demographic chart displaying the background information of the person the sample was extracted from.

![image](https://user-images.githubusercontent.com/88953017/148692293-adc80df3-e0c0-43e9-b43b-55976b7e74a9.png)

## Usage
The dashboard using Javascript file connected to the HTML, loops through the samples names to populate the dropdown menu creating an option for users to select a sample to view. When a new sample is selected, a second function is run updating the chart information to reflect the current sample's information. The bar and bubble chart are created by employing Plotly while the demographics chart directly appends the HTML.
