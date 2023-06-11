<template>
    <div id="Form" ref="Form">
        <div class="form-group __formFields">

            <div class="__formContent" v-for="field in fields" :key="field.id">
                <label :for="field.id">{{ field.label }}</label>
                
                <input v-if="field.type == 'text'" :type="field.type" :id="field.id" v-model="field.value"
                    :placeholder="field.placeholder" @keyup="verify($event, field)" />
                <div class="__urlList" v-if="urlList.length > 0 && field.name == 'url'">
                    <div v-for="l in urlList" :key="l.id">
                        <span @click="chooseLink(l.link, field)">{{ l.link }}</span>
                    </div>
                </div>
                <select v-if="field.type == 'select'" :id="field.id" v-model="field.value">
                    <option v-for="option in field.options" :key="option.id" :value="option.value">{{ option.label }}</option>
                </select>
                <textarea v-if="field.type == 'textarea'" :id="field.id" v-model="field.value"
                    :placeholder="field.placeholder"></textarea>
            </div>
            <button @click="$emit('updateForm', fields)">Procurar</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MyWorker from 'worker-loader!@/workers/listWorker.js';

export default {
    props: {
        fields: {
            type: Array,
            required: true

        },
    },
    computed: {
        ...mapGetters(['getStaticSites'])
    },
    data() {
        return {
            urlList: [],
            listWorker: new MyWorker(),
        }
    },
    mounted() {

    },
    methods: {
        chooseLink(link, field) {
            field.value = link
            this.urlList = []
        },
        verify(e,field) {
            this.listWorker.postMessage({ url: e.target.value, list: this.getStaticSites, field:field.name })
            this.listWorker.onmessage = (e) => {
                this.urlList = e.data.list
            }

        }
    }

}
</script>

<style lang="less" scoped>
.__formFields {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1em !important;
    margin: 0 auto;

    .__formContent {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        position:relative;
        .__urlList {
            position:absolute;
            background-color:#fff;
            box-shadow: 0px 0px 5px #ccc;
            top:8vh;
            left:0px;
            padding:10px;
            max-height:300px;
            overflow-y:scroll;
            width:100%;
            padding:30px;
            text-align:left;
            z-index:1000;
            border-radius:10px;
            span {
                display:block;
                margin-bottom:10px;
                cursor:pointer;
            }

        }

        label {
            text-align: left;
            font-size: 0.7em;
            font-weight: 500;
            margin-bottom: 0px;
            margin-top: 5px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 0.5em;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            outline: 0px;

        }

        textarea {
            width: 100%;
            padding: 0.5em;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            outline: 0px;
        }

        select {
            width: 100%;
            padding: 0.5em;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
            outline: 0px;
        }
    }

    button {
        width: 100%;
        font-weight: bold !important;
        margin-top: 1.0em !important;
    }

}</style>