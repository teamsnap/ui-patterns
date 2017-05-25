---
title: Naming Conventions
layout: prose
---

# {{title}}

Our CSS components use a BEM naming convention borrowed from [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md):

* u-utilityName
* ComponentName
* ComponentName--modifierName
* ComponentName-descendentName
* ComponentName.is-stateOfComponent  

## Utilities

Low-level structural and positional traits. Utilities can be applied directly
to any element within a component.

Syntax: `u-[sm-|md-|lg-]<utilityName>`

<br>

### u-utilityName

Utilities use a camel case name. What follows is an example of how various
utilities can be used to create a simple structure within a component.

```html
<div class="u-cf">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```

<br>

### Responsive utilities

Certain utilities have responsive variants using the patterns: `u-sm-<name>`,
`u-md-<name>`, and `u-lg-<name>` for small, medium, and large Media Query
breakpoints.

<br>

## Components

The CSS responsible for component-specific styling.

Syntax: `<ComponentName>[-descendentName][--modifierName]`

This has several benefits when reading and writing HTML and CSS:

* It helps to distinguish between the classes for the root of the component,
  descendent elements, and modifications.
* It keeps the specificity of selectors low.
* It helps to decouple presentation semantics from document semantics.


### ComponentName

The component's name is written in pascal case. Nothing else in the
HTML/CSS uses pascal case.

```css
.MyComponent { /* … */ }
```

```html
<article class="MyComponent">
  …
</article>
```

<br>

### ComponentName--modifierName

A component modifier is a class that modifies the presentation of the base
component in some form (e.g., for a certain configuration of the component).
Modifier names are written in camel case and separated from the
component name by two hyphens. The class should be included in the HTML _in
addition_ to the base component class.

```css
/* Core button */
.Button { /* … */ }

/* Primary button modifier */
.Button--primary { /* … */ }
```

```html
<button class="Button Button--primary" type="button">…</button>
```

<br>

### ComponentName-descendentName

A component descendent is a class that is attached to a descendent node of a
component. It's responsible for applying presentation directly to the
descendent on behalf of a particular component. Descendent names are
written in camel case.

```html
<article class="Panel">
  <header class="Panel-header">
    …
  </header>
  <div class="Panel-body">
    …
  </div>
</article>
```

<br>

### ComponentName.is-stateOfComponent

Use `is-stateName` to reflect changes to a component's state. The state name
is written in camel case. **Never style these classes directly; they should always be
used as an adjoining class.**

This means that the same state names can be used in multiple contexts, but
every component must define its own styles for the state (as they are scoped to
the component).

```css
.Button { /* … */ }
.Button.is-active { /* … */ }
```

```html
<button class="Button is-active">
  ...
</button>
```
