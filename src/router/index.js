import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/product",
        component: () => import("../views/product/Product.vue"),
        children: [
            {
                path: "",
                name: "product.index",
                component: () => import("../views/product/Index.vue"),
            },
            {
                path: "create",
                name: "product.create",
                component: () => import("../views/product/Create.vue"),
            },
            {
                path: ":id/edit",
                name: "product.edit",
                component: () => import("../views/product/Edit.vue"),
            },
        ]
    },
    {
        path: "/product-type",
        component: () => import("../views/product_type/ProductType.vue"),
        children: [
            {
                path: "",
                name: "ptype.index",
                component: () => import("../views/product_type/Index.vue"),
            },
            {
                path: "create",
                name: "ptype.create",
                component: () => import("../views/product_type/Create.vue"),
            },
            {
                path: ":id/edit",
                name: "ptype.edit",
                component: () => import("../views/product_type/Edit.vue"),
            },
            {
                path: "compare",
                name: "ptype.compare",
                component: () => import("../views/product_type/Compare.vue"),
            },
        ]
    },
    {
        path: "/transaction",
        component: () => import("../views/transaction/Transaction.vue"),
        children: [
            {
                path: "",
                name: "transaction.index",
                component: () => import("../views/transaction/Index.vue"),
            },
            {
                path: "create",
                name: "transaction.create",
                component: () => import("../views/transaction/Create.vue"),
            },
            {
                path: ":id/edit",
                name: "transaction.edit",
                component: () => import("../views/transaction/Edit.vue"),
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router