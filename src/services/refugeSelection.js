import store from "../store/index";
export default {
  refugeId(e) {
    let selectedRefuge = e.target.parentNode.parentNode.childNodes[1].innerHTML;
    for (let i = 0; i < this.refuges.length; i++) {
      if (this.refuges[i].name == selectedRefuge) {
        store.dispatch("getRefugeId", this.refuges[i].id);
        return this.refuges[i].id;
      }
    }
  },
};
