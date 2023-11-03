<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

// Initialize data
const productId = ref('')
const qty = ref('')
const transactionDate = ref('')
const errors = ref([])

const transaction = ref('')
const products = ref('')

onMounted(() => {
    fetchTransactionData()
    fetchProductsData()
})

const fetchTransactionData = async () => {
    const id = router.currentRoute.value.params.id;
    try {
        const response = await api.get(`/api/transaction/${id}`);
        transaction.value = response.data.data;
        productId.value = transaction.value.product_id;
        qty.value = transaction.value.qty;
        transactionDate.value = transaction.value.transaction_date;
    } catch (error) {
        console.error(error);
    }
}

const fetchProductsData = async () => {
    try {
        const response = await api.get("/api/product");
        products.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async () => {
    let formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('product_id', productId.value)
    formData.append('qty', qty.value)
    formData.append('transaction_date', transactionDate.value)

    await api.post(`/api/transaction/${router.currentRoute.value.params.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(() => {
            router.push({ name: 'transaction.index' })
        })
        .catch(error => {
            errors.value = error.response.data.errors
            console.log(errors.value)
        })
}
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <h6 class="mb-4 text-blue">Edit Transaksi</h6>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label class="form-label">Nama Barang</label>
                    <select v-model="productId" class="form-select">
                        <option disabled value="">Pilih produk</option>
                        <option v-for="product in products" :value="product.id">
                            {{ product.name }}
                        </option>
                    </select>
                    <small v-if="errors.product_id" class="text-danger">
                        {{ errors.product_id[0] }}
                    </small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Qty</label>
                    <input type="number" v-model="qty" class="form-control">
                    <small v-if="errors.qty" class="text-danger">{{ errors.qty[0] }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal Transaksi</label>
                    <input type="date" v-model="transactionDate" class="form-control">
                    <small v-if="errors.transaction_date" class="text-danger">{{
                        errors.transaction_date[0] }}</small>
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-success btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>