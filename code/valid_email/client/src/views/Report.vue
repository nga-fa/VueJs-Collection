<template>
  <div class="report">
      <div class="container"  id="editor">
          <h3><u>Result in the editor</u></h3>
          <vue-editor :editorToolbar="customToolbar" v-model="editorValue"></vue-editor>
      </div>
      <div class="container" style="text-align: center">
          <h3>You can also download it here</h3>
          <b-card id="card" title="Email verification report">
              <b-form ref='uploadForm'
                      id='uploadForm'
                      :action="actionLink"
                      method='get'
                      encType="multipart/form-data">
                  <b-button type="submit">Download Report</b-button>
              </b-form>
          </b-card>
      </div>
  </div>
</template>

<script>

    import axios from 'axios'
    import { VueEditor } from "vue2-editor";

    export default {
        name: 'report',
        data: function (){
            return {
                editorValue: '',
                actionLink: "http://localhost:3000/getdoc/",
                customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]]
            }
        },
        components: {VueEditor},
        props: ['url'],
        methods: {
            download: function(){
                axios.get("localhost:3000/getdoc/"+this.url.replace("output\\",""));
            }
        },
        async created() {
            this.url = this.url.replace("data\\", "");
            this.url = this.url.replace("output\\", "");
            this.actionLink += this.url;

            this.editorValue = await axios.get("localhost:3000/getdoc/" + this.url.replace("output\\", ""));
        }
    }
</script>

<style scoped>
    #card{
        width: 40%;
        margin: 20px auto 200px auto;
    }

    button{
        margin: auto;
    }

    #editor {
        width: 60%;
        margin: 20px auto;
        text-align: center;
    }

    h3 { margin: auto }
</style>
