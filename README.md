# Dinosaur Visualization Design

This visualization represents a subset of dinosaurs in the Mesozoic era as they were found through the different periods spread across the world map for a Dinosaur museum exhibit.
Marks: Points or Dino icons

Channels: X and Y coordinates of different countries where dinosaurs were found. The different images for dinosaur icons are also channels. Size of the icons also represent the corresponding length of dinosaurs scaled relatively.

Interactions: On hovering over a dinosaur icon, we get a zoomed view of the corresponding dinosaur type with detailed information about them displayed on a tooltip.

On changing the selected period, the dinosaurs that existed in that particular period are displayed across the world map. 

## Getting Started
To set up the project locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/AnjaliSrivastava29/dino-visualization-d3.git`

2. Run the local server:

`python3 -m http.server 8080`

This will start a local development server, and you can access the visualization at http://localhost:8080 in your web browser.

## Technologies Used
D3.js: A JavaScript library for creating dynamic, interactive data visualizations in the web browser.

Bootstrap: A popular CSS framework for building responsive and mobile-first websites.