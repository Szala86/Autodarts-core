from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert product JPG/WebP/PNG images to Autodarts custom-board PNG assets."
    )
    parser.add_argument("input", type=Path, help="Source product image")
    parser.add_argument("output", type=Path, help="Output PNG path")
    parser.add_argument(
        "--mode",
        choices=("plain", "board", "surround"),
        default="plain",
        help="plain: only convert; board: transparent outside circle; surround: transparent outside and centre",
    )
    parser.add_argument("--size", type=int, default=2400, help="Output square size in pixels")
    parser.add_argument(
        "--bg-threshold",
        type=int,
        default=54,
        help="Background removal tolerance. Use 0 to disable.",
    )
    parser.add_argument(
        "--white-bg",
        action="store_true",
        help="Force white/near-white background removal instead of auto edge colour.",
    )
    parser.add_argument(
        "--outer-radius",
        type=float,
        default=0.485,
        help="Outer visible radius as fraction of output size. 0.485 fits most product images.",
    )
    parser.add_argument(
        "--inner-radius",
        type=float,
        default=0.365,
        help="Surround centre cut radius as fraction of output size.",
    )
    parser.add_argument(
        "--soft-edge",
        type=float,
        default=0.0025,
        help="Soft alpha edge as fraction of output size.",
    )
    return parser.parse_args()


def fit_square(im: Image.Image, size: int) -> Image.Image:
    im = im.convert("RGBA")
    im.thumbnail((size, size), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.alpha_composite(im, ((size - im.width) // 2, (size - im.height) // 2))
    return out


def edge_background(im: Image.Image) -> tuple[int, int, int]:
    px = im.convert("RGBA")
    w, h = px.size
    samples: list[tuple[int, int, int]] = []
    step = max(1, min(w, h) // 120)
    for x in range(0, w, step):
        for y in (0, h - 1):
            r, g, b, a = px.getpixel((x, y))
            if a > 16:
                samples.append((r, g, b))
    for y in range(0, h, step):
        for x in (0, w - 1):
            r, g, b, a = px.getpixel((x, y))
            if a > 16:
                samples.append((r, g, b))
    if not samples:
        for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
            r, g, b, _ = px.getpixel((x, y))
            samples.append((r, g, b))
    return tuple(sorted(channel)[len(channel) // 2] for channel in zip(*samples))


def remove_background(im: Image.Image, threshold: int, *, white_bg: bool = False) -> Image.Image:
    if threshold <= 0:
        return im
    bg = (255, 255, 255) if white_bg else edge_background(im)
    src = im.convert("RGBA")
    data = []
    for r, g, b, a in src.getdata():
        dist = math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)
        if dist <= threshold:
            data.append((r, g, b, 0))
        elif dist <= threshold * 2:
            alpha = int(a * min(1, (dist - threshold) / max(1, threshold)))
            data.append((r, g, b, alpha))
        else:
            data.append((r, g, b, a))
    src.putdata(data)
    return src


def circle_mask(size: int, radius: float, soft: float) -> Image.Image:
    scale = 3
    big = size * scale
    c = big / 2
    mask = Image.new("L", (big, big), 0)
    draw = ImageDraw.Draw(mask)
    r = radius * big
    draw.ellipse([c - r, c - r, c + r, c + r], fill=255)
    blur = max(0, int(soft * big))
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return mask.resize((size, size), Image.Resampling.LANCZOS)


def ring_mask(size: int, inner_radius: float, outer_radius: float, soft: float) -> Image.Image:
    outer = circle_mask(size, outer_radius, soft)
    inner = circle_mask(size, inner_radius, soft)
    return ImageChops.subtract(outer, inner)


def apply_alpha_mask(im: Image.Image, mask: Image.Image) -> Image.Image:
    out = im.convert("RGBA")
    alpha = ImageChops.multiply(out.getchannel("A"), mask)
    out.putalpha(alpha)
    return out


def main() -> None:
    args = parse_args()
    if args.size < 256:
        raise SystemExit("--size must be at least 256")

    im = Image.open(args.input)
    out = fit_square(im, args.size)
    out = remove_background(out, args.bg_threshold, white_bg=args.white_bg)

    if args.mode == "board":
        out = apply_alpha_mask(out, circle_mask(args.size, args.outer_radius, args.soft_edge))
    elif args.mode == "surround":
        out = apply_alpha_mask(out, ring_mask(args.size, args.inner_radius, args.outer_radius, args.soft_edge))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    out.save(args.output, "PNG", optimize=True)
    print(f"Wrote {args.output} ({out.width}x{out.height})")


if __name__ == "__main__":
    main()
