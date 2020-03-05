/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    'serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error(
                  'The installing ' + 'service worker became redundant.'
                );

              default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  // Checkout validation
  const checkoutForm = document.querySelector('.section__checkout');
  const listOfInputs = Array.from(checkoutForm.querySelectorAll('input'));
  const checkoutButton = document.querySelector('.checkout__submit_order');

  checkoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    let validationPassed = false;
    listOfInputs.map((input) => {
      const pattern = input.getAttribute('pattern');
      const errorText = input.getAttribute('title');
      const inputValue = input.value;
      const errorShown = input.parentElement.querySelector('.error__text')
        ? true
        : false;
      const regex = new RegExp(pattern);
      const regexTest = inputValue.match(regex);
      let regexTestResult = false;

      // Regexp can return null or empty string using match so we need to reduce output to true or false
      if (regexTest == null) {
        regexTestResult = false;
      } else {
        // if match returns empty string
        if (regexTest[0].length == 0) {
          regexTestResult = false;
        } else {
          regexTestResult = true;
        }
      }

      if (regexTestResult == false && errorShown == false) {
        const span = document.createElement('span');
        span.textContent = errorText;
        span.classList.add('error__text');
        input.parentElement.append(span);
        validationPassed = false;
      } else if (regexTestResult == false && errorShown == true) {
        validationPassed = false;
      } else if (regexTestResult == true && errorShown == true) {
        const errorElement = input.parentElement.querySelector('.error__text');
        input.parentElement.removeChild(errorElement);
        validationPassed = true;
      } else {
        validationPassed = true;
      }
    });
    if (validationPassed) {
      alert('You ve got this');
    } else {
      alert('Some errors occured');
    }
  });
})();
