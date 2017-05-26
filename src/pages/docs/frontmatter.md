---
title: Special Front-matter Definitions
layout: prose
order: 3
---

# {{title}}

All patterns and pages support YAML front-matter. While any arbitrary data can be added and referenced in the local template, there are some special property definitions that affect how things are displayed:

Property | Type | Description
--- | --- | ---
**name** | string | Override the default name for Patterns and Collections.
**order** | number | Override the default sort position for Patterns and Collections.
**hidden** | boolean | Hide a Pattern variation from listings.
**notes** | string | Annotate details about a Pattern variation with Markdown formatting.
**links** | object | Provide a menu of additional documentation links for a Pattern.
**sourceless** | boolean | Prevent the HTML source of a Pattern from being displayed.
**layout** | string | Associate a Layout template to be used for wrapping Page content.

<br>

## Examples

At the top of a pattern or page, include data:

```html
---
order: 1
notes: |
  Useful for making UI elements appear actionable:
  + `<a class="Button" href="#meaningful-href">Link</a>`
  + `<button class="Button" type="button">Button</button>`
  + `<input class="Button" type="submit" value="Input">`
links:
  When To Use The Button Element: https://css-tricks.com/use-button-element/
---
```

```html
---
title: Special Front-matter Definitions
layout: prose
order: 3
---
```
