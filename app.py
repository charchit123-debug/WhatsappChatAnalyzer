from flask import Flask, request, jsonify, render_template
import pandas as pd
import re
from datetime import datetime
from nltk.sentiment import SentimentIntensityAnalyzer
from wordcloud import WordCloud
import nltk
import io
import base64
from matplotlib.figure import Figure

# Initialize the app and sentiment analyzer
app = Flask(__name__)
sia = SentimentIntensityAnalyzer()
nltk.download('vader_lexicon')


def parse_chat_data(chat_content):
    """Parses the WhatsApp chat data from a text file content"""
    lines = chat_content.splitlines()
    dates, times, users, messages = [], [], [], []

    date_time_pattern = r'(\d{1,2}/\d{1,2}/\d{2,4}), (\d{1,2}:\d{2}) - (.*?): (.*)'
    for line in lines:
        match = re.match(date_time_pattern, line)
        if match:
            date, time, user, message = match.groups()
            dates.append(date)
            times.append(time)
            users.append(user)
            messages.append(message)

    chat_df = pd.DataFrame({'Date': dates, 'Time': times, 'User': users, 'Message': messages})
    chat_df['Date'] = pd.to_datetime(chat_df['Date'], errors='coerce', dayfirst=True)
    chat_df['Hour'] = chat_df['Time'].apply(lambda x: int(x.split(':')[0]))
    chat_df['Sentiment'] = chat_df['Message'].apply(lambda x: sia.polarity_scores(x)['compound'])

    return chat_df


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    chat_file = request.files['chatFile']
    chat_content = chat_file.read().decode('utf-8')
    chat_df = parse_chat_data(chat_content)

    # Calculate insights
    total_messages = len(chat_df)
    top_days = chat_df['Date'].value_counts().head(10).to_dict()
    top_users = chat_df['User'].value_counts().head(10).to_dict()

    # Count media messages
    media_messages = chat_df[chat_df['Message'].str.contains(r'(media|video|photo)', case=False, na=False)]
    media_counts = media_messages['User'].value_counts().head(10).to_dict()

    # Extract emojis
    emoji_pattern = re.compile(
        r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F700-\U0001F77F\U0001F900-\U0001F9FF\U0001F1E6-\U0001F1FF]+')
    chat_df['Emojis'] = chat_df['Message'].apply(lambda x: emoji_pattern.findall(x))
    emoji_counts = chat_df['Emojis'].explode().value_counts().head(10).to_dict()

    # Calculate active hours and days
    active_hours = chat_df['Hour'].value_counts().sort_index().to_dict()
    active_days = chat_df['Date'].dt.day_name().value_counts().sort_index().to_dict()

    # Generate WordCloud
    wordcloud_data = ' '.join(chat_df['Message'])
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(wordcloud_data)
    img = io.BytesIO()
    wordcloud.to_image().save(img, format='PNG')
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    # Prepare the response
    response = {
        "total_messages": total_messages,
        "top_days": {date.strftime("%Y-%m-%d"): count for date, count in top_days.items()},
        "top_users": top_users,
        "media_messages": media_counts,
        "top_emojis": emoji_counts,
        "active_hours": active_hours,
        "active_days": active_days,
        "wordcloud": img_base64
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
