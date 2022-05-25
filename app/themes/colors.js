/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#A91079';
const text = '#F8F8F8';
const secondary = '#F806CC';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';
const invertColor = '#f8f8f8';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  invertColor,
  success,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
