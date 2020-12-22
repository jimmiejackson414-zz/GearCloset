/* eslint-disable camelcase */
import Vue from 'vue';
import convert from 'convert-units';

Vue.filter('prettyName', (user, type) => {
  const { first_name, last_name, trail_name, email } = user;
  let name = '';

  if (type === 'noTrailName') {
    if (first_name && last_name) {
      name = `${first_name} ${last_name}`;
    } else {
      name = `${email}`;
    }
    return name;
  } else {
    if (first_name && last_name && trail_name) {
      name = `${first_name} "${trail_name}" ${last_name}`;
    } else if (trail_name && !first_name && !last_name) {
      name = `${trail_name}`;
    } else if (first_name && last_name && trail_name === '') {
      name = `${first_name} ${last_name}`;
    } else if (!first_name && last_name && trail_name) {
      name = `"${trail_name}" ${last_name}`;
    } else {
      name = `${email}`;
    }

    return name;
  }
});

Vue.filter('initials', (user) => {
  if (!user) { return 'GC'; }
  const firstInitial = user.first_name.charAt(0);
  const lastInitial = user.last_name.charAt(0);
  return `${firstInitial}${lastInitial}`;
});

Vue.filter('truncate', (string, length = 140) => {
  const isEmpty = string => !string || string.length === 0;

  if (isEmpty(string)) {
    return '...';
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
});

Vue.filter('displayWeight', value => {
  return convert(value.weight).from('mg').to(value.unit).toFixed(2);
});

Vue.filter('displayCategoryWeight', value => {
  const weight = value.items.reduce((sum, elem) => sum + elem.weight, 0);
  return convert(weight).from('mg').to(value.unit).toFixed(2);
});
