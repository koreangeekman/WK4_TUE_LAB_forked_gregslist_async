import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housingService } from "../services/HousingService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHomes() {
  let contentHTML = '';
  AppState.houses.forEach(house => contentHTML += house.houseCard)
  setHTML('houseCards', contentHTML);
}

function _drawHousesForm() {
  if (!AppState.account) {
    return
  }
  setHTML('housesForm', House.housesFormTemplate)
}

export class HousingController {
  constructor() {
    housingService.getHouseData();

    _drawHomes();
    _drawHousesForm();
    AppState.on('houses', _drawHomes);
    AppState.on('account', _drawHomes);
    AppState.on('account', _drawHousesForm);
  }

  async addHouse(event) { // form submission
    event.preventDefault();
    await housingService.addHouse(getFormData(event.target));
    event.target.reset();
  }

  async removeHouse(id) {
    if (!(await Pop.confirm("Remove this house?"))) {
      return
    }
    housingService.removeHouse(id);
  }
}