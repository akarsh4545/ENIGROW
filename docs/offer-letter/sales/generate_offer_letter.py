#!/usr/bin/env python3
"""Sales employee (BDM) 2-page ENIGROW offer letter.

Edit candidate.json only. Layout, clauses, CTC, and styling are frozen here
so every sales OL looks the same except for the candidate fields.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path

from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

DIR = Path(__file__).resolve().parent
ASSETS = DIR.parent
FONT_DIR = Path("/System/Library/Fonts/Supplemental")
LOGO = ASSETS / "enigrow-logo-transparent.png"
WATERMARK = ASSETS / "enigrow-watermark-soft.png"
CANDIDATE_FILE = DIR / "candidate.json"
OUTPUT_DIR = DIR / "output"

DEFAULTS = {
    "designation": "Business Development Manager (Sales)",
    "location": "Noida",
    "working_days": "Monday to Saturday",
    "working_hours": "09:30 AM to 06:30 PM",
    "monthly_ctc": 40000,
    "company_name": "ENIGROW PRIVATE LIMITED",
    "incentive_percent": 35,
    "target_multiple": 4,
    "offer_valid_days": 2,
    "notice_days": 7,
    "leaves_per_month": 1.5,
    "leaves_annual": 18,
}

INK = HexColor("#1f1f1f")
MUTED = HexColor("#222222")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("TNR", str(FONT_DIR / "Times New Roman.ttf")))
    pdfmetrics.registerFont(TTFont("TNR-Bold", str(FONT_DIR / "Times New Roman Bold.ttf")))
    pdfmetrics.registerFont(TTFont("TNR-Italic", str(FONT_DIR / "Times New Roman Italic.ttf")))
    rupee_font = Path("/System/Library/Fonts/SFNS.ttf")
    if rupee_font.exists():
        pdfmetrics.registerFont(TTFont("Rupee", str(rupee_font)))


def indian_comma(n: int) -> str:
    s = str(int(n))
    if len(s) <= 3:
        return s
    last3, rest = s[-3:], s[:-3]
    parts: list[str] = []
    while rest:
        parts.append(rest[-2:])
        rest = rest[:-2]
    return ",".join(list(reversed(parts)) + [last3])


def inr(n: int) -> str:
    amount = indian_comma(n)
    if "Rupee" in pdfmetrics.getRegisteredFontNames():
        return f'<font name="Rupee">₹</font>{amount}'
    return f"Rs. {amount}"


def ordinal(n: int) -> str:
    if 10 <= n % 100 <= 20:
        suf = "th"
    else:
        suf = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}<super>{suf}</super>"


def joining_html(joining_date: str) -> str:
    m = re.match(r"^\s*(\d+)\s+(.+?)\s*$", joining_date.strip())
    if not m:
        return joining_date
    return f"{ordinal(int(m.group(1)))} {m.group(2)}"


def load_candidate(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    missing = [k for k in ("employee_name", "letter_date", "joining_date") if not str(data.get(k, "")).strip()]
    if missing:
        raise SystemExit(f"candidate.json is missing: {', '.join(missing)}")
    out = dict(DEFAULTS)
    out.update({k: v for k, v in data.items() if v not in (None, "")})
    monthly = int(out["monthly_ctc"])
    out["monthly_ctc"] = monthly
    out["annual_ctc"] = monthly * 12
    out["monthly_target"] = monthly * int(out["target_multiple"])
    return out


def styles() -> dict[str, ParagraphStyle]:
    return {
        "title": ParagraphStyle(
            "title",
            fontName="TNR-Bold",
            fontSize=17,
            leading=20,
            alignment=TA_CENTER,
            textColor=black,
            spaceAfter=1,
        ),
        "date": ParagraphStyle(
            "date",
            fontName="TNR",
            fontSize=10,
            leading=12,
            alignment=TA_RIGHT,
            textColor=INK,
        ),
        "body": ParagraphStyle(
            "body",
            fontName="TNR",
            fontSize=10,
            leading=13.2,
            alignment=TA_JUSTIFY,
            textColor=INK,
            spaceAfter=6,
        ),
        "section": ParagraphStyle(
            "section",
            fontName="TNR-Bold",
            fontSize=11,
            leading=14,
            textColor=black,
            spaceBefore=5.5,
            spaceAfter=2.5,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName="TNR",
            fontSize=10,
            leading=13.0,
            alignment=TA_JUSTIFY,
            textColor=INK,
            leftIndent=14,
            bulletIndent=2,
            spaceAfter=2.4,
        ),
        "label": ParagraphStyle(
            "label",
            fontName="TNR-Bold",
            fontSize=10,
            leading=13,
            textColor=INK,
        ),
        "value": ParagraphStyle(
            "value",
            fontName="TNR",
            fontSize=10,
            leading=13,
            textColor=INK,
        ),
        "colon": ParagraphStyle(
            "colon",
            fontName="TNR",
            fontSize=10,
            leading=13,
            alignment=TA_CENTER,
            textColor=INK,
        ),
        "ack": ParagraphStyle(
            "ack",
            fontName="TNR",
            fontSize=10.5,
            leading=14.2,
            alignment=TA_JUSTIFY,
            textColor=INK,
            spaceBefore=2,
            spaceAfter=10,
        ),
        "sign_lbl": ParagraphStyle(
            "sign_lbl",
            fontName="TNR",
            fontSize=10.5,
            leading=14,
            textColor=INK,
        ),
        "sign_head": ParagraphStyle(
            "sign_head",
            fontName="TNR-Bold",
            fontSize=9.5,
            leading=12,
            alignment=TA_CENTER,
            textColor=INK,
        ),
        "footer": ParagraphStyle(
            "footer",
            fontName="TNR",
            fontSize=9.5,
            leading=12,
            alignment=TA_RIGHT,
            textColor=MUTED,
        ),
    }


def detail_table(rows: list[tuple[str, str]], S: dict) -> Table:
    data = [
        [
            Paragraph(label, S["label"]),
            Paragraph(":", S["colon"]),
            Paragraph(value, S["value"]),
        ]
        for label, value in rows
    ]
    t = Table(data, colWidths=[48 * mm, 7 * mm, 113 * mm], hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 1.2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2),
                ("LEFTPADDING", (1, 0), (1, -1), 0),
            ]
        )
    )
    return t


def bullet(text: str, S: dict) -> Paragraph:
    return Paragraph(f"•  {text}", S["bullet"])


def draw_border(c, doc) -> None:
    c.saveState()
    c.setStrokeColor(HexColor("#191919"))
    c.setLineWidth(1.15)
    inset = 8 * mm
    c.rect(inset, inset, A4[0] - 2 * inset, A4[1] - 2 * inset)
    c.restoreState()


def draw_page1(c, doc) -> None:
    draw_border(c, doc)
    c.saveState()
    c.setFillColor(HexColor("#1a1a1a"))
    c.setFont("TNR", 9.5)
    c.drawRightString(A4[0] - 16 * mm, 11.5 * mm, "Page 1 of 2")
    c.restoreState()


def draw_page2(c, doc) -> None:
    draw_border(c, doc)
    if WATERMARK.exists():
        c.saveState()
        w, h = 95 * mm, 63 * mm
        c.drawImage(
            str(WATERMARK),
            (A4[0] - w) / 2,
            (A4[1] - h) / 2 - 8 * mm,
            width=w,
            height=h,
            mask="auto",
            preserveAspectRatio=True,
        )
        c.restoreState()
    c.saveState()
    c.setFillColor(HexColor("#1a1a1a"))
    c.setFont("TNR", 9.5)
    c.drawRightString(A4[0] - 16 * mm, 11.5 * mm, "Page 2")
    c.restoreState()


def build_story(c: dict, S: dict) -> list:
    name = c["employee_name"]
    company = c["company_name"]
    monthly = int(c["monthly_ctc"])
    annual = int(c["annual_ctc"])
    target = int(c["monthly_target"])
    extra = 40000
    example_rev = target + extra
    example_inc = int(round(extra * int(c["incentive_percent"]) / 100))
    join = joining_html(c["joining_date"])

    logo = Image(str(LOGO), width=34 * mm, height=22.5 * mm)
    logo.hAlign = "CENTER"

    date_tbl = Table(
        [[Paragraph(f"Date: {c['letter_date']}", S["date"])]],
        colWidths=[168 * mm],
    )
    date_tbl.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "RIGHT")]))

    story: list = [
        logo,
        Spacer(1, 1.5 * mm),
        Paragraph("OFFER LETTER", S["title"]),
        date_tbl,
        Spacer(1, 2.5 * mm),
        Paragraph(f"Dear {name},", S["body"]),
        Paragraph(
            f"We are pleased to offer you the position of {c['designation']} with {company}. "
            f"We look forward to your contribution towards the growth and success of our organization.",
            S["body"],
        ),
        Paragraph("1. Employment Details", S["section"]),
        detail_table(
            [
                ("Designation", c["designation"]),
                ("Location", c["location"]),
                ("Working Days", c["working_days"]),
                ("Working Hours", c["working_hours"]),
                ("Date of Joining", join),
            ],
            S,
        ),
        Paragraph("2. Compensation", S["section"]),
        detail_table(
            [
                ("Annual CTC", inr(annual)),
                ("Monthly CTC", inr(monthly)),
                ("Approx. Net Take-Home", f"{inr(monthly)} per month*"),
                (
                    "PF",
                    "No deduction at present; PF may be deducted in the future in accordance with "
                    "company policy and applicable statutory requirements.",
                ),
            ],
            S,
        ),
        Spacer(1, 1 * mm),
        bullet(
            "Salary shall be paid monthly, subject to applicable statutory deductions.",
            S,
        ),
        Paragraph("3. Employment Status &amp; Performance Expectations", S["section"]),
        bullet(
            "No probation period shall apply. Your employment will be effective from your date of joining "
            "and will be governed by the terms of this letter and applicable company policies.",
            S,
        ),
        bullet(
            f"The monthly performance target shall be revenue equivalent to {c['target_multiple']}x the monthly salary. "
            f"Based on the current monthly CTC of {inr(monthly)}, the indicative monthly target is {inr(target)}.",
            S,
        ),
        bullet(
            "Performance may be reviewed periodically based on business requirements. Where required, the company "
            "may provide coaching, guidance, or performance support.",
            S,
        ),
        bullet(
            "In case of sustained underperformance, the company may place the employee on a Performance "
            "Improvement Plan (PIP) for a defined period, with measurable expectations and regular performance review.",
            S,
        ),
        Paragraph("4. Incentive Structure", S["section"]),
        bullet(
            f"Upon achieving the monthly revenue target of {c['target_multiple']}x the monthly salary, the employee "
            f"shall be eligible for an incentive of {c['incentive_percent']}% of the revenue generated above the "
            f"applicable monthly target.",
            S,
        ),
        bullet(
            f"For example, where the applicable monthly target is {inr(target)} and verified revenue generated is "
            f"{inr(example_rev)}, the incentive would be {c['incentive_percent']}% of {inr(extra)}, i.e. {inr(example_inc)}.",
            S,
        ),
        bullet(
            "Incentive payouts shall be subject to internal verification, realization/confirmation of eligible revenue, "
            "and applicable company policies.",
            S,
        ),
        Paragraph("5. Leave &amp; Attendance", S["section"]),
        bullet(
            f"You will be eligible for {c['leaves_per_month']} paid leaves per month, equivalent to {c['leaves_annual']} "
            f"paid leaves annually, subject to the company's leave policy.",
            S,
        ),
        bullet(
            "Leave should be requested and approved in advance wherever reasonably practicable, except in genuine emergencies.",
            S,
        ),
        bullet(
            "Unauthorized absence without prior intimation for 2 consecutive working days may be treated as a serious "
            "attendance issue and may result in appropriate disciplinary action in accordance with company policy.",
            S,
        ),
        NextPageTemplate("page2"),
        PageBreak(),
        bullet(
            "Unauthorized absence or absence without communication for a period exceeding two consecutive months may "
            "result in the employee being placed under suspension of employment and may be subject to further "
            "disciplinary action in accordance with company policy and applicable law.",
            S,
        ),
        Paragraph("6. Confidentiality &amp; Professional Conduct", S["section"]),
        bullet(
            "You are expected to maintain confidentiality of all company, client, and business-related information.",
            S,
        ),
        bullet(
            "Employees are required to adhere to company policies, professional ethics, and workplace standards at all times.",
            S,
        ),
        bullet(
            "The employee shall maintain strict confidentiality regarding company information, client information, leads, "
            "pricing, business strategies, financial information, databases, documents, processes, and other proprietary information.",
            S,
        ),
        bullet(
            "Such information shall not be disclosed, copied, shared, or used for purposes unrelated to the employee's "
            "duties without prior authorization from the company.",
            S,
        ),
        Paragraph("7. Notice Period", S["section"]),
        bullet(
            f"Either party may terminate the employment by providing {c['notice_days']} days' written notice or salary "
            f"in lieu thereof, subject to applicable law and company policy.",
            S,
        ),
        bullet(
            "Employees are expected to complete a proper handover of responsibilities and company assets before separation.",
            S,
        ),
        Paragraph("8. Full &amp; Final Settlement", S["section"]),
        bullet(
            "Full &amp; Final Settlement shall be processed in accordance with company policy and applicable laws.",
            S,
        ),
        bullet(
            "Any outstanding dues, advances, recoveries, or company assets shall be adjusted before settlement, wherever applicable.",
            S,
        ),
        Paragraph("9. Company Property &amp; Assets", S["section"]),
        bullet(
            f"Any company-provided documents, equipment, devices, credentials, databases, records, or other assets shall "
            f"remain the property of {company}.",
            S,
        ),
        bullet(
            "All company property and assets must be used responsibly, protected from unauthorized access, and returned "
            "to the company upon separation from employment or whenever requested by the company.",
            S,
        ),
        Paragraph("10. Conflict of Interest", S["section"]),
        bullet(
            "The employee shall disclose any actual or potential conflict of interest that may affect their responsibilities "
            "or relationship with the company.",
            S,
        ),
        bullet(
            "The employee shall not engage in activities that materially conflict with the interests of the company during "
            "employment without prior approval from the company.",
            S,
        ),
        Paragraph("11. Acceptance of Offer", S["section"]),
        bullet(
            f"This offer shall remain valid for {c['offer_valid_days']} working days from the date of issue.",
            S,
        ),
        bullet(
            "Kindly sign and return a copy of this letter as a token of your acceptance.",
            S,
        ),
        bullet(
            f"We are pleased to welcome you to {company} and wish you a successful and rewarding journey with us.",
            S,
        ),
        Spacer(1, 3 * mm),
        Paragraph("Acceptance &amp; Acknowledgement", S["section"]),
        Paragraph(
            f"I, {name}, hereby accept the offer of employment and agree to abide by the terms and conditions "
            f"stated herein and the policies of the company.",
            S["ack"],
        ),
        Paragraph("Employee Signature: _______________________________", S["sign_lbl"]),
        Spacer(1, 2 * mm),
        Paragraph("Date: ____________________", S["sign_lbl"]),
        Spacer(1, 14 * mm),
        Table(
            [
                [
                    Paragraph("HR MANAGER / AUTHORIZED SIGNATORY", S["sign_head"]),
                    Paragraph("EMPLOYEE SIGNATURE", S["sign_head"]),
                ]
            ],
            colWidths=[84 * mm, 84 * mm],
        ),
    ]
    return story


def generate(candidate_path: Path, out_path: Path) -> Path:
    register_fonts()
    c = load_candidate(candidate_path)
    S = styles()
    OUTPUT_DIR.mkdir(exist_ok=True)

    margin = 14 * mm
    doc = BaseDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=12 * mm,
        bottomMargin=16 * mm,
        title=f"Offer Letter — {c['employee_name']}",
        author="ENIGROW PRIVATE LIMITED",
    )
    frame1 = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="p1", showBoundary=0)
    frame2 = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="p2", showBoundary=0)
    doc.addPageTemplates(
        [
            PageTemplate(id="page1", frames=frame1, onPage=draw_page1),
            PageTemplate(id="page2", frames=frame2, onPage=draw_page2),
        ]
    )
    doc.build(build_story(c, S))
    return out_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a sales (BDM) ENIGROW offer letter PDF from candidate.json")
    parser.add_argument("--candidate", type=Path, default=CANDIDATE_FILE)
    parser.add_argument("--out", type=Path, default=None)
    parser.add_argument("--no-downloads", action="store_true", help="Do not copy the PDF to ~/Downloads")
    args = parser.parse_args()

    candidate = load_candidate(args.candidate)
    slug = re.sub(r"[^A-Za-z0-9]+", "_", candidate["employee_name"]).strip("_")
    out = args.out or (OUTPUT_DIR / f"ENIGROW_Offer_Letter_{slug}.pdf")
    out.parent.mkdir(parents=True, exist_ok=True)
    generate(args.candidate, out)

    downloads = Path.home() / "Downloads" / out.name
    if not args.no_downloads:
        shutil.copy2(out, downloads)
        print(f"Wrote {out}")
        print(f"Copied {downloads}")
    else:
        print(f"Wrote {out}")


if __name__ == "__main__":
    main()
