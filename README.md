# Mini: The Minimal Language

DEMO: https://chadams.github.io/mini-lang/

/mini-lang is an open source web application for learning languages. With the first language being Mini.

> Mini is an attempt to create the simplest naturalistic language for human communication conceived by S.C. Gruget in 2020. For more information https://minilanguage.com/

The goal is to make something on par with Duolingo but with the following features.

- webapp first
- no login required.
- easy to make new courses
- support "direct method" learning

---

## Roadmap

- [x] Basic App Structure
- [x] Course guides
- [x] Live translate
- [x] Utilities for importing excel files :tada:
- [x] Audio Translations
- [x] mini/en - Dictionary
- [x] mini/en - Random Word Exercise

##### In progress

- [ ] Lessons path
- [ ] Course Mini -Phrases

##### Upcoming

- [ ] Course Mini Kore
- [ ] Course Mini Mundo
- [ ] Course Mini Mundo - Direct Method

---

## How to help

lessons are stored in the `/public/units/<unit-name>/lesson-plan.json` and `lessons` folder.

Each **Lesson Plan** has the following scheme

```
{
  "id": "mini-kore",
  "title": "Mini Kore",
  "lang": "en",
  "lessons": [
    {
      "id": "basics-1-1", // id of lesson, points to json in lessons folder
      "title": "Basics",
      "pic": "https://openmoji.org/data/color/svg/1F64B.svg"
    },
    ...
  ]
}
```

Each **Lesson** has an `id` in the lesson plan that points to a file in `lessons` folder. `Ex. ./lessons/basics-1-1.json`

```
{
  "title": "lesson one",
  "guide": "units/mini-kore/lessons/1-1.md", // text for this lesson's guide as markdown
  "words": "units/mini-kore/words-mini-mundo.json", // dictionary for dynamic on-hover translations
  "cards": [
    { "tra": "<translation here>", "txt": "<text to show>", "pic": "<picture url>" },
    { "tra": "Hello", "txt": "Salu!", "pic": "https://openmoji.org/data/color/svg/1F64B.svg" }, // example
    ...
```

work in progress...
