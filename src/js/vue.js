import Vue from 'vue';

//子
Vue.component('board-list', {
    template: `
        <div class="c-board--container">
            <h2 class="c-board--container__name">{{name}}</h2>
            <p class="c-board--container__text">{{text}} {{date}}</p>
        </div>
    `,
    props: ['name', 'text','date']
})

//親
Vue.component('board-form', {
    template: `
        <div class="c-modal">
            <button class="c-modal__btn c-modal__btn--cancel js-cancel">キャンセル</button>
            <button class="c-modal__btn c-modal__btn--send js-cancel" v-on:click="send">送信</button>
            <input type="text" class="c-modal__name" placeholder="名前" v-model="name" ref="name">
            <textarea class="c-modal__textarea" placeholder="何か書いてみよう！" v-model="text"></textarea>
        </div>
    `,
    data: function(){
        return{
            name:'',
            text:''
        }
    },
    methods:{
        send:function(){
            //イベント発火
            this.$emit('input',this.name,this.text)
        }
    }
})

let board = new Vue({
    el:'#l-board',
    data:{
        name:'',
        text:'',
        data:'',
        lists:[]
    },
    methods:{
        send:function(name,text){
            let now = new Date();
            this.lists.push({
                name:name,
                text:text,
                date:now.getMonth()+1 + '月'+ now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分'
            })
        }
    }
})

