#!/usr/bin/env python3
import os
import base64
import json
from pathlib import Path
import requests

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise SystemExit("Please set OPENAI_API_KEY in your environment.")

# Prompts for each chapter
prompts = {
    "01_erste_schritte": (
        "Watercolor illustration in the poetic style of mid-20th century children's books, minimal lines, soft colors. Scene: The Little Prince standing on a soft sand dune under a twilight sky with sparse golden stars, a distant town with warm window lights, a subtle glowing rectangle in a human hand nearby hinting at a smartphone. Melancholic, tender, lots of negative space, high-quality, 4k."
    ),
    "02_gewohnheit": (
        "Watercolor and ink illustration: A gentle, melancholic composition of a small figure bathed in cool blue smartphone light, floating red heart icons around, an old analog clock faintly in the background. Minimalist lines, soft washes, paper texture, Antoine de Saint-Exupéry inspired mood, not a copy."
    ),
    "03_abgleiten": (
        "Muted watercolor city café interior at dusk. Several people sit side-by-side, faces lit by blue phone light, eyes downward. The Little Prince, small and golden-haired, looks lost among them. Soft grays, desaturated palette, gentle brushwork, subtle grain, children-book illustration vibe."
    ),
    "04_dunkelster_punkt": (
        "Dark, moody watercolor: A small figure alone in a dim room, face lit by a cold phone glow, nearly empty glass nearby, low-battery icon implied as red reflection. Deep blues and violets, sparse highlights, strong vignette, emotional yet tender."
    ),
    "05_wiederfinden": (
        "Night park watercolor: The Little Prince sits on a bench looking up to a field of soft golden stars, early morning hint on the horizon. Gentle wind in trees, small fountain sparkle, hopeful mood returning. Paper texture, soft brush, minimal lines."
    ),
    "06_neuer_blick": (
        "Sunrise watercolor: The Little Prince standing, looking up; warm morning light, a few fading stars. He holds a small phone at his side, switched off. Colors: peach, gold, pale blue, sage green; calm, grateful mood. Illustrated book style, high quality."
    ),
}

model = "gpt-image-1"
size = "1792x1024"

out_dir = Path("/Users/lo/projects/sucht/illustrations/png")
out_dir.mkdir(parents=True, exist_ok=True)

session = requests.Session()
headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

for name, prompt in prompts.items():
    print(f"Generating {name}...")
    body = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "quality": "high",
        "background": "transparent"
    }
    resp = session.post("https://api.openai.com/v1/images/generations", headers=headers, data=json.dumps(body), timeout=120)
    if resp.status_code != 200:
        print("Error:", resp.status_code, resp.text)
        continue
    data = resp.json()
    if not data.get("data"):
        print("No image returned for", name)
        continue
    b64 = data["data"][0].get("b64_json")
    if not b64:
        print("No b64_json for", name)
        continue
    img_bytes = base64.b64decode(b64)
    out_path = out_dir / f"{name}.png"
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    print("Saved:", out_path)

print("Done.")
