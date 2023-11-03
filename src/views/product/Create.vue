<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

const productId = ref('')
const stock = ref('')
const productTypeId = ref('')
const errors = ref([])
const productTypes = ref([])

onMounted(fetchProductTypes)

const storeProduct = async () => {
    const formData = new FormData()
    formData.append('name', productId.value)
    formData.append('stock', stock.value)
    formData.append('product_type_id', productTypeId.value)

    try {
        await api.post('/api/product', formData)
        router.push({ name: 'product.index' })
    } catch (error) {
        errors.value = error.response.data.errors
        console.log(errors.value)
    }
}

const fetchProductTypes = async () => {
    try {
        const response = await api.get('/api/product-type')
        productTypes.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <h6 class="mb-4 text-blue">Tambahkan Barang</h6>
            <form @submit.prevent="storeProduct">
                <div class="mb-3">
                    <label class="form-label">Nama</label>
                    <input type="text" v-model="name" class="form-control" placeholder="Contoh: Kopi">
                    <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Stok</label>
                    <input type="number" v-model="stock" class="form-control" placeholder="Contoh: 100">
                    <small v-if="errors.stock" class="text-danger">{{ errors.stock[0] }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Jenis Barang</label>
                    <select v-model="productTypeId" class="form-select">
                        <option disabled value="">Pilih jenis barang</option>
                        <option v-for="productType in productTypes" :value="productType.id">{{
                            productType.name }}</option>
                    </select>
                    <small v-if="errors.productTypeId" class="text-danger">
                        {{ errors.productTypeId[0] }}
                    </small>
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-success btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>