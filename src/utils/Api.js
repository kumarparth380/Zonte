import { NetInfo, Platform } from "react-native";

// get base url according to environment
const getBaseURLAccordingToEnvironment = (env) => {
  switch (env) {
    case 'prod':
      return 'http://prod.flexsin.org/api/'
    case 'dev':
      return 'http://zonte.flexsin.org/api/'
    case 'local':
      return 'http://100.100.7.96:8000/api/'
    default:
      return 'http://zonte.flexsin.org/api/'
  }
}

const baseURL = getBaseURLAccordingToEnvironment('dev');

//function for get api call
export function getAPI(endpoint) {
  return checkNetworkConnection().then(networkStatus => {
    if (networkStatus) {
      return fetch(baseURL + endpoint, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json"
        // },
      }).then((response) => response.json()).then((responseJson) => {
        return new Promise((resolve, reject) => {
          resolve(responseJson);
        });
      }).catch((err) => {
        console.log("Error in api js===============", err)
        return new Promise((resolve, reject) => {
          reject(err);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        reject("Network unavailable. Please connect to a Wi-Fi or cellular network.");
      });
    }
  },
    reject => {
      console.log("reject: " + reject);
    }
  );
}

//function for post api call with body
export function postAPIBody(endpoint, params) {
  console.log('endpoint', endpoint);
  console.log('params', params);
  return checkNetworkConnection().then(networkStatus => {
    if (networkStatus) {
      console.log("Network available====", networkStatus)
      return fetch(baseURL + endpoint, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          'Authorization': 'Bearer ' + global.userToken,
          "Content-Type": "application/json"
        },
      }).then(response => response.json()).then(responseJson => {
        console.log("asd2", networkStatus)
        return new Promise((resolve, reject) => {
          resolve(responseJson);
        });
      }).catch(err => {
        console.log("Error ", err);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        reject("Network unavailable. Please connect to a Wi-Fi or cellular network.");
      });
    }
  },
    reject => {
      console.log("reject: " + reject);
    }
  );
}

//function for post api call with formdata
export function postAPI(endpoint, formData) {
  console.log('endpoint', endpoint);
  console.log('formData', formData);
  //debugger
  return checkNetworkConnection().then(networkStatus => {
    if (networkStatus) {
      console.log("Network available", networkStatus)
      console.log("global.userToken", global.userToken)
      return fetch(baseURL + endpoint, {
        method: "POST",
        body: formData,
        headers: {
          //'Authorization': 'Bearer ' + global.userToken,
          'OAUTH-TOKEN': global.userToken,
          'Accept': 'application/json',
          "Content-Type": 'multipart/form-data'
        },
      }).then((response) => response.json()).then((responseJson) => {
        return new Promise((resolve, reject) => {
          resolve(responseJson);
        });
      }).catch(err => {
        console.log("Error ", err)
        return new Promise((resolve, reject) => {
          reject(err);
        });
      })
    } else {
      return new Promise((resolve, reject) => {
        reject("Network unavailable. Please connect to a Wi-Fi or cellular network.");
      });
    }
  },
    reject => {
      console.log("reject: " + reject);
    }
  );
}

//function for check if internet is connected or not!
export function checkNetworkConnection() {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "ios") {
      function handleFirstConnectivityChange(isConnected) {
        NetInfo.isConnected.removeEventListener("connectionChange", handleFirstConnectivityChange);
        resolve(isConnected);
      }
      NetInfo.isConnected.addEventListener("connectionChange", handleFirstConnectivityChange);
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        resolve(isConnected);
      });
    }
  });
}