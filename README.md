
# WhatsApp Chat Analyzer

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Functionality](#functionality)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Overview

The **WhatsApp Chat Analyzer** is a web application that analyzes exported WhatsApp chat data to provide insightful statistics and visualizations. Users can upload their chat files, and the application will generate various analytical insights, such as the most active days, media messages, top emojis, and active users. This tool is particularly useful for individuals and groups wanting to understand their chat patterns and engagement levels.

## Features

- **Upload Chat Data**: Users can upload their WhatsApp chat export files (text format).
- **Data Analysis**: The application analyzes the chat data to generate:
  - Top Days with the most messages
  - Count of media messages (images, videos, etc.)
  - Most frequently used emojis
  - Active days of the week
  - Top users based on message count
- **Visualizations**: Provides graphical representations of the analysis using charts for easier interpretation of data.
- **Responsive Design**: The web interface is responsive and works well on various devices.

## Technologies Used

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **Data Handling**: Pandas for data manipulation and analysis
- **Charting**: Chart.js for visualizing data in the form of graphs
- **Development Environment**: Any Python environment with Flask installed

## Installation

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/yourusername/whatsapp-chat-analyzer.git
   cd whatsapp-chat-analyzer
   ```

2. **Set Up a Virtual Environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

5. **Access the Application**: Open your web browser and navigate to `http://127.0.0.1:5000/`.

## Usage

1. **Upload Chat File**: On the home page, use the upload feature to select a WhatsApp chat export file.
2. **Analyze Data**: Click on the analyze button to process the uploaded chat data.
3. **View Results**: After processing, results will be displayed in various graphical formats for easy interpretation.

## Functionality

### 1. Data Loading and Processing
- The chat data is loaded from a user-uploaded file. The application reads and parses the chat to extract relevant details like timestamps, message content, and user information.

### 2. Data Analysis
- The application performs several analyses, including:
  - **Top Days**: Counts messages per day and identifies the days with the highest activity.
  - **Media Messages**: Identifies and counts different types of media messages sent (e.g., images, videos).
  - **Top Emojis**: Analyzes messages to find and count the usage of emojis.
  - **Active Days**: Analyzes which days of the week have the highest message counts.
  - **Top Users**: Identifies the users who sent the most messages.

### 3. Data Visualization
- The results from the analyses are presented as interactive charts using Chart.js, allowing users to easily see trends and insights.

## File Structure

```
whatsapp-chat-analyzer/
│
├── app.py                   # Main application script
├── requirements.txt         # Python dependencies
├── static/                  # Folder for static files (CSS, JS)
│   ├── script.js            # JavaScript for handling front-end logic
│   └── style.css            # CSS for styling the application
├── templates/               # Folder for HTML templates
│   └── index.html           # Main HTML template
└── README.md                # This README file
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

