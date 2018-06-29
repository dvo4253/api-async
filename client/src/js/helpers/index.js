/* eslint no-console: "off" */
import helpersModule from 'handlebars-helpers';

const debug = (optionalValue) => {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
};

const register = (Handlebars) => {
  const externalHelpers = helpersModule();

  const helpers = {
    ...externalHelpers,
    debug
  };

  if (Handlebars && typeof Handlebars.registerHelper === 'function') {
    helpers.keys.map((prop) => {
      Handlebars.registerHelper(prop, helpers[prop]);
      return prop;
    });
  }

  return helpers;
};

const helpers = register(null);

export {
  register,
  helpers
};
