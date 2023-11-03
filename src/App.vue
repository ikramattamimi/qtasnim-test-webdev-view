<script setup>

</script>

<template>
  <div>
    <nav class="navbar navbar-expand bg-blue">
      <div class="container">
        <a href="/" class="navbar-brand text-white p-0">
          <div class="row align-items-center">
            <div class="col pe-0">
              <i class="fa-solid fa-database"></i>
            </div>
            <div class="col">
              Master Data Penjualan
            </div>
          </div>
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-lg-0">
            <li class="nav-item px-2">
              <router-link to="/product" class="nav-link">Barang</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product-type" class="nav-link">Jenis Barang</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/transaction" class="nav-link">Transaksi</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'ptype.compare' }" class="nav-link">Perbandingan Jenis Barang</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div>

  <router-view></router-view>
</template>

<style>
.router-link-active {
  color: white !important;
  font-weight: bold;
}

.text-blue {
  color: #00acee !important;
}

.bg-blue,
.btn-info {
  background-color: #00acee !important;
}

.btn-success {
  background-color: #7cb083;
  border-color: #7cb083;
}

.btn-save {
  min-width: 200px;
}

.btn-info {
  border-color: #00acee;
}

.nav-link {
  min-width: 100px;
  text-align: center;
}
</style>

