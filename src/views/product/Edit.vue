<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

// Initialize data
const name = ref('')
const stock = ref('')
const productTypeId = ref('')
const errors = ref([])

const product = ref('')
const productTypes = ref([])

onMounted(() => {
    fetchProductData()
    fetchProductTypes()
})

const fetchProductData = async () => {
    await api.get(`/api/product/${router.currentRoute.value.params.id}`)
        .then(response => {
            product.value = response.data.data
            name.value = product.value.name
            stock.value = product.value.stock
            productTypeId.value = product.value.product_type_id
        })
        .catch(response => {
            console.log(response)
        })
}

const fetchProductTypes = async () => {
    await api.get('/api/product-type')
        .then(response => {
            productTypes.value = response.data.data
        })
        .catch(error => {
            console.log(error)
        })
}

const updateProduct = async () => {
    let formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('name', name.value)
    formData.append('stock', stock.value)
    formData.append('product_type_id', productTypeId.value)

    await api.post(`/api/product/${router.currentRoute.value.params.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(() => {
            router.push({ name: 'product.index' })
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
            <h6 class="mb-4 text-blue">Edit Barang</h6>
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label class="form-label">Nama</label>
                    <input type="text" v-model="name" class="form-control">
                    <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Stok</label>
                    <input type="number" v-model="stock" class="form-control">
                    <small v-if="errors.stock" class="text-danger">{{ errors.stock[0] }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Jenis Barang</label>
                    <select v-model="productTypeId" class="form-select">
                        <option disabled value="">Pilih jenis barang</option>
                        <option v-for="productType in productTypes" :value="productType.id">{{
                            productType.name }}</option>
                    </select>
                    <small v-if="errors.productTypeId" class="text-danger">{{ errors.productTypeId[0]
                    }}</small>
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-success btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>