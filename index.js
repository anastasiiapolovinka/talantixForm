 import { createStore } from "./data.js";

const { getState, dispatch, subscribe } = createStore();

const app = document.getElementById("app");
const form = document.createElement("form");
form.onsubmit = (event) => {
   const data = new FormData(event.target);
   console.log([...data.entries()]);
   event.preventDefault();
}

// create cityList select

const cityList = [{value: "none", name: "Выберите город"}, {value: "msk", name: "Москва", workshopsQuantity: 3}, {value: "sochi", name: "Сочи", workshopsQuantity: 1}, {value: "omsk", name: "Омск", workshopsQuantity: 2}, {value: "nvs", name: "Новосибирск", workshopsQuantity: 3}];
const createCityField = () => {
   const { activeCity } = getState();
   const fieldWrapper =  document.createElement("div");
   const cityListLabel =  document.createElement("label");
   cityListLabel.setAttribute("for", "city");
   cityListLabel.innerHTML = "Город: ";
   const cityListField = document.createElement("select");
   cityListField.id = "city";
   cityListField.setAttribute("name", "city");
   cityListField.onchange = (event) => {
      const activeValue = event.target.value;
      const selectedCity = cityList.find(({value}) => value === activeValue);
      dispatch({type: "SET_CITY", payload: selectedCity});
   }
   const optionList = cityList.reduce((acc, {value, name}) => {
      const selected = activeCity.value === value;
      const option = selected ?
       `<option value="${value}" selected>${name}</option>` :
        `<option value="${value}">${name}</option>`;
      return acc + option;
   }, "");
   cityListField.innerHTML = optionList;
   fieldWrapper.append(cityListLabel, cityListField);
   return fieldWrapper;
};

// create workshop select 

const createWorkshopField = () => {
   const { activeCity, activeWorkShop } = getState();
   const { workshopsQuantity } = activeCity;
   const optionList = new Array(workshopsQuantity).fill(0);
   const workshopList = optionList.map((item, index) => {
      return index + 1;
   });
   const workshopFieldWrapper =  document.createElement("div");
   const workshopListLabel =  document.createElement("label");
   workshopListLabel.setAttribute("for", "workshop");
   workshopListLabel.innerHTML = "Цех: ";
   const workshopListField = document.createElement("select");
   workshopListField.id = "workshop";
   workshopListField.setAttribute("name", "workshop");
   if (!workshopsQuantity) {
      workshopListField.disabled = true;
   } else {
      const workshopoptionList = workshopList.reduce((acc, value) => {
         const selected = activeWorkShop === value;
         const workshopoption = selected ? `<option value="${value}" selected>${value}</option>` : `<option value="${value}">${value}</option>`;
         return acc + workshopoption;
      }, "");
      workshopListField.innerHTML = workshopoptionList;
      workshopListField.onchange = (event) => {
         const activeWorkShop = event.target.value;
         dispatch({type: "SET_WORKSHOP", payload: Number(activeWorkShop)})
      }
   };
   workshopFieldWrapper.append(workshopListLabel, workshopListField);
   return workshopFieldWrapper;
}


// create worker select 

const createWorkerField = () => {
   const { activeWorkShop = 1, activeCity, workers } = getState();
   const { workshopsQuantity, value: activeCityValue } = activeCity;
   const workerFieldWrapper =  document.createElement("div");
   const workerListLabel =  document.createElement("label");
   workerListLabel.setAttribute("for", "worker");
   workerListLabel.innerHTML = "Cотрудник: ";
   const workerListField = document.createElement("select");
   workerListField.id = "worker";
   workerListField.setAttribute("name", "worker");
   if (!workshopsQuantity) {
      workerListField.disabled = true;
   } else {
      const workerList = workers.filter(({from, workShop}) => from === activeCityValue && workShop === activeWorkShop);
      const workeroptionList = workerList.reduce((acc, {value, name}) => {
         const workeroption = `<option value="${value}">${name}</option>`;
         return acc + workeroption;
      }, "");
      workerListField.innerHTML = workeroptionList;
   }
   workerFieldWrapper.append(workerListLabel, workerListField);
   return workerFieldWrapper;
};

// create workShift select

const workShiftList = [{value: "firstTime", name: "первая с 8:00 до 20:00"}, {value: "secondTime", name: "вторая с 20:00 до 8:00"}];
const createWorkSiftFieldWrapper = () => {
   const workShiftFieldWrapper = document.createElement("div");
   const workShiftListLabel =  document.createElement("label");
   workShiftListLabel.setAttribute("for", "workShift");
   workShiftListLabel.innerHTML = "Смена: ";
   const workShiftListField = document.createElement("select");
   workShiftListField.id = "workShift";
   workShiftListField.setAttribute("name", "workShift");
   const workShiftoptionList = workShiftList.reduce((acc, {value, name}) => {
   const workShiftoption = `<option value="${value}">${name}</option>`;
      return acc + workShiftoption;
   }, "");
   workShiftListField.innerHTML = workShiftoptionList;
   workShiftFieldWrapper.append(workShiftListLabel, workShiftListField);
   return workShiftFieldWrapper;
}

// submit button

const saveButton = () => {
   const button = document.createElement("button");
   button.setAttribute("type", "submit");
   button.innerHTML = "Сохранить";
   return button;
}

const renderApp = () => {
   form.replaceChildren(createCityField(),createWorkshopField(), createWorkerField(),createWorkSiftFieldWrapper(), saveButton());
   app.replaceChildren(form);
}
renderApp();
subscribe(renderApp);