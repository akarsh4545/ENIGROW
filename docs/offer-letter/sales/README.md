# Sales employee offer letter

This is the frozen 2-page offer letter for **sales / BDM** hires. Layout, clauses, CTC, and styling stay in the generator. For each new person, change details only.

Edit `candidate.json`:

```json
{
  "employee_name": "Saurabh Srivastava",
  "letter_date": "16 August 2026",
  "joining_date": "17 August 2026"
}
```

Then generate:

```bash
cd docs/offer-letter/sales
../.venv/bin/python3 generate_offer_letter.py
```

The PDF is written to `output/` and copied to Downloads. Joining dates such as `17 August 2026` become **17th** automatically.

Do not edit `generate_offer_letter.py` for a normal hire. Optional keys only if this offer is not the standard sales letter: `designation`, `location`, `working_days`, `working_hours`, `monthly_ctc`, `company_name`.
