#!/usr/bin/env python3
"""
Prepare email image assets for the Hair by Sha referral campaign.

Source images are real client photos shot in-salon. We only crop, scale and
apply a light warm grade to sit them in the brand palette — nothing is
generated or fabricated.
"""
from PIL import Image, ImageEnhance
from pathlib import Path

BASE = Path(__file__).parent
SRC = BASE / "assets"
OUT = BASE / "assets" / "email"
OUT.mkdir(parents=True, exist_ok=True)


def warm_grade(img, contrast=1.04, saturation=0.96, warmth=1.03):
    """Light editorial grade: gently warm, slightly desaturated, soft contrast."""
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(saturation)
    r, g, b = img.split()
    r = r.point(lambda v: min(255, int(v * warmth)))
    b = b.point(lambda v: int(v / warmth))
    return Image.merge("RGB", (r, g, b))


def crop_to(img, target_w, target_h, focus_y=0.5, focus_x=0.5):
    """Cover-crop to an aspect ratio around a focal point, then resize."""
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:          # source too wide -> crop sides
        new_w = int(src_h * target_ratio)
        left = int((src_w - new_w) * focus_x)
        box = (left, 0, left + new_w, src_h)
    else:                                  # source too tall -> crop top/bottom
        new_h = int(src_w / target_ratio)
        top = int((src_h - new_h) * focus_y)
        box = (0, top, src_w, top + new_h)

    return img.crop(box).resize((target_w, target_h), Image.LANCZOS)


def save(img, name, quality=86):
    path = OUT / name
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    kb = path.stat().st_size / 1024
    print(f"  {name:32s} {img.size[0]}x{img.size[1]:<5d} {kb:6.1f} KB")


def load(name):
    return Image.open(SRC / name).convert("RGB")


print("Building email assets\n")

balayage = load("photo-balayage.jpg")   # 908x1600
layers = load("photo-layers.jpg")       # 905x1600
updo = load("photo-updo.jpg")           # 905x1600
sha = load("photo-sha-card.jpg")        # 367x655

# --- Hero: wide banner, focused on the waves through the mid-length ---------
print("hero options:")
save(warm_grade(crop_to(balayage, 900, 620, focus_y=0.34)), "hero-balayage.jpg")
save(warm_grade(crop_to(layers, 900, 620, focus_y=0.36)), "hero-layers.jpg")

save(warm_grade(crop_to(updo, 900, 560, focus_y=0.26), warmth=1.05), "hero-updo.jpg")

# --- Hero: taller editorial crop for the split / portrait layouts -----------
save(warm_grade(crop_to(balayage, 760, 950, focus_y=0.32)), "hero-tall-balayage.jpg")

# --- Trio strip: three square-ish frames of real work ----------------------
# photo-layers.jpg carries a strong cool/blue cast from the salon's fluoro
# lighting; it needs a heavier correction than the daylight shots to sit in
# the same warm palette as the others.
print("trio strip:")
for name, img, fy, grade in (
    ("trio-1.jpg", balayage, 0.36, dict(warmth=1.03, saturation=0.96)),
    ("trio-2.jpg", layers, 0.38, dict(warmth=1.11, saturation=0.86, contrast=1.07)),
    ("trio-3.jpg", updo, 0.30, dict(warmth=1.04, saturation=0.94)),
):
    save(warm_grade(crop_to(img, 380, 460, focus_y=fy), **grade), name)

# --- Sha portrait: crop away the baked-in name plate, keep the face --------
print("portrait:")
photo_only = sha.crop((0, 0, 367, 432))
save(warm_grade(crop_to(photo_only, 360, 360, focus_y=0.10), contrast=1.02), "sha-square.jpg", quality=90)
save(warm_grade(crop_to(photo_only, 340, 420, focus_y=0.05), contrast=1.02), "sha-portrait.jpg", quality=90)

# --- Optional additional photography ---------------------------------------
# Drop new source photos into assets/ using these filenames and re-run this
# script; heroes are generated automatically and can be swapped into any email
# by changing the {{ASSETS}}/… filename in the template.
#
#   photo-blonde.jpg   long straight blonde, window light   -> hero-blonde.jpg
#   photo-bronde.jpg   long straight bronde, side view      -> hero-bronde.jpg
#
OPTIONAL = [
    # (source filename, output name, crop w, h, vertical focus)
    ("photo-blonde.jpg", "hero-blonde.jpg", 900, 620, 0.30),
    ("photo-bronde.jpg", "hero-bronde.jpg", 900, 620, 0.32),
]

extra = [(s, o, w, h, fy) for (s, o, w, h, fy) in OPTIONAL if (SRC / s).exists()]
if extra:
    print("optional photography:")
    for src_name, out_name, w, h, fy in extra:
        save(warm_grade(crop_to(load(src_name), w, h, focus_y=fy)), out_name)
else:
    print("optional photography: none found (see OPTIONAL in this file)")

print("\nDone ->", OUT)
