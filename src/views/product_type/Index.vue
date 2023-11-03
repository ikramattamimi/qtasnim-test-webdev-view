<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";

const productTypes = ref([]);

const fetchDataProductTypes = async () => {
    try {
        const response = await api.get("/api/product-type");
        productTypes.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchDataProductTypes();
});

const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
        deleteItem(id);
    }
};

const deleteItem = async (id) => {
    try {
        await api.delete(`/api/product-type/${id}`);
        fetchDataProductTypes();
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="row my-2">
                <div class="col">
                    <h1 class="card-title">Jenis Barang</h1>
                </div>
                <div class="col text-end">
                    <router-link :to="{ name: 'ptype.create' }"
                        class="btn btn-info bg-blue text-white mb-3">
                        Tambah jenis barang
                    </router-link>
                </div>
            </div>

            <table class="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama Jenis Barang</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="productTypes.length === 0">
                        <td colspan="4" class="text-center">
                            Data belum tersedia
                        </td>
                    </tr>
                    <tr v-else v-for="(product, index) in productTypes" :key="product.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ product.name }}</td>
                        <td>
                            <router-link :to="{ name: 'ptype.edit', params: { id: product.id } }"
                                class="btn btn-sm btn-warning me-2">
                                <i class="fa-solid fa-pen text-white"></i>
                            </router-link>
                            <button @click="confirmDelete(product.id)" class="btn btn-sm btn-danger"
                                role="button">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>