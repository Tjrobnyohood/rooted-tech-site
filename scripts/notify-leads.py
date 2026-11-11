#!/usr/bin/env python3
"""Send new consultation rows to the owner's phone.

Telegram uses the bot already configured for OpenClaw.
WhatsApp is sent through the OpenClaw gateway.
The chat id and bot token stay out of the site and out of git.
"""

import json
import re
import subprocess
import urllib.parse
import urllib.request
from pathlib import Path

UUID = re.compile(r"^[0-9a-fA-F-]{36}$")

ROOT = Path("/home/f4x/rooted-tech-site")
OPENCLAW = Path("/home/f4x/.openclaw/openclaw.json")
CHAT_FILE = ROOT / ".telegram-chat"
WA_TARGET = "+15097149513"


def db_json(sql, write=False):
    cmd = [
        "supabase", "db", "query",
        "--workdir", str(ROOT),
        "--remote",
        "--output-format", "json",
        sql,
    ]
    if write:
        cmd.insert(6, "--yes")
    else:
        cmd.insert(6, "--read-only")
    out = subprocess.check_output(cmd, text=True, stderr=subprocess.STDOUT)
    start = out.find("[")
    if start < 0:
        start = out.find("{")
    if start < 0:
        return []
    return json.loads(out[start:])


def telegram_send(text):
    token = json.loads(OPENCLAW.read_text())["channels"]["telegram"]["botToken"]
    chat_id = CHAT_FILE.read_text().strip()
    body = urllib.parse.urlencode({"chat_id": chat_id, "text": text}).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=body,
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        payload = json.load(res)
    if not payload.get("ok"):
        raise RuntimeError("telegram rejected the alert")


def whatsapp_send(text):
    subprocess.run(
        [
            "openclaw", "--log-level", "error", "message", "send",
            "--channel", "whatsapp",
            "--target", WA_TARGET,
            "--message", text,
        ],
        check=True,
        timeout=60,
    )


def main():
    rows = db_json(
        "select id, name, phone, email, interest, reach, county, message "
        "from public.leads where notified_at is null order by created_at asc limit 10;"
    )
    if isinstance(rows, dict):
        rows = [rows]
    for row in rows:
        lead_id = str(row["id"])
        if not UUID.match(lead_id):
            continue
        text = "\n".join([
            "Rooted Tech free consultation",
            f"Name: {row.get('name') or ''}",
            f"Phone: {row.get('phone') or ''}",
            f"Email: {row.get('email') or ''}",
            f"Interest: {row.get('interest') or ''}",
            f"Reach: {row.get('reach') or ''}",
            f"County: {row.get('county') or ''}",
            f"Message: {row.get('message') or ''}",
        ])
        via = []
        try:
            telegram_send(text)
            via.append("telegram")
        except Exception as exc:
            print("telegram", type(exc).__name__)
        try:
            whatsapp_send(text)
            via.append("whatsapp")
        except Exception as exc:
            print("whatsapp", type(exc).__name__)
        if not via:
            continue
        joined = "+".join(via)
        db_json(
            "update public.leads set notified_at = now(), notify_via = "
            + "'" + joined + "' where id = '" + lead_id + "' returning id;",
            write=True,
        )
        print("sent", lead_id[:8], joined)


if __name__ == "__main__":
    main()
