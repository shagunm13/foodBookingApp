export const IP = "http://192.168.43.163:8080";
export const httpRequest = (action, requestBody) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  const url = IP + action;
  return fetch(`${url}`, requestOptions);
};
