import Vue from 'vue';
import VueSanitize from 'vue-sanitize';

const defaultOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'strong', 'em', 's', 'u', 'p', 'blockquote', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    a: ['href']
  }
};

Vue.use(VueSanitize, defaultOptions);
