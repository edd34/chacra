<template>
  <div>
    <h1>Générateur CRA</h1>

    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              <h3>Veuillez pointer les jours</h3>
            </th>
            <th scope="col">
              <h3>Renseignez quelques infos</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <!-- <h3>Veuillez pointer</h3> -->
              <br><br>
              <Calendar id="main-calendar" :attributes='attributes' class="calendar" ref="calendar"
                @dayclick="dateclicked" @update:from-page="update_month" />
              <br>
              <!-- <div class="form-group"> -->
              <label class="">Nb jours travaillés : {{this.business_days.length}}</label>
              <!-- </div> -->
              <br>
              <!-- <div class="form-group"> -->
              <label class="">CA : {{this.business_days.length * this.tjm}} € HT</label>
              <!-- </div> -->
            </td>
            <td colspan="1">
              <!-- <h3>Renseignez quelques infos</h3> -->
              <br>
              <form class="well form-horizontal">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Nom complet</label>
                    <div class="col-md-8 inputGroupContainer">
                      <div class="input-group">
                        <span class="input-group-addon">
                        </span>
                        <input id="nomComplet" name="nomComplet" placeholder="Nom complet" class="form-control" 
                          value="" type="text" v-model="nomComplet">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Nom du client</label>
                    <div class="col-md-8 inputGroupContainer">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-user"></i></span>
                        <input id="client" name="client" placeholder="Nom du client" class="form-control" 
                          value="" type="text" v-model="client">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Nom du prestataire</label>
                    <div class="col-md-8 inputGroupContainer">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-user"></i></span>
                        <input id="client" name="client" placeholder="Nom prestataire" class="form-control" 
                          value="" type="text" v-model="prestataire">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Intitulé de la mission</label>
                    <div class="col-md-8 inputGroupContainer">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-user"></i></span>
                        <input id="mission" name="mission" placeholder="Mission" class="form-control" 
                          value="" type="text" v-model="mission">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">TJM</label>
                    <div class="col-md-8 inputGroupContainer">
                      <div class="input-group">
                        <input id="tjm" name="tjm" placeholder="TJM" class="form-control"  value=""
                          type="number" v-model="tjm">
                      </div>
                    </div>

                  </div>
                </fieldset>
              </form>
            </td>
          </tr>
          <!-- <h2>Résultats</h2>
          <tr>
            <td>
              <div class="form-group">
                <label class="control-label">CA Brut :  {{ this.business_days.length * tjm}} € HT</label>
              </div>
            </td>
          </tr> -->

        </tbody>

      </table>
    </div>
    <!-- <button class="btn btn-danger" @click="reset()">Reset</button> -->
    <button class="btn btn-success" @click="download()">Générer CRA</button>
    <br>
    <!-- <button @click="view()">Voir CRA pdf</button> -->
  </div>
</template>

<script>
  import Calendar from 'v-calendar/lib/components/calendar.umd'
  import axios from '../service'

  import {
    business_days,
    getDaysInMonth
  } from '../modules/days_helpers'
  import download from 'downloadjs'

  var today = new Date()
  var nomComplet = ""
  var prestataire = ""
  var client = ""
  var mission = ""
  var tjm = 0

  export default {
    name: 'App',
    components: {
      Calendar,
    },
    data() {
      return {
        month: today.getMonth(),
        year: today.getFullYear(),
        business_days: [],
        nomComplet: nomComplet,
        client: client,
        prestataire: prestataire,
        mission: mission,
        tjm: tjm,
        attrs: [{
            key: 'today',
            highlight: false,
            dates: today
          },
          {
            key: 'day-off',
            highlight: false,
            dates: []
          },
          {
            key: 'business-day',
            highlight: true,
            dates: this.business_days
          }
        ]
      }


    },
    computed: {
      attributes() {
        return [{
            key: 'today',
            highlight: false,
            dates: today
          },
          {
            key: 'day-off',
            highlight: false,
            dates: []
          },
          {
            key: 'business-day',
            highlight: true,
            dates: this.business_days
          }
        ]
      }
    },
    methods: {
      dateclicked(day) {
        var date = new Date(day.id);
        date.setHours(0, 0, 0, 0);
        var res = this._dateIsSelected(date)
        console.log(res, date)
        if (res[0] == true) {
          this.business_days.splice(parseInt(res[1]), 1);
        } else {
          this.business_days.push(date);
        }
      },
      _dateIsSelected(day) {
        for (var i in this.business_days) {
          if (this.business_days[i].getTime() == day.getTime()) {
            return [true, i];
          }
        }
        return [false, -1];
      },
      update_month(page) {
        this.month = page.month - 1
        this.year = page.year
        this.business_days = business_days(this.month, this.year)
      },
      reset() {
        today = new Date();
        nomComplet = "";
        prestataire = "";
        client = "";
        mission = "";
        tjm = 0;
        this.month = today.getMonth();
        this.year = today.getFullYear();
        this.business_days = business_days(this.month, this.year);
        this.nomComplet = nomComplet;
        this.client = client;
        this.prestataire = prestataire;
        this.mission = mission;
        this.tjm = tjm;
      },
      download() {
        var _tmp = getDaysInMonth(this.month, this.year)
        var days_month_final = []
        for (var i in _tmp) {
          var cell = {
            index: i,
            day: _tmp[i],
            is_bd: false
          }
          for (var j in this.business_days) {
            if (_tmp[i].getTime() == this.business_days[j].getTime()) {
              cell.is_bd = true;
              break;
            }
          }
          days_month_final.push(cell)
        }


        var body = {
          month: this.month,
          year: this.year,
          business_days: this.business_days,
          daysInMonth: days_month_final,
          nomComplet: this.nomComplet,
          client: this.client,
          mission: this.mission,
          tjm: this.tjm,
          prestataire: this.prestataire
        }
        axios.download_pdf(body).then(response => {
          console.log('success', response.data);
          download(response.data, 'cra.pdf', response.headers["content-type"]);
        }).catch(error => {
          console.log('fail', error)
        })
      }
    },
    mounted() {
      // Get reference to the calendar component
      // const calendar = this.$refs.calendar;
      // Call method of the component

      // console.log(doff);
      // axios.get();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .calendar {
    margin: auto;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .control-label {
    float: left;
    padding-left: 15px;
  }

  button {
    margin: 0px 0px 0px 20px;
    padding: 10px;
  }
</style>