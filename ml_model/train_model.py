import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Load dataset
df = pd.read_csv('data/dataset.csv')
df.dropna(subset=['code', 'label'], inplace=True)

# Tokenization
tokenizer = Tokenizer(num_words=10000, oov_token="<OOV>")
tokenizer.fit_on_texts(df['code'])
sequences = tokenizer.texts_to_sequences(df['code'])
padded_sequences = pad_sequences(sequences, maxlen=300, padding='post', truncating='post')

# Label Encoding
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(df['label'])

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    padded_sequences, encoded_labels, test_size=0.2, random_state=42
)

# Model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=10000, output_dim=64, input_length=300),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(len(np.unique(encoded_labels)), activation='softmax')
])
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train
model.fit(X_train, y_train, epochs=5, validation_split=0.2)

# Save model and tokenizer
os.makedirs("models", exist_ok=True)
model.save('models/code_review_model.h5')
with open("models/tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)
with open("models/label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("✅ Training complete and model saved in 'models/' folder.")
