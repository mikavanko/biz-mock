import Vue from 'vue'
import Router from 'vue-router'
import {store} from '@/store'

import Home from '@/views/Home'
import Playgrounds from '@/views/Playgrounds'
import FoodHall from '@/views/FoodHall'
import Corners from '@/views/Corners'
import Collections from "@/views/Collections"
import Products from "@/views/Products"
import Categories from "@/views/Categories"

import Edit from '@/views/Edit'
import EditCorners from '@/views/EditCorners'
import EditCollections from "@/views/EditCollections"
import EditProducts from "@/views/EditProducts"
import EditCategories from "@/views/EditCategories"

import Delivery from "@/views/Delivery"

import Auth from "@/views/Auth"
import Invite from "@/views/Invite"

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                    }
                ]
            },
        },
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
            meta: {
                layout: 'auth',
            },
        },
        {
            path: '/invite',
            name: 'Invite',
            component: Invite,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Пригласить',
                    },
                ]
            },
        },
        {
            path: '/playgrounds',
            name: 'Playgrounds',
            component: Playgrounds,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                    },
                ]
            },
        },
        {
            path: '/playgrounds/foodhall',
            name: 'FoodHall',
            component: FoodHall,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Фуд-холлы'
                    },
                ]
            },
        },
        {
            path: '/playgrounds/corners',
            name: 'Corners',
            component: Corners,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Арендаторы',
                    }
                ]
            },
        },
        {
            path: '/playgrounds/foodhall/create',
            name: 'createFoodHall',
            component: Edit,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Фуд-холлы',
                        name: 'FoodHall'
                    },
                    {
                        text: 'Создание фуд-холла'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/foodhall/edit/:id',
            name: 'edit',
            component: Edit,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Фуд-холлы',
                        name: 'FoodHall'
                    },
                    {
                        text: 'Редактирование'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/corners/create',
            name: 'createCorner',
            component: EditCorners,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Арендаторы',
                        name: 'Corners'
                    },
                    {
                        text: 'Создание арендатора'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/corners/edit/:id',
            name: 'editCorners',
            component: EditCorners,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Арендаторы',
                        name: 'Corners'
                    },
                    {
                        text: 'Редактирование'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/collections',
            name: 'Collections',
            component: Collections,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Коллекции',
                    }
                ]
            },
        },
        {
            path: '/playgrounds/collections/create',
            name: 'createCollection',
            component: EditCollections,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Коллекции',
                        name: 'Collections'
                    },
                    {
                        text: 'Создание коллекции'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/collections/edit/:id',
            name: 'editCollections',
            component: EditCollections,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Коллекции',
                        name: 'Collections'
                    },
                    {
                        text: 'Редактирование'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/products',
            name: 'Products',
            component: Products,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Продукты',
                    }
                ]
            },
        },
        {
            path: '/playgrounds/products/create',
            name: 'createProduct',
            component: EditProducts,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Продукты',
                        name: 'Products'
                    },
                    {
                        text: 'Создание продукта'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/products/edit/:id',
            name: 'editProducts',
            component: EditProducts,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Продукты',
                        name: 'Products'
                    },
                    {
                        text: 'Редактирование'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/delivery',
            name: 'Delivery',
            component: Delivery,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Доставка',
                    }
                ]
            },
        },
        {
            path: '/playgrounds/categories',
            name: 'Categories',
            component: Categories,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Категории',
                    }
                ]
            },
        },
        {
            path: '/playgrounds/categories/create',
            name: 'createCategories',
            component: EditCategories,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Категории',
                        name: 'Categories'
                    },
                    {
                        text: 'Создание категорий'
                    }
                ]
            },
        },
        {
            path: '/playgrounds/categories/edit/:id',
            name: 'editCategories',
            component: EditCategories,
            meta: {
                requiresAuth: true,
                layout: 'default',
                breadcrumb: [
                    {
                        text: 'Главная',
                        name: 'Home'
                    },
                    {
                        text: 'Площадки',
                        name: 'Playgrounds'
                    },
                    {
                        text: 'Категории',
                        name: 'Categories'
                    },
                    {
                        text: 'Редактирование'
                    }
                ]
            },
        },
    ]
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/auth')
    } else {
        next()
    }
})
export default router