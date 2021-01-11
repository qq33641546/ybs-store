<template>
    <view class="center">
        <u-navbar :is-back='false' back-text="返回" title="个人中心"></u-navbar>
    </view>
</template>

<script>
    import {
        getUserInfo
    } from '@/common/http.api.js'
    import {
        mapState,
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                user_info: {},
            };
        },
        methods: {

        },
        computed: {

        },
        onLoad() {

        },
        onShow() {

        }
    }
</script>

<style lang="scss">

</style>