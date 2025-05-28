import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load model and encoders
model = tf.keras.models.load_model('models/code_review_model.h5')
tokenizer = pickle.load(open('models/tokenizer.pkl', 'rb'))
label_encoder = pickle.load(open('models/label_encoder.pkl', 'rb'))

def predict_code_issue(code_snippet):
    sequence = tokenizer.texts_to_sequences([code_snippet])
    padded = pad_sequences(sequence, maxlen=300, padding='post')
    prediction = model.predict(padded)
    label = label_encoder.inverse_transform([prediction.argmax()])[0]
    return label
