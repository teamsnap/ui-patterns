'use strict';

/**
 * Class representing a Priority Plus navigation component.
 *
 * By default uses js-prefixed class names to identify key elements:
 *
 *    <ul>
 *      <li class="js-PriorityPlus-item">
 *        <a href="">Menu item</a>
 *      </li>
 *      <li class="js-PriorityPlus-overflow">
 *        <a class="js-PriorityPlus-overflow-toggle" href="">More</a>
 *        <ul>
 *          <li class="js-PriorityPlus-overflow-item">
 *            <a href="">Overflow menu item</a>
 *          </li>
 *        </ul>
 *      </li>
 *    </ul>
 */
export default class PriorityPlus {

  /**
   * Instantiate the class, optionally updating elements immediately.
   *
   * @param {Element} element - The containing element, typically an unordered list.
   * @param {Object} [options] - Additional settings.
   * @param {ElementList|Array} [options.items] - The top-level navigation item elements.
   * @param {Element} [options.overflowElement] - The "overflow" item ("More," "Menu").
   * @param {Element} [options.overflowToggle] - The element that will toggle the overflow menu.
   * @param {ElementList|Array} [options.overflowItems] - Overflow menu elements.
   * @param {String} [options.activeClass] - Class to apply when the component has taken effect.
   * @param {String} [options.openClass] - Class to apply when the overflow menu should be open.
   * @param {String} [options.overflowClass] - Class to apply when the menu is overflowing.
   * @param {String} [options.hiddenClass] - Class to apply to hide individual items.
   * @param {String} [options.offsetAttribute] - Attribute to use to determine when items should overflow.
   * @param {String} [options.indexAttribute] - Attribute to populate with the current overflow index.
   * @param {Boolean} [options.update] - Whether or not to run `update()` on instantiation.
   */
  constructor (element, {
    items = element.querySelectorAll('.js-PriorityPlus-item'),
    overflowElement = element.querySelector('.js-PriorityPlus-overflow'),
    overflowToggle = element.querySelector('.js-PriorityPlus-overflow-toggle'),
    overflowItems = element.querySelectorAll('.js-PriorityPlus-overflow-item'),
    activeClass = 'is-active',
    openClass = 'is-open',
    overflowClass = 'is-overflowing',
    hiddenClass = 'u-hidden',
    offsetAttribute = 'offsetTop',
    indexAttribute = 'data-priorityplus-index',
    update = true
  } = {}) {
    var index;

    items = Array.from(items);
    overflowItems = Array.from(overflowItems);
    index = items.indexOf(overflowElement);

    if (index > -1) {
      items.splice(index, 1);
    }

    Object.assign(this, {
      element,
      items,
      overflowElement,
      overflowToggle,
      overflowItems,
      options: {
        activeClass,
        openClass,
        overflowClass,
        hiddenClass,
        offsetAttribute,
        indexAttribute
      }
    });

    if (this.overflowToggle) {
      this.overflowToggle.addEventListener('click', event => {
        event.preventDefault();
        this.toggle();
      });
    }

    if (update) {
      this.update();
    }
  }

  /**
   * Reset the navigation. Removes all classes except the open state to avoid
   * inadvertent menu closures across resizes.
   */
  reset () {
    this.items.concat(this.overflowItems).forEach(item => {
      item.classList.remove(this.options.hiddenClass);
    });

    this.element.classList.remove(this.options.activeClass, this.options.overflowClass);
    this.element.removeAttribute(this.options.indexAttribute);
  }

  /**
   * Update the navigation based on how items are currently wrapping. Call this
   * to apply or re-apply the component, for example on window load or resize.
   */
  update () {
    var index, hideFromMain, hideFromOverflow;

    if (this.element.classList.contains(this.options.activeClass)) {
      this.reset();
    }

    index = this.items.findIndex((element, index, collection) => {
      return element[this.options.offsetAttribute] > collection[0][this.options.offsetAttribute];
    });

    if (index > 0) {
      hideFromMain = this.items.slice(index - 1);
      hideFromOverflow = this.overflowItems.slice(0, index - 1);

      hideFromMain.concat(hideFromOverflow).forEach(item => {
        item.classList.add(this.options.hiddenClass);
      });

      this.element.classList.add(this.options.overflowClass);
    }

    this.element.setAttribute(this.options.indexAttribute, index);
    this.element.classList.add(this.options.activeClass);
  }

  /**
   * Toggle the menu visibility.
   */
  toggle () {
    this.element.classList.toggle(this.options.openClass);
  }
}
