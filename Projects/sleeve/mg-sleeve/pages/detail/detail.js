// pages/detail/detail.js
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {getSystemSize, getWindowHeightRpx} from "../../utils/system";
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";

const {Spu} = require("../../models/spu");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false
    },

    async setContentHeight() {
        const h = await getWindowHeightRpx()/*rpx*/ - 100/*tab-bar*/
        this.setData({
            contentHeight: h
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //动态设置高度
        await this.setContentHeight();

        //加载详情数据
        const pid = options.pid
        const spu = await Spu.getDetail(pid);
        const explains = await SaleExplain.getFixed()
        this.setData({
            spu,
            saleExplain: explains
        })

        /*购物车数量*/
        this.updateCartItemCount();
    },

    /**监听加入购物车事件*/
    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },

    onGoToHome(event) {
        /*switchTab 专门用于切换 tab-bar*/
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onGoToCart(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },

    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
    },

    onShopping(event) {
        const chosenSku = event.detail.sku;
        const skuCount = event.detail.skuCount;
        if (event.detail.orderWay === ShoppingWay.CART) {
            const cart = new Cart();
            const cartItem = new CartItem(chosenSku, skuCount);
            cart.addItem(cartItem);
            this.updateCartItemCount();
        }
    },

    updateCartItemCount() {
        const cart = new Cart();
        let cartItemCount = cart.getCartItemCount();
        this.setData({
            cartItemCount,
            showRealm: false,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})