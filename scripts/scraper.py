#!/usr/bin/env python3
"""
Phone Scraper Script - Fetches phone data from GSMArena and stores in Supabase
Checks for duplicates before inserting to avoid data duplication
"""

import os
import json
import sys
from datetime import datetime
from typing import Optional, Dict, Any
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client

# Configuration
GSMARENA_BASE_URL = "https://www.gsmarena.com"
GSMARENA_PHONES_URL = f"{GSMARENA_BASE_URL}/phones.php"

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


def get_phone_details(phone_url: str) -> Optional[Dict[str, Any]]:
    """
    Fetch detailed specifications for a phone from its GSMArena page
    """
    try:
        response = requests.get(phone_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        specs = {}

        # Extract processor
        processor_elem = soup.find("td", string="Chipset")
        if processor_elem:
            processor_value = processor_elem.find_next("td")
            if processor_value:
                specs["processor"] = processor_value.get_text(strip=True)

        # Extract display
        display_elem = soup.find("td", string="Display")
        if display_elem:
            display_value = display_elem.find_next("td")
            if display_value:
                specs["display"] = display_value.get_text(strip=True)

        # Extract camera
        camera_elem = soup.find("td", string="Main Camera")
        if camera_elem:
            camera_value = camera_elem.find_next("td")
            if camera_value:
                specs["camera"] = camera_value.get_text(strip=True)

        # Extract battery
        battery_elem = soup.find("td", string="Battery")
        if battery_elem:
            battery_value = battery_elem.find_next("td")
            if battery_value:
                specs["battery"] = battery_value.get_text(strip=True)

        return specs if specs else None

    except Exception as e:
        print(f"Error fetching phone details from {phone_url}: {str(e)}")
        return None


def fetch_phones_list(limit: int = 50) -> list:
    """
    Fetch list of phones from GSMArena
    """
    try:
        response = requests.get(GSMARENA_PHONES_URL, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        phones = []
        phone_rows = soup.find_all("div", class_="makers")

        for idx, row in enumerate(phone_rows[:limit]):
            try:
                # Extract phone link
                link_elem = row.find("a")
                if not link_elem:
                    continue

                phone_url = GSMARENA_BASE_URL + link_elem.get("href", "")
                phone_name = link_elem.get_text(strip=True)

                # Parse brand and model
                parts = phone_name.split(maxsplit=1)
                if len(parts) < 2:
                    continue

                brand = parts[0]
                model = " ".join(parts[1:])

                # Get image
                img_elem = row.find("img")
                image_url = img_elem.get("src", "") if img_elem else ""

                phones.append({
                    "brand": brand,
                    "model": model,
                    "url": phone_url,
                    "image_url": image_url,
                })

            except Exception as e:
                print(f"Error parsing phone row: {str(e)}")
                continue

        return phones

    except Exception as e:
        print(f"Error fetching phones list: {str(e)}")
        return []


def phone_exists(brand: str, model: str) -> bool:
    """
    Check if a phone already exists in the database
    """
    try:
        response = supabase.table("phones").select("id").eq("brand", brand).eq("model", model).execute()
        return len(response.data) > 0
    except Exception as e:
        print(f"Error checking phone existence: {str(e)}")
        return False


def insert_phone(brand: str, model: str, specs: Dict[str, Any], image_url: Optional[str] = None) -> bool:
    """
    Insert a phone into the database
    """
    try:
        data = {
            "brand": brand,
            "model": model,
            "specs": json.dumps(specs),
            "image_url": image_url,
            "created_at": datetime.utcnow().isoformat(),
        }

        response = supabase.table("phones").insert(data).execute()
        return len(response.data) > 0

    except Exception as e:
        print(f"Error inserting phone: {str(e)}")
        return False


def main():
    """
    Main scraper function
    """
    print("Starting phone scraper...")
    print(f"Supabase URL: {SUPABASE_URL}")

    # Fetch phones list
    print("Fetching phones list from GSMArena...")
    phones = fetch_phones_list(limit=50)
    print(f"Found {len(phones)} phones")

    added_count = 0
    skipped_count = 0
    error_count = 0

    for phone in phones:
        try:
            brand = phone["brand"]
            model = phone["model"]
            url = phone["url"]
            image_url = phone["image_url"]

            # Check if phone already exists
            if phone_exists(brand, model):
                print(f"Skipping {brand} {model} - already exists")
                skipped_count += 1
                continue

            # Fetch detailed specs
            print(f"Fetching details for {brand} {model}...")
            specs = get_phone_details(url)

            if specs:
                # Insert into database
                if insert_phone(brand, model, specs, image_url):
                    print(f"Added {brand} {model}")
                    added_count += 1
                else:
                    print(f"Failed to add {brand} {model}")
                    error_count += 1
            else:
                print(f"Could not fetch specs for {brand} {model}")
                error_count += 1

        except Exception as e:
            print(f"Error processing phone: {str(e)}")
            error_count += 1

    # Summary
    print("\n" + "="*50)
    print("Scraper Summary:")
    print(f"Added: {added_count}")
    print(f"Skipped: {skipped_count}")
    print(f"Errors: {error_count}")
    print("="*50)

    return added_count > 0


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
