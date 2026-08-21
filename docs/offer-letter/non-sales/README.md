# Non-sales offer letter

Frozen 2-page letter for **non-sales** roles (software, operations, and similar). Same look as the sales letter, but sections 3 and 4 have no sales/revenue incentive.

Edit `candidate.json` for each hire:

```json
{
  "employee_name": "Om Prakash Bhardwaj",
  "designation": "Operation Manager",
  "letter_date": "18 August 2026",
  "joining_date": "19 August 2026",
  "monthly_ctc": 35000
}
```

Then generate:

```bash
cd docs/offer-letter/non-sales
../.venv/bin/python3 generate_offer_letter.py
```

The PDF is written to `output/` and copied to Downloads. Always set `designation` and `monthly_ctc` — those change by role.
