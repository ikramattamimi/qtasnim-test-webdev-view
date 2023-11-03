<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'

const router = useRouter()

const productId = ref('')
const errors = ref([])

const storeProduct = async () => {
    const formData = new FormData()
    formData.append('name', productId.value)

    try {
        await api.post('/api/product-type', formData)
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
            <h6 class="mb-4 text-blue">Tambahkan Jenis Barang</h6>
            <form @submit.prevent="storeProduct">
                <div class="mb-3">
                    <label class="form-label">Nama Jenis Barang</label>
                    <input type="text" v-model="name" class="form-control"
                        placeholder="Contoh: Konsumsi">
                    <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-success btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>