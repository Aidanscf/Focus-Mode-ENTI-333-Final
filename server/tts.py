#!/usr/bin/env python3
import sys
import os
from gtts import gTTS

def generate_audio(text, output_file):
    """Generate audio file from text using gTTS"""
    try:
        tts = gTTS(text=text, lang='en', slow=False)
        tts.save(output_file)
        print(f"Audio generated: {output_file}")
        return True
    except Exception as e:
        print(f"Error generating audio: {str(e)}", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: tts.py <text> <output_file>", file=sys.stderr)
        sys.exit(1)
    
    text = sys.argv[1]
    output_file = sys.argv[2]
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    success = generate_audio(text, output_file)
    sys.exit(0 if success else 1)
