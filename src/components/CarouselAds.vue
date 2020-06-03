<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active" style="background-image: url(https://www.fruco.com.co/sk-eu/content/dam/brands/fruco/colombia/1646269-banner-mayo-artesanal.jpg.rendition.1960.1960.jpg);">
      </div>
      <div class="carousel-item" style="background-image: url(https://www.ulabox.com/media/26241_banner-desktop.jpg)">
      </div>        
      <div class="carousel-item" style="background-image: url(https://deventosreportcolombia.files.wordpress.com/2017/05/banner_home_almendras.jpg)">
      </div>
    </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<style scoped>
.carousel-item {
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
}
.carousel-control-prev, .carousel-control-next{
  width: 5%;
}
</style>