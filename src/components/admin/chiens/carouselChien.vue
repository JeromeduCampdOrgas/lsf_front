<template>
  <div class="input-group mb-5">
    <span class="input-group-text bg-primary"
      >image {{ this.count }}<i class="far fa-images"></i>
    </span>
    <input class="form-control" type="file" @change="onCarouselChange" />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
