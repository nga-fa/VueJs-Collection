<template>
  <div class="home">
    <div class="container">

      <b-card class="container" id="first">
          <h4>Form for a single email</h4>
          <input id="single" type="text" placeholder="Enter email address" required/>
          <b-button  block @click="handleOne" id="firstbtn" type="submit" class="btn btn-secondary">Submit</b-button>
      </b-card>

      <b-card class="container" id="second">
          <h4>Form for a comma separated list of email</h4>
          <textarea  placeholder="Enter your comma seperated list of emails here"> </textarea>
          <b-button block @click="handleList" id="secondbtn" type="submit" class="btn btn-secondary">Submit</b-button>
      </b-card>

      <b-card class="container" id="third">
        <b-form ref='uploadForm'
              id='uploadForm'
              action='http://localhost:3000/upload'
              method='post'
              encType="multipart/form-data">

          <h4>Field to enter a file (CSV or MS ACCESS file)</h4>
          <input type="file" name="uploadfile" id="form_input" required>
          <button @click="handleFile" id="uploadbtn" type="submit">Upload</button>
          <div class="alert alert-warning alert-dismissible fade show" style="display: none"  role="alert">
            <strong>File type must be csv or excel !</strong>
            <b-button block type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </b-button>
          </div>
        </b-form>
      </b-card>

    </div>
  </div>
</template>

<script>

    import JQuery from 'jquery'
    window.$ = JQuery;

    export default {
        name: 'home',
        data: function(){
            let url = "";
            return {
                url
            }
        },
        methods: {

            async mailWorker(email) {
                this.url = await $.post('http://localhost:3000/verify',{
                    email: email
                });

                console.log("Response in vue component is : "+ this.url);

                this.$router.push({name: 'report', params: {url: this.url}})
            },

            handleOne() {

                    let email = [];
                    email.push($('#single').val());
                    this.mailWorker(email);

                    $("form").submit(function(e){
                        e.preventDefault(e);
                    });
             },

            handleList() {


                    let emails = $('textarea').val();
                    let emailArray = emails.split(',');
                    const uniqueEmails = [...new Set(emailArray)];

                    this.mailWorker(uniqueEmails);

                    $("form").submit(function(e){
                        e.preventDefault(e);
                    });

             },

            handleFile() {


                  let filename = $("#form_input").val();

                  let extension = filename.replace(/^.*\./, '');

                  if (extension == filename) {
                      extension = '';
                  } else {
                      extension = extension.toLowerCase();
                  }

                switch (extension) {
                      case 'csv':
                      case 'xls':
                      case 'xlsx':
                          break;

                      default:
                          $('.alert').css('display', 'inline-block');
                          submitEvent.preventDefault();
                }
            },

        }
    };
</script>

<style scoped>
    #first, #second, #third {
        margin: 10px auto 10px auto;
        padding: 20px;
        width: 50%;
        text-align: center;
    }

    button{
        margin-top: 10px !important;
    }

    #single{
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid black;
        width: 100%;
        outline: none;
        text-decoration: none;
        background-color: transparent;
    }

    textarea{
        width: 100%;
        min-height: 100px;
        max-height: 150px;
        height: 150px;
        border: 1px solid black;
    }
</style>
