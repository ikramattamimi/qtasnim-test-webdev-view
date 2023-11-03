<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";

const compares = ref([]);
const startDate = ref('')
const endDate = ref('')

onMounted(() => {
    fetchComparesData();
});


const fetchComparesData = async () => {
    const formData = new FormData()
    formData.append('start_date', startDate.value)
    formData.append('end_date', endDate.value)

    try {
        const response = await api.post(`/api/product-type/compare`, formData);
        compares.value = response.data.data;
        console.log(response.data.data)
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <form @submit.prevent="fetchComparesData">
                <div class="row my-4 align-items-end justify-content-between">
                    <div class="col-6">
                        <h1 class="card-title">Perbandingan Jenis Barang</h1>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Dari</label>
                        <input v-model="startDate" type="date" class="form-control">
                    </div>
                    <div class="col-2">
                        <label class="form-label">Sampai</label>
                        <input v-model="endDate" type="date" class="form-control">
                    </div>
                    <div class="col-2 text-end">
                        <button type="submit" class="btn btn-primary">Cari</button>
                    </div>
                </div>
            </form>

            <table class="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jenis Barang</th>
                        <th scope="col">Nama Barang</th>
                        <th scope="col">Transaksi Terbanyak</th>
                        <th scope="col">Transaksi Terendah</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="compares.length === 0">
                        <td colspan="4" class="text-center">
                            Data belum tersedia
                        </td>
                    </tr>
                    <tr v-else v-for="(compare, index) in compares" :key="compare.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ compare.product_type_name ?? compare.product.name }}</td>
                        <td>{{ compare.product_name }}</td>
                        <td>{{ Number(compare.highest_transaction).toLocaleString('id-ID') }}</td>
                        <td>{{ Number(compare.lowest_transaction).toLocaleString('id-ID') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>