export function buildUrl(url, parameters) {
  let qs = "";
  for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
          const value = parameters[key];
          qs +=
              encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
  }
  if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1);
      url = url + "?" + qs;
  }

  return url;
}