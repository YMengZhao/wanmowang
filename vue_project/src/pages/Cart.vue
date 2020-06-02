<template>
    <div id="cart" v-if="!loading">
        <div class="cart" v-if="edit">
            <div class="cart_header">
                <i class="iconfont icon-zuojiantou" @click="$router.go(-1)"></i>
                <h3>购物车</h3>
                <i class="iconfont icon-edit" @click="edit = !edit"></i>
            </div>   
            <div class="cart_context">
                <ul>
                    <li v-for="(goodsItem,idx) in goodsList" :key="goodsItem._id" >
                        <i class="iconfont icon-gou" @click="show($event)" ></i>
                        <img :src="goodsItem.picture" alt="" @click="gotoGoods(goodsItem.goodsid)">
                        <p>{{goodsItem.goodsname}}</p>
                        <p>RMB {{goodsItem.allPrice}}.00</p>
                        <div class="param">
                            <span>{{goodsItem.size}}</span>
                            <span>{{goodsItem.color}}</span>
                            x
                            <p>{{goodsItem.num}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="cart_footer">
                <span>合计：RMB {{goodsAllPrice}}.00</span>
                <span>结算</span>
            </div>      
        </div>
        <div class="edit" v-if="!edit">
            <div class="cart_header">
                <i class="iconfont icon-zuojiantou" @click="edit = !edit"></i>
                <h3>编辑商品</h3>
                <i class="iconfont icon-el-icon-delete2"></i>
            </div>   
            <div class="edit_context">
                <ul>
                    <li v-for="(goodsItem,idx) in goodsList" :key="goodsItem._id" >
                        <i class="iconfont icon-gou goodsActive" @click="show($event)"></i>
                        <img :src="goodsItem.picture" alt="" @click="gotoGoods(goodsItem.goodsid)">
                        <p>{{goodsItem.goodsname}}</p>
                        <span>RMB {{goodsItem.allPrice}}.00</span>
                    </li>
                </ul>
            </div>     
        </div>
    </div>   
</template>
<script>
export default {
   data(){
       return{
           loading:false,
           goodsList:[],
           goodsAllPrice:0,
           edit:true
       }
   },
    methods: {
        gotoGoods(id){
            this.$router.push({name:'Goods',query:{id}})
        },
        show(e){
            if(e.target.className == 'iconfont icon-gou goodsActive'){
                e.target.className = 'iconfont icon-gou';
            }else if(e.target.className == 'iconfont icon-gou'){
                e.target.className = 'iconfont icon-gou goodsActive';
            }
        },
        getcart(){
            this.loading = true;
            // let id = this.$route.query.id;
            this.$axios({
                method:'get',
                url:'http://localhost:3000/cart',  
            })
            .then(res=>{
                
                this.goodsList = res.data;
                // 总价
                this.goodsList.map((item)=>{
                    return this.goodsAllPrice = parseInt(this.goodsAllPrice) + parseInt(item.allPrice)
                })
                this.loading = false;
                // this.gocart = res.data;
            });
        }
    },
    created() {
        this.getcart();     
    }
}
</script>

<style scoped>
    #cart{
        width: 100%;
        height: 100%;
    }
    .cart{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    .cart_header{
        height: 2.75rem;
        background: #f7f7f7;
        box-shadow: 0 1px 6px #ccc;
        display: flex;
        justify-content:space-between;
        box-sizing: border-box;
        padding: 0 1.25rem;
        align-items: center;
    }
    #cart .iconfont{
        font-size: 1.75rem ;
    }
    .cart_header h3{
        font-size: 1.125rem;
    }

    .cart_context{
        flex: 1;
    }
    .cart_context ul{
        height: 28.125rem;
        padding-top:.625rem; 
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .cart_context ul li{
        list-style: none;
        /* width: 18.75rem; */
        margin: .3125rem;
        background: #FFFFFF;
        margin-left: .625rem;
        position: relative;
    }
    .cart_context ul li .goodsActive{
        background: #CCC !important;
    }
    .cart_context ul li i{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        background: #FFD71D;
        text-align: center;
        line-height: 1.5rem;
        border-radius: 50%;
        color: #999;
        border: .0625rem solid #999;
        position: absolute;
        top: -0.75rem;
        right: -0.75rem;
    }


    .cart_context ul li .iconfont{
        font-size: 1rem !important;
    }
    .cart_context ul::-webkit-scrollbar {
        display: none;
    }
    .cart_context ul li:nth-child(1){
        margin-left: .9375rem;
    }
    .cart_context ul li img{
        width: 18.75rem;
    }
    .cart_context ul li p:nth-child(3){
        font-size: .875rem;
        color: #333;
        margin-top:.625rem; 
        margin-left: .625rem;
        padding-top: .625rem;
    }
    .cart_context ul li p:nth-child(4){
        font-size: .75rem;
        color: #8f8f94;
        margin-top:.3125rem;
        margin-left: .625rem; 
    }
    .param{
        height: 2.5rem;
        display: flex;
        font-size: .75rem;
        color: #8f8f94;
        line-height: 1.25rem;
        align-items: center;
        margin-left: .625rem;
        padding-top: .625rem ;
    }
    .param span{
        display: block;
        height: 1.25rem;
        border: 1px solid #999;
        border-radius: 1.25rem;
        padding: .125rem .625rem;
        text-align: center;
        line-height: 1.25rem;
        font-size: .75rem;
        color: #8f8f94;
        margin-right: .3125rem;
    }
    .param span:nth-child(2){
        margin-right: .625rem;
    }
    .param p{
        font-size: .75rem !important;
        color: #8f8f94 !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .cart_footer{
        height: 3.125rem;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        text-align: center
    }
    .cart_footer span:nth-child(1){
        flex: 1;
        color: #D93C37;
        font-size: .875rem;
    }
    .cart_footer span:nth-child(2){
        width: 7.75rem;
        line-height:3.125rem;
        font-size: 1rem;
        background: #D93C37;
        color: #FFF;
    }





    .edit{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .edit_context{
        flex: 1;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: .625rem;
        overflow: scroll;
    }
    .edit_context::-webkit-scrollbar {
        display: none;
    }
    .edit_context ul{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .edit_context ul li{    
        list-style:none;
        width: 10.25rem;
        height: 14.625rem;
        background: #FFFFFF !important;
        margin: .625rem 0;
        box-shadow: 1px 1px 10px #DDD;
        text-align: center;
        position: relative;
    }
    .edit_context ul li .goodsActive{
        background: #CCC !important;
    }
    .edit_context ul li .iconfont{
        font-size: .875rem !important;
    }

    .edit_context ul li i{
        display: block;
        width: 1.25rem;
        height: 1.25rem;
        background: #FFD71D;
        text-align: center;
        line-height: 1.25rem;
        border-radius: 50%;
        color: #999;
        border: .0625rem solid #999;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
    }
    .edit_context ul li img{
        width: 100%;
    }

    .edit_context ul li p{
        font-size: .75rem;
        color: #000;
        line-height: 1.875rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        padding: 0rem .625rem;
    }
    .edit_context ul li span{
        font-size: .625rem;
        color: #FFD71D;
        line-height: .625rem;
    }
</style>
