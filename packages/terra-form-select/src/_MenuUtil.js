import React from 'react';
import SelectUtils from './_SelectUtils';

const Variants = SelectUtils.VARIANTS;

class MenuUtil {
  /**
   * Determines if the query is contained within the string.
   * @param {string|undefined} string - The initial string.
   * @param {string|undefined} query - The value being searched for.
   * @return {boolean} - True if the string contains the query.
   */
  static contains(string, query) {
    if (!string) {
      return false;
    }
    return string.toLowerCase().indexOf(query.trim().toLowerCase()) > -1;
  }

  /**
   * Compares the value of two strings to determine case insensitive equality.
   * @param {string|undefined} a - The initial value to compare.
   * @param {string|undefined} b - The secondary value to compare.
   * @return {boolean} - True if the values are equal.
   */
  static isEqual(a, b) {
    if (!a || !b) {
      return false;
    }
    return a.toLowerCase() === b.toLowerCase();
  }

  /**
   * Determines whether the variant allows multiple selections.
   * @param {string} variant - The variant.
   * @return {boolean} - True if the variant allows multiple selections.
   */
  static isMultiple(variant) {
    return variant === Variants.MULTIPLE || variant === Variants.TAG;
  }

  /**
   * Determines whether the provided option is selected.
   * @param {array|number|string} value - The select value.
   * @param {number|string} option - The option value.
   * @return {boolean} - True if the option is selected.
   */
  static isSelected(value, option) {
    if (Array.isArray(value)) {
      return MenuUtil.includes(value, option);
    } else if (value) {
      return value === option;
    }
    return false;
  }

  /**
   * Determines if the query is contianed within the array.
   * @param {array|undefined} array - The initial array.
   * @param {string|undefined} query - The value being searched for.
   * @return {boolean} - True if the query is contained within the array.
   */
  static includes(array, query) {
    if (!array) {
      return false;
    }
    return array.indexOf(query) > -1;
  }

  /**
   * Flattens the available options. Ignores disabled options.
   * @param {ReactNode} object - The node being flattened.
   * @return {array} - An array of available options.
   */
  static flatten(object) {
    return React.Children.toArray(object).reduce((accumulator, option) => {
      if (option.type.isOption && !option.props.disabled) {
        accumulator.push(option);
      } else if (option.type.isOptGroup) {
        return accumulator.concat(MenuUtil.flatten(option.props.children));
      }
      return accumulator;
    }, []);
  }

  /**
   * Filters the object content by the search criteria.
   * @param {ReactNode} object - The node being filtered.
   * @param {function|undefined} optionFilter - An optional custom filter.
   * @return {array} - An array of filtered content.
   */
  static filter(object, searchValue, optionFilter) {
    return React.Children.toArray(object).reduce((accumulator, option) => {
      if (option.type.isOption && MenuUtil.filterOption(option, searchValue, optionFilter)) {
        accumulator.push(option);
      } else if (option.type.isOptGroup) {
        const children = MenuUtil.filter(option.props.children, searchValue, optionFilter);
        // Ignore groups that do not contain any filtered options.
        if (children.length > 0) {
          accumulator.push(React.cloneElement(option, {}, children));
        }
      }
      return accumulator;
    }, []);
  }

  /**
    * Determines if the option should be included in the filtered set.
    * @param {ReactNode} option - The option being filtered.
    * @param {function|undefined} optionFilter - A custom callback to filter against.
    * @return {boolean} - True if the option should be included in the fitlered set.
   */
  static filterOption(option, searchValue, optionFilter) {
    if (optionFilter) {
      return optionFilter(searchValue, option);
    }
    return MenuUtil.contains(option.props.display, searchValue);
  }

  /**
   * Finds the option matching the requested value.
   * @param {ReactNode} object - The node being flattened.
   * @param {string} value - The value of the target option.
   * @return {ReactNode|undefined} - The option. Returns undefined if not found.
   */
  static findByValue(object, value) {
    return MenuUtil.flatten(object).find(({ props }) => MenuUtil.isEqual(props.value, value));
  }

  /**
   * Finds the option matching the requested display value.
   * @param {ReactNode} object - The node being flattened.
   * @param {string} value - The value of the target option.
   * @return {ReactNode|undefined} - The option. Returns undefined if not found.
   */
  static findByDisplay(object, value) {
    return MenuUtil.flatten(object).find(({ props }) => MenuUtil.isEqual(props.display, value));
  }

  /**
   * Finds the option following the active option.
   * @param {ReactNode} object - The node being flattened.
   * @param {string} value - The value of the active option.
   * @return {string|null} - The value of the next option. Returns null if not found.
   */
  static findNext(object, value) {
    const options = MenuUtil.flatten(object);
    const index = MenuUtil.flatten(object).findIndex(({ props }) => props.value === value);
    return index === -1 ? null : options[Math.min(index + 1, options.length - 1)].props.value;
  }

  /**
   * Finds the option preceding the active option.
   * @param {ReactNode} object - The node being flattened.
   * @param {string} value - The value of the active option.
   * @return {string|null} - The value of the previous option. Returns null if not found.
   */
  static findPrevious(object, value) {
    const options = MenuUtil.flatten(object);
    const index = options.findIndex(({ props }) => props.value === value);
    return index === -1 ? null : options[Math.max(index - 1, 0)].props.value;
  }

  /**
   * Determines the appropriate active option.
   * @param {Object} props - The menu props.
   * @param {array} children - The menu children.
   * @param {Object} state - The menu state.
   * @return {string|null} - The active option value. Null if not found.
   */
  static getActiveOptionFromProps(props, children, state) {
    const options = MenuUtil.flatten(children);
    if (options.length === 0) {
      return null;
    } else if (props.searchValue !== state.searchValue) {
      return options[0].props.value;
    } else if ((props.variant === Variants.DEFAULT || props.variant === Variants.COMBOBOX) && props.value) {
      const foundOption = options.find(option => option.props.value === props.value);
      return foundOption ? foundOption.props.value : null;
    } else if (state.active && MenuUtil.findByValue(options, state.active)) {
      return state.active;
    } else if (options.length > 0) {
      return options[0].props.value;
    }
    return null;
  }

  /**
   * Determines if the menu should allow a free text entry.
   * @param {Object} props - The menu props.
   * @param {array} children - The menu children.
   * @return {boolean} - True if a free text entry is allowed.
   */
  static shouldAllowFreeText(props, children) {
    if (props.variant === Variants.TAG || props.variant === Variants.COMBOBOX) {
      return props.searchValue && !MenuUtil.findByDisplay(children, props.searchValue);
    }
    return false;
  }
}

export default MenuUtil;