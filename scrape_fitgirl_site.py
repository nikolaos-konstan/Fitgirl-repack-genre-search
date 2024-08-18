import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://fitgirl-repacks.site"
PAGE_URL_FORMAT = BASE_URL + "/page/{}/"


def extract_genres_tags(entry_content):
    genres_tags = "No Genres/Tags"
    found_genres = False
    for tag in entry_content.find_all(["p", "strong"]):
        if found_genres and tag.name == "strong":
            return tag.get_text(strip=True)
        if "Genres/Tags:" in tag.get_text():
            found_genres = True
    return genres_tags


def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article")
    data = []

    for article in articles:
        article_data = {}
        article_data["id"] = article.get("id", "No ID")

        entry_content = article.find("div", class_="entry-content")

        if entry_content:
            genres_tags = extract_genres_tags(entry_content)
            if genres_tags != "No Genres/Tags":
                article_data["genres_tags"] = genres_tags
            else:
                continue
        else:
            continue

        title_element = article.find("h1", class_="entry-title")
        if title_element:
            link_element = title_element.find("a")
            if link_element:
                article_data["link"] = link_element.get("href", "No Link")
            else:
                article_data["link"] = "No Link"

            article_data["title"] = title_element.get_text(strip=True)
        else:
            continue

        img_element = article.find("img")
        if img_element:
            article_data["image"] = img_element.get("src", "No Image")
        else:
            article_data["image"] = "No Image"

        time_element = article.find("time")
        if time_element:
            article_data["datetime"] = time_element.get("datetime", "No Datetime")
        else:
            article_data["datetime"] = "No Datetime"

        data.append(article_data)

    return data


def scrape_all_pages(start_page, end_page):
    all_data = []

    first_page_url = BASE_URL
    print(f"Scraping page: 1")
    first_page_data = scrape_page(first_page_url)
    if first_page_data:
        all_data.extend(first_page_data)

    for page_num in range(2, end_page + 1):
        url = PAGE_URL_FORMAT.format(page_num)
        print(f"Scraping page: {page_num}")
        page_data = scrape_page(url)
        if page_data:
            all_data.extend(page_data)
        else:
            print(f"No data found on page {page_num}. Exiting.")
            break

    return all_data


def save_to_json(data, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    start_page = 1
    end_page = 499
    all_data = scrape_all_pages(start_page, end_page)
    save_to_json(all_data, "scraped_data.json")
    print(f"Data saved to scraped_data.json")
