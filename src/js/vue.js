import Vue from 'vue';


Vue.component('board-list', {
    template: `
        <div class="c-board--container">
            <h2 class="c-board--container__name">{{name}}</h2>
            <p class="c-board--container__text">{{text}}</p>
            <p class="c-board--container__date">{{date}}</p>
        </div>
    `,
    props: ['name', 'text', 'date', 'sendTime']
})


Vue.component('board-form', {
    template: `
        <div class="c-modal">
            <button class="c-modal__btn c-modal__btn--cancel js-cancel">キャンセル</button>
            <button class="c-modal__btn c-modal__btn--send js-cancel" v-on:click="send">送信</button>
            <input type="text" class="c-modal__name" placeholder="名前" v-model="name">
            <textarea class="c-modal__textarea" placeholder="何か書いてみよう！" v-model="text"></textarea>
        </div>
    `,
    data: function () {
        return {
            name: '',
            text: ''
        }
    },
    methods: {
        send: function () {
            //イベント発火　名前とテキストを渡す　送信後フォーム削除
            this.$emit('input', this.name, this.text)
            this.name = ''
            this.text = ''
        }
    }
})

let board = new Vue({
    el: '#l-board',
    data: {
        lists: []
    },
    //firebaseからデータ取得
    created: function () {
        let vue = this;
        firebase.database().ref('ocean').on('value', function (snapshot) {
            vue.lists = snapshot.val();
        });
    },
    //データ送信
    methods: {
        send: function (name, text) {
            let now = new Date();
            firebase.database().ref('ocean').push({
                name: name,
                text: text,
                date: now.getMonth() + 1 + '月' + now.getDate() + '日' + now.getHours() + ':' + now.getMinutes(),
                sendTime: now.getTime()
            })
        }
    }
})
//
// Vue.component('my-area',{
//     template:`
//     <button v-on:click="handelClick">イベント発火ボタン</button>
//     `,
//     data:function(){
//         return{
//         }
//     },
//     methods:{
//         handelClick:function(){
//             this.$emit('child-event')
//         }
//     }
//
// })
// Vue.component('area-chlid',{
//     template:'<p>{{val}}</p>',
//     props:['val']
// })
//
// new Vue({
//     el:'#app2',
//     data:{
//         count:0,
//     },
//     methods:{
//         prentsMethod:function(){
//             alert('あいうえお')
//         }
//     }
// })

