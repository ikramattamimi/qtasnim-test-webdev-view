<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

const productId = ref('')
const errors = ref([])

const productType = ref('')

onMounted(() => {
    fetchProductData()
})

const fetchProductData = async () => {
    try {
        const response = await api.get(`/api/product-type/${router.currentRoute.value.params.id}`)
        productType.value = response.data.data
        productId.value = productType.value.name
    } catch (error) {
        console.log(error)
    }
}

const updateProductType = async () => {
    let formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('name', productId.value)

    try {
        await api.post(`/api/product-type/${router.currentRoute.value.params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        router.push({ name: 'ptype.index' })
    } catch (error) {
        errors.value = error.response.data.errors
        console.log(errors.value)
    }
}
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <h6 class="mb-4 text-blue">Edit Barang</h6>
            <form @submit.prevent="updateProductType">
                <div class="mb-3">
                    <label class="form-label">Nama</label>
                    <input type="text" v-model="name" class="form-control">
                    <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-success btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>