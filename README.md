# Overview

This project provides a tool to filter and sort games based on categories, sourced from the FitGirl Repacks website. It consists of a Python script to scrape data and a frontend built with React, Vite, and Tailwind CSS for the user interface.

## Components

### 1. Data Scraper (`scrape_fitgirl_site.py`)

The `scrape_fitgirl_site.py` script is responsible for scraping the FitGirl Repacks website. It collects all the necessary data, including game titles, categories, and links, and compiles this information into a structured JSON file. This JSON file is then used to power the frontend filtering tool.

### 2. Frontend Interface

The frontend application is built using React with Vite as the build tool and Tailwind CSS for styling. The interface allows users to filter the scraped game entries by category and displays the results in chronological order. Clicking on a game entry redirects the user to the specific link on the official FitGirl Repacks website.
