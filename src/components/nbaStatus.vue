<template>
  <div class="hello container">
    <span class="title">{{matchInfo.home_team}}({{matchInfo.home_score}}) VS {{matchInfo.visit_team}}({{matchInfo.visit_score}})</span>
    <div class="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">第一节</th>
              <th scope="col">第二节</th>
              <th scope="col">第三节</th>
              <th scope="col">第四节</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="score in matchInfo.team1_scores">
                <p v-if="score != 0">{{ score }}</p>
              </td>
            </tr>
            <tr>
              <td v-for="score in matchInfo.team2_scores">
                <p v-if="score != 0">{{ score }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="list-group" v-for="text in matchText">
          <a class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{matchInfo.home_score}}:{{matchInfo.visit_score}}</h5>
              <small class="text-muted">{{text[1].pid_text}}</small>
            </div>
            <p class="mb-1">{{text[1].live_text}}</p>
            <small class="text-muted">{{text[1].live_time}}</small>
          </a>
          </br>
          <a class="list-group-item list-group-item-action flex-column align-items-start active">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{matchInfo.home_score}}:{{matchInfo.visit_score}}</h5>
              <small>{{text[0].pid_text}}</small>
            </div>
            <p class="mb-1">{{text[0].live_text}}</p>
            <small>{{text[0].live_time}}</small>
          </a>
          </br>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nbaStatus',
  data() {
    return {
      matchInfo: [],
      match_id: '',
      match_date: '',
      matchMaxSid: '',
      matchMinSid: '',
      matchText: []
    }
  },
  methods: {
    getNBAStatus() {
      this.axios.get('http://bifen4pc2.qiumibao.com/json/'+this.match_date+'/'+this.match_id+'.htm')
      .then((response) => {
        this.matchInfo = response.data
      })
    },
    getMatchMaxSid() {
      this.axios.get('http://dingshi4pc.qiumibao.com/livetext/data/cache/max_sid/'+this.match_id+'/0.htm')
      .then((response) => {
        if(response.data%2 == 0){
          this.matchMaxSid = response.data
          // this.matchMinSid = response.data-100
        }
        else {
          this.matchMaxSid = response.data-1
          // this.matchMinSid = response.data-101
        }
      })
    },
    getMatchLiveText() {
      for(let i = this.matchMaxSid;i > 0;i=i-2){
      // for(let i = this.matchMaxSid;i >= this.matchMinSid;i=i-2){
        this.axios.get('http://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/'+this.match_id+'/0/lit_page_2/'+i+'.htm')
        .then((response) => {
          this.matchText.push(response.data)
        })
      }
    }
  },
  created() {
    this.axios.defaults.withCredentials = false
    this.match_id = this.$route.query.match_id
    this.match_date = this.$route.query.match_date
    this.getNBAStatus()
    this.getMatchMaxSid()
    setInterval(this.getMatchMaxSid,3000)
  },
  watch: {
    matchMaxSid() {
      this.getMatchLiveText()
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 30px;
  text-align: center;
  display: block;
  color: blue;
}
.list-group {
  width:100%;
}
</style>
