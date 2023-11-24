# CSV2MD ChatGPT Template

---

Please convert this CSV of Bookmarks to a structured markdown file. I will provide you examples and give you directions on how to format and structure. The csv file has 7 columns.

- heading2 = a level 2 header ##
- cover = ![]() an image url 
- title = [Title]
- url = (url)
- excerpt = - description 
- created = Date: 
- tags = Tags: #tags if multiple tags appear add a # in front of each #word

Below is an example of how the csv looks.

heading2	cover	title	url	excerpt	created	tags
airsonic	https://airsonic.github.io/favicon-200x200.png	airsonic	https://airsonic.github.io	Airsonic, a Free and Open Source community driven media server, providing ubiquitous access to your music.	2023-10-26T15:29:09.795Z	#audio

I want you to restructure this to look like the example below:

## Airsonic

![](https://airsonic.github.io/favicon-200x200.png)

- [airsonic](https://airsonic.github.io) - Airsonic, a Free and Open Source community driven media server, providing ubiquitous access to your music.	

**Date:** 2023-10-26T15:29:09.795Z
**Tags:** #audio

---

This Structure is called a block and heres how we do it.

## Heading

{empty line}
![](cover)
{empty line}
- [title](url) - excerpt goes here.
{empty line}
created **Date:** 
tags **Tags:** 
{empty line}
---

Do you understand? If so please format into a markdown file called AudioMarx.md

---
