<template>
  <div class="bloc-modale">
    <div @click="toggleModale" class="overlay"></div>
    <div class="modale card">
      <div @click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <div
        v-if="this.carousel.length > 0"
        class="droite d-flex flex-direction-row justify-content-around"
      >
        <div class="compteur">
          <span>
            <i @click="compteurMoins" class="fas fa-arrow-alt-circle-left"></i>
          </span>
        </div>
        <div class="image">
          <img
            :src="this.carousel[this.count].images"
            alt=""
            @click="showModal = true"
          />
        </div>
        <div class="compteur">
          <span>
            <i @click="compteurPlus" class="fas fa-arrow-alt-circle-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  data() {
    return {
      carousel: store.state.chiensCarousel,
      selectedDog: store.state.selectedDog,
      count: 0,
    };
  },
  methods: {
    compteurPlus() {
      if (this.count + 2 > this.carousel.length) {
        this.count = 0;
      } else {
        this.count = this.count += 1;
      }
    },
    compteurMoins() {
      if (this.count <= 0) {
        this.count = this.carousel.length - 1;
      } else {
        this.count = this.count -= 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  width: 95%;
  height: 95%;
}
.droite {
  height: 100%;
  width: 100%;
  .image {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    object-fit: cover;
    border: 1px black solid;
    overflow: hidden;
    & img {
      //margin-top: 50px;
      margin-bottom: 0;
      width: 100%;
      //max-height: 80%;
    }
  }
}
.modale p {
  text-align: left;
}
.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.compteur {
  width: 50px;
  height: 50px;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
