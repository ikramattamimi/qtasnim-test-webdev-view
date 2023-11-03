<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";

const transactions = ref([]);
const query = ref('')
const orderBy = ref('')

const fetchDataTransactions = async () => {
    try {
        const response = await api.get("/api/transaction");
        transactions.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchDataTransactions();
});

const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
        deleteItem(id);
    }
};

const deleteItem = async (id) => {
    try {
        await api.delete(`/api/transaction/${id}`);
        fetchDataTransactions();
    } catch (error) {
        console.log(error);
    }
};

const searchItem = async (q) => {
    const formData = new FormData()
    formData.append('q', query.value)
    formData.append('order_by', orderBy.value)

    try {
        const response = await api.post(`/api/transaction/search`, formData);
        transactions.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="row my-2 align-items-center justify-content-between">
                <div class="col-3">
                    <h1 class="card-title">Transaksi</h1>
                </div>
                <div class="col-5">
                    <form @submit.prevent="searchItem">
                        <div class="input-group">
                            <input v-model="query" type="text" placeholder="Cari berdasarkan nama"
                                class="form-control w-50">
                            <select v-model="orderBy" @change="searchItem" class="form-select">
                                <option disabled value="">Urutkan</option>
                                <option value="products.name">Nama</option>
                                <option value="transactions.transaction_date">Tanggal</option>
                            </select>
                            <button type="submit"
                                class="btn btn-outline-secondary bg-blue text-white">Cari</button>
                        </div>
                    </form>
                </div>
                <div class="col-3 text-end">
                    <router-link :to="{ name: 'transaction.create' }"
                        class="btn btn-info bg-blue text-white">
                        Tambah transaksi
                    </router-link>
                </div>
            </div>

            <table class="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Tanggal Transaksi</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="transactions.length === 0">
                        <td colspan="4" class="text-center">
                            Data belum tersedia
                        </td>
                    </tr>
                    <tr v-else v-for="(transaction, index) in transactions" :key="transaction.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ transaction.product_name ?? transaction.product.name }}</td>
                        <td>{{ Number(transaction.qty).toLocaleString('id-ID') }}</td>
                        <td>{{ transaction.transaction_date }}</td>
                        <td>
                            <router-link
                                :to="{ name: 'transaction.edit', params: { id: transaction.id } }"
                                class="btn btn-sm btn-warning me-2">
                                <i class="fa-solid fa-pen text-white"></i>
                            </router-link>
                            <button @click="confirmDelete(transaction.id)" class="btn btn-sm btn-danger"
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