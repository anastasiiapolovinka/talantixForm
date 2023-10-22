const reducer = (state, {type, payload}) => {
   switch (type) {
      case "SET_CITY": 
         return {...state, activeCity: payload};
      case "SET_WORKSHOP":
         return {...state, activeWorkShop: payload};   
      default: 
         return state;
   }
}
const initialState = {
   activeCity: {},
   activeWorkShop: undefined,
   workers: [{value: "ivan", name: "Иван", from: "msk", workShop: 1}, {value: "petr", name: "Петр", from: "msk", workShop: 1}, {value: "grisha", name: "Гриша", from: "msk", workShop: 2}, {value: "ruslan", name: "Руслан", from: "msk", workShop: 2}, {value: "alex", name: "Алексей" , from: "msk", workShop: 2}, {value: "anton", name: "Антон", from: "msk", workShop: 3}, {value: "rinat", name: "Ринат", from: "msk", workShop: 3}, {value: "zahar", name: "Захар", from: "msk", workShop: 3}, {value: "nazar", name: "Назар", from: "msk", workShop: 3}, {value: "ivan", name: "Иван", from: "sochi", workShop: 1}, {value: "petr", name: "Петр", from: "sochi", workShop: 1}, {value: "grisha", name: "Гриша", from: "sochi", workShop: 1}, {value: "ruslan", name: "Руслан", from: "sochi", workShop: 1}, {value: "alex", name: "Алексей" , from: "omsk", workShop: 1}, {value: "anton", name: "Антон", from: "omsk", workShop: 1}, {value: "rinat", name: "Ринат", from: "omsk", workShop: 1}, {value: "zahar", name: "Захар", from: "omsk", workShop: 2}, {value: "nazar", name: "Назар", from: "omsk", workShop: 2}, {value: "ivan", name: "Иван", from: "nvs", workShop: 1}, {value: "petr", name: "Петр", from: "nvs", workShop: 1}, {value: "grisha", name: "Гриша", from: "nvs", workShop: 2}, {value: "ruslan", name: "Руслан", from: "nvs", workShop: 2}, {value: "alex", name: "Алексей" , from: "nvs", workShop: 2}, {value: "anton", name: "Антон", from: "nvs", workShop: 3}, {value: "rinat", name: "Ринат", from: "nvs", workShop: 2}, {value: "zahar", name: "Захар", from: "nvs", workShop: 2}, {value: "nazar", name: "Назар", from: "nvs", workShop: 3}, {value: "ivan", name: "Иван", from: "nvs", workShop: 3}, {value: "petr", name: "Петр", from: "nvs", workShop: 3}, {value: "grisha", name: "Гриша", from: "nvs", workShop: 3}, {value: "ruslan", name: "Руслан", from: "nvs", workShop: 3}, {value: "alex", name: "Алексей" , from: "nvs", workShop: 3}, {value: "anton", name: "Антон", from: "nvs", workShop: 3}, {value: "rinat", name: "Ринат", from: "nvs", workShop: 3}]
};

export const createStore = () => {
   let state = initialState;
   const listeners = [];
   const getState = () => state;
   const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((fn) => fn())
   };
   const subscribe = (fn) => {
      listeners.push(fn);
   };
   return {getState, dispatch, subscribe};
}
