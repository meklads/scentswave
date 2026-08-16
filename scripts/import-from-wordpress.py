#!/usr/bin/env python3
"""Copy original WordPress media and generate the Scents Wave catalog JSON."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path("/Users/ghousemac/Desktop/Turriva/SW")
WP_UPLOADS = ROOT / "scent swave/wordpress/public_html/wp-content/uploads"
LOGO_DIR = ROOT / "art- logo - backedg"
DEST = ROOT / "scentswave"
PUBLIC = DEST / "public" / "images"
DATA = DEST / "data"

SIZE_RE = re.compile(r"-\d+x\d+(?=\.[^.]+$)")
SKIP_BITS = ("-e171", "woocommerce-placeholder", "dummy-", "icons8")

BRANDS = {
    "giorgio-armani": {"slug": "giorgio-armani", "nameAr": "جورجيو أرماني", "nameEn": "Giorgio Armani", "logo": None},
    "givenchy": {"slug": "givenchy", "nameAr": "جيفنشي", "nameEn": "Givenchy", "logo": "givenchy.jpg"},
    "aramis": {"slug": "aramis", "nameAr": "اراميس", "nameEn": "Aramis", "logo": "aramis.jpg"},
    "bentley": {"slug": "bentley", "nameAr": "بنتلي", "nameEn": "Bentley", "logo": "bentley.jpg"},
    "paco-rabanne": {"slug": "paco-rabanne", "nameAr": "باكو رابان", "nameEn": "Paco Rabanne", "logo": "paco-rabanne.jpg"},
    "hugo-boss": {"slug": "hugo-boss", "nameAr": "هوغو بوس", "nameEn": "Hugo Boss", "logo": None},
    "burberry": {"slug": "burberry", "nameAr": "بربري", "nameEn": "Burberry", "logo": "burberry.jpg"},
    "bvlgari": {"slug": "bvlgari", "nameAr": "بولغاري", "nameEn": "Bvlgari", "logo": "bvlgari.jpg"},
    "calvin-klein": {"slug": "calvin-klein", "nameAr": "كالفن كلاين", "nameEn": "Calvin Klein", "logo": None},
    "carolina-herrera": {"slug": "carolina-herrera", "nameAr": "كارولينا هيريرا", "nameEn": "Carolina Herrera", "logo": "carolina-herrera.jpg"},
    "caron": {"slug": "caron", "nameAr": "كارون", "nameEn": "Caron", "logo": "caron.jpg"},
    "cartier": {"slug": "cartier", "nameAr": "كارتييه", "nameEn": "Cartier", "logo": None},
    "chanel": {"slug": "chanel", "nameAr": "شانيل", "nameEn": "Chanel", "logo": "chanel.jpg"},
    "chopard": {"slug": "chopard", "nameAr": "شوبارد", "nameEn": "Chopard", "logo": "chopard.jpg"},
    "davidoff": {"slug": "davidoff", "nameAr": "دافيدوف", "nameEn": "Davidoff", "logo": None},
    "dior": {"slug": "dior", "nameAr": "ديور", "nameEn": "Dior", "logo": "dior.jpg"},
    "dolce-gabbana": {"slug": "dolce-gabbana", "nameAr": "دولتشي أند غابانا", "nameEn": "Dolce & Gabbana", "logo": "dolcegabbana.jpg"},
    "dunhill": {"slug": "dunhill", "nameAr": "دنهل", "nameEn": "Dunhill", "logo": "dunhill.jpg"},
    "guerlain": {"slug": "guerlain", "nameAr": "غيرلان", "nameEn": "Guerlain", "logo": "guerlain.jpg"},
    "hermes": {"slug": "hermes", "nameAr": "هيرمس", "nameEn": "Hermès", "logo": "hermes.jpg"},
    "joop": {"slug": "joop", "nameAr": "جوب", "nameEn": "Joop", "logo": "joop.jpg"},
    "juicy-couture": {"slug": "juicy-couture", "nameAr": "جوسي كوتور", "nameEn": "Juicy Couture", "logo": "juicy-couture.jpg"},
    "lacoste": {"slug": "lacoste", "nameAr": "لاكوست", "nameEn": "Lacoste", "logo": None},
    "lalique": {"slug": "lalique", "nameAr": "لاليك", "nameEn": "Lalique", "logo": "lalique.jpg"},
    "lancome": {"slug": "lancome", "nameAr": "لانكوم", "nameEn": "Lancôme", "logo": "lancome.jpg"},
    "loewe": {"slug": "loewe", "nameAr": "لويفي", "nameEn": "Loewe", "logo": "loewe.jpg"},
    "prada": {"slug": "prada", "nameAr": "برادا", "nameEn": "Prada", "logo": "prada.jpg"},
    "mancera": {"slug": "mancera", "nameAr": "مانسيرا", "nameEn": "Mancera", "logo": "mancera.jpg"},
    "montblanc": {"slug": "montblanc", "nameAr": "مونت بلانك", "nameEn": "Montblanc", "logo": "mont-blanc.jpg"},
    "montale": {"slug": "montale", "nameAr": "مونتال", "nameEn": "Montale", "logo": "montale.jpg"},
    "roberto-cavalli": {"slug": "roberto-cavalli", "nameAr": "روبرتو كافالي", "nameEn": "Roberto Cavalli", "logo": "roberto-cavalli.jpg"},
    "st-dupont": {"slug": "st-dupont", "nameAr": "اس تي ديبونت", "nameEn": "S.T. Dupont", "logo": "s-t-dupont.jpg"},
    "tom-ford": {"slug": "tom-ford", "nameAr": "توم فورد", "nameEn": "Tom Ford", "logo": "tom-ford.jpg"},
    "trussardi": {"slug": "trussardi", "nameAr": "تروساردي", "nameEn": "Trussardi", "logo": "trussardi.jpg"},
    "versace": {"slug": "versace", "nameAr": "فيرساتشي", "nameEn": "Versace", "logo": "versace.jpg"},
    "ysl": {"slug": "ysl", "nameAr": "إيف سان لوران", "nameEn": "Yves Saint Laurent", "logo": "yves-saint-laurent.jpg"},
}

BRAND_PREFIXES = [
    ("YVES-SAINT-LAURENT", "ysl"),
    ("Yves-Saint-Laurent", "ysl"),
    ("PACO-RABANNE", "paco-rabanne"),
    ("Paco-Rabanne", "paco-rabanne"),
    ("Black-Xs-by-Paco-Rabanne", "paco-rabanne"),
    ("DOLCE-GABBANA", "dolce-gabbana"),
    ("Dolce-Gabbana", "dolce-gabbana"),
    ("Carolina-Herrera", "carolina-herrera"),
    ("Calvin-Klein", "calvin-klein"),
    ("EUPHORIA-MAN-INTENSE", "calvin-klein"),
    ("euphoria", "calvin-klein"),
    ("Live-Irresistible-Rosy-Crush-Givenchy", "givenchy"),
    ("Ange-Ou-Demon-Givenchy", "givenchy"),
    ("eaudemoiselle-De-Givenchy", "givenchy"),
    ("Givenchy", "givenchy"),
    ("La-vie-est-belle-LANCOME", "lancome"),
    ("Lancome", "lancome"),
    ("Mont-Blanc", "montblanc"),
    ("ARMANI-CODE", "giorgio-armani"),
    ("Acqua-Di-Gio", "giorgio-armani"),
    ("Stronger-With-You", "giorgio-armani"),
    ("Tom-Ford", "tom-ford"),
    ("Black-Orchid-Gold", "tom-ford"),
    ("Chanel", "chanel"),
    ("Chopard", "chopard"),
    ("Cartier", "cartier"),
    ("Bvlgari", "bvlgari"),
    ("bvlgari", "bvlgari"),
    ("Burberry", "burberry"),
    ("Mr.-Burberry", "burberry"),
    ("Bentley", "bentley"),
    ("Boss-Bottled", "hugo-boss"),
    ("Hugo-Man", "hugo-boss"),
    ("Aramis", "aramis"),
    ("Davidoff", "davidoff"),
    ("The-Game-Davidoff", "davidoff"),
    ("Cool-Water", "davidoff"),
    ("Dior", "dior"),
    ("Sauvage", "dior"),
    ("Dunhill", "dunhill"),
    ("Guerlain", "guerlain"),
    ("Vetiver-Extreme-Guerlain", "guerlain"),
    ("Hermes", "hermes"),
    ("Joop", "joop"),
    ("Juicy-Couture", "juicy-couture"),
    ("LACOSTE", "lacoste"),
    ("Lacoste", "lacoste"),
    ("Lalique", "lalique"),
    ("Loewe", "loewe"),
    ("Luna-Rossa-Carbon", "prada"),
    ("LHomme-Prada", "prada"),
    ("Mancera", "mancera"),
    ("Montale", "montale"),
    ("Roberto-Cavalli", "roberto-cavalli"),
    ("S.T.-Dupont", "st-dupont"),
    ("S.T._Dupont", "st-dupont"),
    ("Caron", "caron"),
    ("Trussardi", "trussardi"),
    ("Versace", "versace"),
    ("Silver-Shadow", "davidoff"),
]

WOMEN = {
    "Ange-Ou-Demon-Givenchy",
    "Calvin-Klein-Beauty",
    "Calvin-Klein-Eternity",
    "Calvin-Klein-Euphoria",
    "Carolina-Herrera-Chic",
    "eaudemoiselle-De-Givenchy",
    "euphoria",
    "Givenchy-Amarige",
    "Givenchy-Hot-Couture",
    "Givenchy-Linterdit",
    "Givenchy-Linterdit-Intense",
    "Juicy-Couture-Juicy-Couture",
    "Juicy-Couture-Viva-La-Juicy",
    "La-vie-est-belle-LANCOME",
    "Lancome-Idole",
    "Lancome-Mille-Une-Roses",
    "Lancome-Pmeoe",
    "Lancome-TRESOR-IN-LOVE",
    "Lancome-Tresor",
    "Lancome-Tresor-Midnight-Rose",
    "Lancome_Miracle",
    "Live-Irresistible-Rosy-Crush-Givenchy",
    "Roberto-Cavalli-Florence",
    "Roberto-Cavalli-Paradiso",
    "Roberto-Cavalli-Paradiso-Azzurro",
    "Roberto-Cavalli-Nero-Assoluto",
}

FEATURED = {
    "PACO-RABANNE-INVICTUS",
    "La-vie-est-belle-LANCOME",
    "Dior-Sauvage-Eau-de-Parfum",
    "ARMANI-CODE",
    "Chanel-Bleu-De-For",
    "Tom-Ford-Ombre-Leather",
    "Yves-Saint-Laurent-La-Nuit-De-LHomme-Intense",
    "Lancome-Idole",
    "Versace-Eros",
    "Mont-Blanc-Explorer",
    "Stronger-With-You-Intensely",
    "Paco-Rabanne-1-Million",
}

# slug-stem -> (price, compare, size_ml, concentration, name_en, name_ar)
KNOWN = {
    "PACO-RABANNE-INVICTUS": (429.0, 536.0, 100, "edt", "Invictus", "انفيكتوس"),
    "Paco-Rabanne-1-Million": (449.0, 561.0, 100, "edt", "1 Million", "ون مليون"),
    "Paco-Rabanne-Pour-Homme-For-Men": (389.0, 486.0, 100, "edt", "Pour Homme", "بور اوم"),
    "Black-Xs-by-Paco-Rabanne": (399.0, 499.0, 100, "edt", "Black XS", "بلاك اكس اس"),
    "Mont-Blanc-Explorer": (293.71, 367.0, 100, "edp", "Explorer", "اكسبلولر"),
    "Mont-Blanc-Emblem-Absolu": (273.86, 342.0, 100, "edt", "Emblem Absolu", "امبلم ابسولو"),
    "Mont-Blanc-Emblem-Intense": (327.44, 409.0, 100, "edt", "Emblem Intense", "امبلم انتنس"),
    "Mont-Blanc-Emblem": (258.98, 324.0, 100, "edt", "Emblem", "امبلم"),
    "Mont-Blanc-Starwalker": (258.98, 324.0, 75, "edt", "Starwalker", "ستارووكر"),
    "Dior-Sauvage-Eau-de-Parfum": (607.26, 759.0, 100, "edp", "Sauvage Eau de Parfum", "سوفاج او دو بيرفيوم"),
    "Dior-Sauvage-Parfum": (675.73, 845.0, 100, "parfum", "Sauvage Parfum", "سوفاج بيرفيوم"),
    "Sauvage": (539.78, 675.0, 100, "edt", "Sauvage Eau de Toilette", "سوفاج تواليت"),
    "Dior-Homme-Parfum": (689.0, 861.0, 100, "parfum", "Homme Parfum", "هوم بيرفيوم"),
    "Dior-Homme-Instense": (579.0, 724.0, 100, "edp", "Homme Intense", "هوم انتنس"),
    "Dior-Homme": (499.0, 624.0, 100, "edt", "Homme", "هوم"),
    "Dior-Fahrenheit": (489.0, 611.0, 100, "edt", "Fahrenheit", "فهرنهايت"),
    "Tom-Ford-Grey-Vetiver": (1200.62, 1501.0, 100, "edp", "Grey Vetiver", "جراي فيتيفير"),
    "Black-Orchid-Gold": (922.79, 1153.0, 100, "edp", "Black Orchid Gold", "بلاك اوركيد جولد"),
    "Tom-Ford-Noir": (769.0, 961.0, 100, "edp", "Noir", "نوار"),
    "Tom-Ford-Ombre-Leather": (788.84, 986.0, 100, "edp", "Ombre Leather", "عنبر ليذر"),
    "Chanel-Allure-Sport": (583.44, 729.0, 100, "edt", "Allure Homme Sport", "الور سبورت"),
    "Chanel-Allure-Homme": (567.57, 709.0, 100, "edt", "Allure Homme", "الور هوم"),
    "Chanel-Bleu-De-For": (684.65, 856.0, 100, "edp", "Bleu de Chanel Eau de Parfum", "بلو دي بيرفيوم"),
    "Chanel-Bleu-De-toi": (567.57, 709.0, 100, "edt", "Bleu de Chanel Eau de Toilette", "بلو دي تواليت"),
    "Chanel-Platinum-Egoiste": (583.44, 729.0, 100, "edt", "Égoïste Platinum", "بلاتنيوم ايجوست"),
    "ARMANI-CODE": (389.96, 487.0, 75, "edt", "Code", "كود"),
    "Acqua-Di-Gio": (429.0, 536.0, 100, "edt", "Acqua di Gio", "اكوا دي جيو"),
    "Stronger-With-You": (419.0, 524.0, 100, "edt", "Emporio Armani Stronger With You", "سترونجر ويذ يو"),
    "Stronger-With-You-Intensely": (459.0, 574.0, 100, "edp", "Stronger With You Intensely", "سترونجر ويذ يو انتنسلي"),
    "bvlgari-extreme": (476.28, 595.0, 100, "edt", "Pour Homme Extreme", "بور هوم اكستريم"),
    "Bvlgari-Pour-Homme-Soir": (499.11, 624.0, 100, "edt", "Pour Homme Soir", "بور هوم سوير"),
    "Bvlgari-Man-In-Black": (441.56, 552.0, 100, "edp", "Man In Black", "مان ان بلاك"),
    "Bvlgari-Man-Extreme": (407.82, 510.0, 100, "edt", "Man Extreme", "مان اكستريم"),
    "Lancome-Tresor-Midnight-Rose": (658.16, 823.0, 75, "edp", "Trésor Midnight Rose", "تريسور ميدنايت روز"),
    "Lancome-Mille-Une-Roses": (957.78, 1197.0, 75, "edp", "Mille & Une Roses", "ميلي اند اون روز"),
    "Lancome-Idole": (578.59, 723.0, 75, "edp", "Idôle", "ايدول"),
    "La-vie-est-belle-LANCOME": (589.0, 736.0, 75, "edp", "La Vie Est Belle", "لا في ايست بيل"),
    "Lancome-Tresor": (549.0, 686.0, 100, "edp", "Trésor", "تريزور"),
    "Lancome-TRESOR-IN-LOVE": (529.0, 661.0, 75, "edp", "Trésor In Love", "تريزور ان لوف"),
    "Lancome_Miracle": (519.0, 649.0, 100, "edp", "Miracle", "ميراكيل"),
    "Lancome-Pmeoe": (644.42, 805.0, 100, "edp", "Poême", "بويم"),
    "Yves-Saint-Laurent-La-Nuit-De-LHomme-Intense": (519.0, 649.0, 100, "edp", "La Nuit de L'Homme Intense", "لانويت انتنس دي لي هوم"),
    "Yves-Saint-Laurent-Body-Kouros": (489.0, 611.0, 100, "edt", "Body Kouros", "بودي كوروس"),
    "YVES-SAINT-LAURENT-Y-LE-PARFUM": (629.0, 786.0, 100, "parfum", "Y Le Parfum", "واي لو بارفان"),
    "euphoria": (349.0, 436.0, 100, "edt", "Euphoria Men", "يوفوريا للرجال"),
    "EUPHORIA-MAN-INTENSE": (369.0, 461.0, 100, "edt", "Euphoria Men Intense", "إنتنس يوفوريا للرجال"),
    "Calvin-Klein-Ck-One-Shock": (289.0, 361.0, 200, "edt", "CK One Shock for Him", "سي كي وان شوك"),
    "Calvin-Klein-Eternity": (359.0, 449.0, 100, "edp", "Eternity for Women", "اترنتي للنساء"),
    "Calvin-Klein-Euphoria": (379.0, 474.0, 100, "edp", "Euphoria for Women", "ايفوريا للنساء"),
    "Calvin-Klein-Beauty": (369.0, 461.0, 100, "edp", "Beauty", "بيوتي"),
    "Boss-Bottled": (399.0, 499.0, 100, "edt", "Bottled", "بوتلد"),
    "Hugo-Man": (329.0, 411.0, 125, "edt", "Hugo Man", "هيوجو مان"),
    "Cartier-Pasha": (459.0, 574.0, 100, "edt", "Pasha", "باشا"),
    "Luna-Rossa-Carbon": (489.0, 611.0, 100, "edt", "Luna Rossa Carbon", "لونا روسا كاربون"),
    "Chopard-Black-Incense-Malaki": (419.0, 524.0, 80, "edp", "Black Incense Malaki", "بلاك اينسنس ملكي"),
    "Chopard-Rose-Malaki": (419.0, 524.0, 80, "edp", "Rose Malaki", "روز ملكي"),
    "Chopard-Oud-Malaki": (429.0, 536.0, 80, "edp", "Oud Malaki", "عود ملكي"),
    "Chopard-Amber-Malaki": (419.0, 524.0, 80, "edp", "Amber Malaki", "عنبر ملكي"),
}

CONC_AR = {"edt": "تواليت", "edp": "بيرفيوم", "parfum": "بيرفيوم", "cologne": "كولون"}
CONC_EN = {"edt": "Eau de Toilette", "edp": "Eau de Parfum", "parfum": "Parfum", "cologne": "Cologne"}
GENDER_AR = {"men": "رجالي", "women": "نسائي"}

TIER_PRICE = {
    "tom-ford": (780, 100),
    "chanel": (580, 100),
    "dior": (540, 100),
    "hermes": (620, 100),
    "ysl": (520, 100),
    "guerlain": (540, 100),
    "mancera": (490, 100),
    "montale": (470, 100),
    "prada": (480, 100),
    "cartier": (470, 100),
    "bvlgari": (430, 100),
    "givenchy": (420, 100),
    "lancome": (540, 75),
    "chopard": (420, 80),
}


def is_original(name: str) -> bool:
    if SIZE_RE.search(name) or any(b in name for b in SKIP_BITS):
        return False
    return True


def detect_brand(stem: str) -> str:
    for prefix, brand in BRAND_PREFIXES:
        if stem == prefix or stem.startswith(prefix + "-") or stem.startswith(prefix + "_"):
            return brand
    return "other"


def pretty_en(stem: str) -> str:
    s = stem.replace("_", "-")
    s = re.sub(r"-(bottle|full)$", "", s, flags=re.I)
    s = s.replace("-toi", "").replace("-per", "")
    return s.replace("-", " ").replace(".", " ").strip()


def slugify(stem: str) -> str:
    s = re.sub(r"-(bottle|full)$", "", stem, flags=re.I)
    s = s.replace("_", "-").replace(".", "").lower()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-{2,}", "-", s).strip("-")


def copy_file(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if not dest.exists():
        shutil.copy2(src, dest)


def main() -> None:
    for sub in ("products", "brands", "banners", "ui", "logo"):
        (PUBLIC / sub).mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)

    originals: list[Path] = []
    for p in WP_UPLOADS.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".svg"} and is_original(p.name):
            originals.append(p)

    product_files: dict[str, dict[str, Path]] = {}
    for p in originals:
        stem = p.stem
        kind = None
        base = stem
        if stem.lower().endswith("-bottle") or stem.lower().endswith("_bottle"):
            kind = "bottle"
            base = re.sub(r"[_-]bottle$", "", stem, flags=re.I)
        elif stem.lower().endswith("-full") or stem.lower().endswith("_full"):
            kind = "full"
            base = re.sub(r"[_-]full$", "", stem, flags=re.I)

        name_l = p.name.lower()
        if p.parent.name == "11" and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            if name_l.startswith("ad") or name_l.startswith("sw-"):
                copy_file(p, PUBLIC / "banners" / p.name)
            else:
                copy_file(p, PUBLIC / "brands" / p.name)
            continue
        if p.suffix.lower() == ".svg" or "mada" in name_l or "original" in name_l or "shipping" in name_l or "achievement" in name_l or "hand-money" in name_l:
            copy_file(p, PUBLIC / "ui" / p.name)
            continue
        if name_l.startswith("scents-wave-final") or name_l.startswith("favican") or name_l.startswith("cropped-favican"):
            copy_file(p, PUBLIC / "banners" / p.name)
            continue
        if "top-shipping" in name_l:
            copy_file(p, PUBLIC / "banners" / p.name)
            continue

        if kind:
            dest_name = f"{base}{p.suffix.lower()}"
            dest_name = dest_name.replace(" ", "-")
            copy_file(p, PUBLIC / "products" / f"{kind}-{dest_name}")
            product_files.setdefault(base, {})[kind] = Path(f"/images/products/{kind}-{dest_name}")

    # logos
    for src_name, dest_name in [
        ("scents_wave_logo_final_png.png", "logo.png"),
        ("ScentsWave1.png", "logo-dark.png"),
        ("ScentsWave2.png", "logo-alt.png"),
    ]:
        src = LOGO_DIR / src_name
        if src.exists():
            copy_file(src, PUBLIC / "logo" / dest_name)

    fav = WP_UPLOADS / "2024/03/cropped-favican1.png"
    if fav.exists():
        copy_file(fav, DEST / "public" / "favicon.png")
        copy_file(fav, PUBLIC / "logo" / "favicon.png")

    products = []
    for base, files in sorted(product_files.items()):
        brand_id = detect_brand(base)
        brand = BRANDS.get(brand_id, {"slug": "other", "nameAr": "ماركات", "nameEn": "Other", "logo": None})
        gender = "women" if base in WOMEN else "men"
        known = KNOWN.get(base)
        if known:
            price, compare, size, conc, name_en, name_ar = known
        else:
            tier = TIER_PRICE.get(brand_id, (349, 100))
            price, size = float(tier[0]), tier[1]
            compare = round(price / 0.8, 2)
            conc = "edp" if gender == "women" else "edt"
            name_en = pretty_en(base)
            name_ar = name_en
        slug = slugify(base)
        images = []
        if "bottle" in files:
            images.append(str(files["bottle"]))
        if "full" in files:
            images.append(str(files["full"]))
        if not images:
            continue
        sale = round((1 - price / compare) * 100) if compare and compare > price else 0
        desc_ar = (
            f"عطر {GENDER_AR[gender]} من {brand['nameAr']} — {name_ar}. "
            f"{CONC_AR[conc]} {size} مل. أصلي 100٪ مع شحن داخل المملكة."
        )
        desc_en = (
            f"{brand['nameEn']} {name_en} {CONC_EN[conc]} {size}ml. "
            f"100% original, shipped across Saudi Arabia."
        )
        products.append(
            {
                "slug": slug,
                "stem": base,
                "nameAr": f"{name_ar} {brand['nameAr']} {GENDER_AR[gender]} {CONC_AR[conc]} {size} مل",
                "nameEn": f"{brand['nameEn']} {name_en} {CONC_EN[conc]} {size}ml",
                "shortAr": name_ar,
                "shortEn": name_en,
                "brand": brand_id,
                "gender": gender,
                "sizeMl": size,
                "concentration": conc,
                "price": round(price, 2),
                "compareAtPrice": round(compare, 2),
                "salePercent": sale,
                "featured": base in FEATURED,
                "inStock": True,
                "images": images,
                "descriptionAr": desc_ar,
                "descriptionEn": desc_en,
            }
        )

    brands_out = []
    for b in BRANDS.values():
        logo = f"/images/brands/{b['logo']}" if b["logo"] else None
        count = sum(1 for p in products if p["brand"] == b["slug"])
        if count:
            brands_out.append({**b, "logo": logo, "count": count})

    DATA.joinpath("products.json").write_text(
        json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    DATA.joinpath("brands.json").write_text(
        json.dumps(brands_out, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    n_prod_img = len(list((PUBLIC / "products").glob("*")))
    n_brand = len(list((PUBLIC / "brands").glob("*")))
    n_ban = len(list((PUBLIC / "banners").glob("*")))
    print(f"products={len(products)} product_images={n_prod_img} brands={n_brand} banners={n_ban}")
    print(f"men={sum(1 for p in products if p['gender']=='men')} women={sum(1 for p in products if p['gender']=='women')}")


if __name__ == "__main__":
    main()
