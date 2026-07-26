from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "custom_board"

BOARD_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/bahnschrift.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def polar(cx: float, cy: float, radius: float, degrees_clockwise_from_top: float) -> tuple[float, float]:
    a = math.radians(degrees_clockwise_from_top)
    return cx + math.sin(a) * radius, cy - math.cos(a) * radius


def annular_sector_points(
    cx: float,
    cy: float,
    inner: float,
    outer: float,
    a0: float,
    a1: float,
    steps: int = 24,
) -> list[tuple[float, float]]:
    outer_points = [polar(cx, cy, outer, a0 + (a1 - a0) * i / steps) for i in range(steps + 1)]
    inner_points = [polar(cx, cy, inner, a1 - (a1 - a0) * i / steps) for i in range(steps + 1)]
    return outer_points + inner_points


def draw_annular_sector(
    draw: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    inner: float,
    outer: float,
    a0: float,
    a1: float,
    fill: tuple[int, int, int, int],
    steps: int = 28,
) -> None:
    draw.polygon(annular_sector_points(cx, cy, inner, outer, a0, a1, steps), fill=fill)


def draw_ring(draw: ImageDraw.ImageDraw, cx: float, cy: float, inner: float, outer: float, fill):
    box_outer = [cx - outer, cy - outer, cx + outer, cy + outer]
    box_inner = [cx - inner, cy - inner, cx + inner, cy + inner]
    draw.ellipse(box_outer, fill=fill)
    draw.ellipse(box_inner, fill=(0, 0, 0, 0))


def add_noise(img: Image.Image, mask: Image.Image, strength: int, seed: int) -> Image.Image:
    rnd = random.Random(seed)
    noise = Image.new("RGBA", img.size, (0, 0, 0, 0))
    px = noise.load()
    w, h = img.size
    step = 3
    for y in range(0, h, step):
      for x in range(0, w, step):
        v = rnd.randint(-strength, strength)
        if v >= 0:
            col = (255, 255, 255, min(30, v))
        else:
            col = (0, 0, 0, min(34, -v))
        for yy in range(y, min(y + step, h)):
            for xx in range(x, min(x + step, w)):
                px[xx, yy] = col
    noise.putalpha(ImageChops.multiply(noise.getchannel("A"), mask))
    return Image.alpha_composite(img, noise)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_rotated_text(
    base: Image.Image,
    text: str,
    center: tuple[float, float],
    rotation_deg: float,
    fnt,
    fill=(238, 242, 246, 255),
) -> None:
    scratch = Image.new("RGBA", (360, 220), (0, 0, 0, 0))
    d = ImageDraw.Draw(scratch)
    w, h = text_size(d, text, fnt)
    x = (scratch.width - w) / 2
    y = (scratch.height - h) / 2 - scratch.height * 0.035
    d.text((x + 3, y + 4), text, font=fnt, fill=(0, 0, 0, 150))
    d.text((x, y), text, font=fnt, fill=fill)
    rotated = scratch.rotate(-rotation_deg, resample=Image.Resampling.BICUBIC, expand=True)
    base.alpha_composite(rotated, (int(center[0] - rotated.width / 2), int(center[1] - rotated.height / 2)))


def make_board(filename: str, palette: dict, size: int = 2400, seed: int = 10) -> None:
    scale = 2
    w = size * scale
    cx = cy = w / 2
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    outer = w * 0.482
    number_inner = outer * 0.805
    double_outer = outer * 0.755
    double_inner = outer * 0.705
    triple_outer = outer * 0.475
    triple_inner = outer * 0.432
    outer_bull = outer * 0.074
    inner_bull = outer * 0.033

    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([cx - outer * 1.01, cy - outer * 1.0, cx + outer * 1.01, cy + outer * 1.02], fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(int(w * 0.012)))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img, "RGBA")

    draw.ellipse([cx - outer, cy - outer, cx + outer, cy + outer], fill=palette["outer"])
    draw.ellipse([cx - number_inner, cy - number_inner, cx + number_inner, cy + number_inner], fill=palette["bed_shadow"])

    for i, number in enumerate(BOARD_ORDER):
        center_angle = i * 18
        a0, a1 = center_angle - 9, center_angle + 9
        bed = palette["bed_dark"] if i % 2 == 0 else palette["bed_light"]
        ring = palette["red"] if i % 2 == 0 else palette["green"]
        draw_annular_sector(draw, cx, cy, outer_bull, triple_inner, a0, a1, bed)
        draw_annular_sector(draw, cx, cy, triple_outer, double_inner, a0, a1, bed)
        draw_annular_sector(draw, cx, cy, triple_inner, triple_outer, a0, a1, ring)
        draw_annular_sector(draw, cx, cy, double_inner, double_outer, a0, a1, ring)

    board_mask = Image.new("L", img.size, 0)
    md = ImageDraw.Draw(board_mask)
    md.ellipse([cx - outer, cy - outer, cx + outer, cy + outer], fill=255)
    img = add_noise(img, board_mask, palette["noise"], seed)
    draw = ImageDraw.Draw(img, "RGBA")

    wire = palette["wire"]
    for r in [outer_bull, inner_bull, triple_inner, triple_outer, double_inner, double_outer, number_inner]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=wire, width=max(2, int(w * 0.0018)))
    for i in range(20):
        a = i * 18 - 9
        x1, y1 = polar(cx, cy, outer_bull, a)
        x2, y2 = polar(cx, cy, double_outer, a)
        draw.line([x1, y1, x2, y2], fill=wire, width=max(2, int(w * 0.0017)))

    draw.ellipse([cx - outer_bull, cy - outer_bull, cx + outer_bull, cy + outer_bull], fill=palette["green"], outline=wire, width=max(2, int(w * 0.002)))
    draw.ellipse([cx - inner_bull, cy - inner_bull, cx + inner_bull, cy + inner_bull], fill=palette["red"], outline=wire, width=max(2, int(w * 0.002)))

    # Subtle outer bevel and screw tabs, generic without brand marks.
    draw.ellipse([cx - outer, cy - outer, cx + outer, cy + outer], outline=palette["rim_hi"], width=int(w * 0.009))
    draw.ellipse([cx - outer * 0.978, cy - outer * 0.978, cx + outer * 0.978, cy + outer * 0.978], outline=palette["rim_lo"], width=int(w * 0.012))
    for a in [27, 93, 153, 207, 267, 333]:
        tx, ty = polar(cx, cy, outer * 0.935, a)
        tab_w, tab_h = outer * 0.065, outer * 0.032
        tab = Image.new("RGBA", (int(tab_w * 2), int(tab_h * 2)), (0, 0, 0, 0))
        td = ImageDraw.Draw(tab, "RGBA")
        td.rounded_rectangle([2, 2, tab.width - 2, tab.height - 2], radius=int(tab.height * 0.35), fill=palette["tab"], outline=palette["rim_hi"], width=3)
        td.ellipse([tab.width * 0.39, tab.height * 0.30, tab.width * 0.61, tab.height * 0.52], fill=palette["rim_lo"])
        tab = tab.rotate(-a, resample=Image.Resampling.BICUBIC, expand=True)
        img.alpha_composite(tab, (int(tx - tab.width / 2), int(ty - tab.height / 2)))

    fnt = font(int(w * 0.058))
    for i, number in enumerate(BOARD_ORDER):
        a = i * 18
        pos = polar(cx, cy, outer * 0.905, a)
        rot = a if a <= 180 else a - 360
        draw_rotated_text(img, str(number), pos, rot, fnt, palette["number"])

    img = img.resize((size, size), Image.Resampling.LANCZOS)
    img.save(OUT / filename, optimize=True)


def radial_ring_mask(size: int, inner: float, outer: float) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    c = size / 2
    d.ellipse([c - outer, c - outer, c + outer, c + outer], fill=255)
    d.ellipse([c - inner, c - inner, c + inner, c + inner], fill=0)
    return mask


def make_surround(filename: str, style: str, size: int = 3000, seed: int = 30) -> None:
    scale = 2
    w = size * scale
    c = w / 2
    inner = w * 0.363
    outer = w * 0.482
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([c - outer, c - outer * 0.99, c + outer, c + outer * 1.01], fill=(0, 0, 0, 92))
    sd.ellipse([c - inner, c - inner, c + inner, c + inner], fill=(0, 0, 0, 0))
    shadow = shadow.filter(ImageFilter.GaussianBlur(int(w * 0.012)))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img, "RGBA")

    if style == "matte_black":
        colors = ((18, 20, 22, 255), (38, 42, 45, 255), (6, 7, 8, 255))
        draw_ring(draw, c, c, inner, outer, colors[0])
        draw.ellipse([c - outer * 0.985, c - outer * 0.985, c + outer * 0.985, c + outer * 0.985], outline=(70, 76, 80, 180), width=int(w * 0.008))
        draw.ellipse([c - inner * 1.015, c - inner * 1.015, c + inner * 1.015, c + inner * 1.015], outline=(0, 0, 0, 200), width=int(w * 0.013))
        mask = radial_ring_mask(w, inner, outer)
        img = add_noise(img, mask, 26, seed)
    elif style == "carbon_red":
        draw_ring(draw, c, c, inner, outer, (14, 15, 17, 255))
        mask = radial_ring_mask(w, inner, outer)
        cd = ImageDraw.Draw(img, "RGBA")
        spacing = int(w * 0.028)
        for offset in range(-w, w * 2, spacing):
            cd.line([(offset, 0), (offset + w, w)], fill=(255, 255, 255, 18), width=int(w * 0.004))
            cd.line([(offset, w), (offset + w, 0)], fill=(0, 0, 0, 45), width=int(w * 0.004))
        img.putalpha(ImageChops.lighter(img.getchannel("A"), mask))
        draw = ImageDraw.Draw(img, "RGBA")
        for r, col, width in [
            (outer * 0.99, (210, 28, 36, 230), int(w * 0.007)),
            (inner * 1.01, (210, 28, 36, 220), int(w * 0.007)),
            ((inner + outer) / 2, (110, 14, 20, 145), int(w * 0.004)),
        ]:
            draw.ellipse([c - r, c - r, c + r, c + r], outline=col, width=width)
    elif style == "light_faceted":
        draw_ring(draw, c, c, inner, outer, (218, 221, 220, 255))
        rnd = random.Random(seed)
        for _ in range(180):
            a0 = rnd.uniform(0, 360)
            a1 = a0 + rnd.uniform(7, 18)
            r0 = rnd.uniform(inner * 1.02, outer * 0.96)
            r1 = min(outer * 0.995, r0 + rnd.uniform(w * 0.018, w * 0.065))
            shade = rnd.randint(-28, 30)
            col = (max(0, min(255, 218 + shade)), max(0, min(255, 221 + shade)), max(0, min(255, 220 + shade)), 180)
            draw.polygon(annular_sector_points(c, c, r0, r1, a0, a1, 2), fill=col)
        draw.ellipse([c - outer, c - outer, c + outer, c + outer], outline=(248, 248, 246, 210), width=int(w * 0.009))
        draw.ellipse([c - inner, c - inner, c + inner, c + inner], outline=(180, 184, 184, 180), width=int(w * 0.010))
    else:
        draw_ring(draw, c, c, inner, outer, (15, 22, 30, 255))
        draw.ellipse([c - outer * 0.99, c - outer * 0.99, c + outer * 0.99, c + outer * 0.99], outline=(52, 170, 255, 190), width=int(w * 0.011))
        draw.ellipse([c - inner * 1.012, c - inner * 1.012, c + inner * 1.012, c + inner * 1.012], outline=(76, 204, 255, 210), width=int(w * 0.010))
        glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        gd.ellipse([c - outer, c - outer, c + outer, c + outer], outline=(0, 140, 255, 160), width=int(w * 0.025))
        gd.ellipse([c - inner, c - inner, c + inner, c + inner], outline=(0, 200, 255, 125), width=int(w * 0.025))
        glow = glow.filter(ImageFilter.GaussianBlur(int(w * 0.011)))
        img = Image.alpha_composite(glow, img)

    # Re-cut the transparent centre and outside after texture/glow work.
    final_alpha = radial_ring_mask(w, inner, outer)
    img.putalpha(ImageChops.multiply(img.getchannel("A"), final_alpha))
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    img.save(OUT / filename, optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    palettes = {
        "classic": {
            "outer": (12, 12, 12, 255),
            "bed_shadow": (22, 23, 23, 255),
            "bed_dark": (16, 17, 17, 255),
            "bed_light": (238, 232, 205, 255),
            "red": (218, 38, 42, 255),
            "green": (48, 164, 75, 255),
            "wire": (196, 201, 205, 215),
            "number": (238, 242, 246, 255),
            "rim_hi": (210, 215, 220, 195),
            "rim_lo": (36, 38, 40, 220),
            "tab": (55, 58, 60, 230),
            "noise": 18,
        },
        "blade_dark": {
            "outer": (24, 24, 23, 255),
            "bed_shadow": (28, 29, 29, 255),
            "bed_dark": (19, 21, 21, 255),
            "bed_light": (235, 229, 202, 255),
            "red": (238, 58, 57, 255),
            "green": (74, 194, 103, 255),
            "wire": (90, 96, 100, 230),
            "number": (240, 243, 245, 245),
            "rim_hi": (164, 169, 173, 170),
            "rim_lo": (11, 12, 13, 230),
            "tab": (48, 51, 54, 240),
            "noise": 26,
        },
        "warm_sisal": {
            "outer": (30, 28, 26, 255),
            "bed_shadow": (50, 45, 39, 255),
            "bed_dark": (25, 25, 23, 255),
            "bed_light": (216, 190, 135, 255),
            "red": (199, 50, 38, 255),
            "green": (39, 145, 92, 255),
            "wire": (238, 222, 185, 185),
            "number": (250, 244, 230, 235),
            "rim_hi": (184, 168, 132, 155),
            "rim_lo": (42, 36, 28, 225),
            "tab": (70, 61, 50, 235),
            "noise": 38,
        },
    }

    make_board("board_classic_clean_2400.png", palettes["classic"], seed=4)
    make_board("board_blade_dark_2400.png", palettes["blade_dark"], seed=9)
    make_board("board_warm_sisal_2400.png", palettes["warm_sisal"], seed=15)

    make_surround("surround_matte_black_3000.png", "matte_black", seed=31)
    make_surround("surround_carbon_red_3000.png", "carbon_red", seed=38)
    make_surround("surround_light_faceted_3000.png", "light_faceted", seed=43)
    make_surround("surround_neon_blue_3000.png", "neon_blue", seed=51)

    print(f"Wrote {len(list(OUT.glob('*.png')))} PNG files to {OUT}")


if __name__ == "__main__":
    main()
