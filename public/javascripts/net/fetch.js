import { defaults, assign, pick } from '../util/object';
import { ok, notModified } from './http-status-codes';

/**
 * readyState of a request that is done.
 * @const {number}
 */
const done = 4;

/**
 * Builds a response object from a fulfilled request.
 * @param {XMLHttpRequest} request Fulfilled request object
 * @returns {{responseText: string, status: number, statusText: string, json: Function}}
 */
function buildResponse(request) {
  return assign({
    json() {
      return JSON.parse(request.responseText);
    }
  }, pick(request, [
    'responseText',
    'status',
    'statusText'
  ]));
}

/**
 * Fetches a resource.
 * @param {string} url The URL of the resource to fetch
 * @param {object} [options={}] Options for the request
 * @returns {Promise} The response to the request
 */
export default function fetch(url, options = {}) {
  defaults(options, {
    method: 'get'
  });

  let { method, user, password } = options;

  let request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true, user, password);

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      let { readyState, status } = request;
      if (readyState === done) {
        switch (status) {
          case ok:
          case notModified:
            resolve(buildResponse(request));
            break;
          default:
            reject(request);
        }
      }
    };

    request.send();
  });
}

/**
 * Fetches a JSON resource
 * @param {string} url URL of the JSON resource to fetch
 * @param {object} [options={}] Request options
 * @returns {Promise.<Object>} Promise for the JSON returned from the endpoint
 */
export function fetchJSON(url, options = {}) {
  return fetch(url, options).then(response => response.json());
}