<template>
  <div class="hello container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button round @click="getNBAList">直播比赛</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button round @click="getNBAListHistory">历史比赛</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="row">
      <div class="col-sm-6" v-for="(item,i) in nbaList">
        <div class="card border-warning mb-3" style="width: 18rem;">
          <div class="card-header text-primary">
            <h5 class="card-title">{{ item.home_team }} VS {{ item.visit_team }}</h5>
          </div>
          <div class="card-body text-danger">
            <p class="card-text">{{ item.home_score }} : {{ item.visit_score }}</p>
            <router-link
                :to="{
                    path: 'nbaStatus',
                    query: {
                        match_id: item.id
                    }
                }">
                比赛详情
            </router-link>
          </div>
          <div class="card-footer text-success">
            <p>{{ item.period_cn }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'nba',
  data() {
    return {
      nbaList: [],
      nbaTeam: ['勇士','掘金','开拓者','马刺','快船','国王','雷霆','火箭','灰熊','爵士','鹈鹕','湖人','森林狼','太阳','独行侠',
                '猛龙','雄鹿','步行者','凯尔特人','76人','黄蜂','热火','活塞','篮网','魔术','老鹰','公牛','尼克斯','骑士','奇才'],
      liveListUrl: 'http://bifen4m.qiumibao.com/json/list.htm',
      overListUrl: '',
      date: ''

    }
  },
  methods: {
    getNBAList() {
      this.axios.get('http://bifen4m.qiumibao.com/json/list.htm')
      .then((response) => {
        this.nbaList = response.data.list
        for (let i=0;i<this.nbaList.length;i++){
          if ( this.nbaTeam.indexOf(this.nbaList[i].home_team) == -1 ){
            // 每次对数组进行操作（删除一个元素）之后，数组的长度都会变化，但是i是记录最初数组的下标值，
            // 所以要从循环中删除choiceflag为1 的元素，必须每次删完之后要把i的值减去1，这样当数组的长度变化时，
            // 下次删除的元素也不会错。也就是
            this.nbaList.splice(i--,1)
          }
        }
      })
    },
    getNBAListHistory() {
      this.axios.get('http://bifen.qiumibao.com/json/'+this.date+'/list.htm')
      .then((response) => {
        this.nbaList = response.data.list
        for (let i=0;i<this.nbaList.length;i++){
          if ( this.nbaTeam.indexOf(this.nbaList[i].home_team) == -1 ){
            this.nbaList.splice(i--,1)
          }
        }
      })
    }
  },
  created() {
    this.axios.defaults.withCredentials = false
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth()+1
    let date = myDate.getDate()
    if(month<10){
      if(date<10){
        this.date = year+'-0'+month+'-0'+date
      }
      else{
        this.date = year+'-0'+month+'-'+date
      }
    }
    else{
      if(date<10){
        this.date = year+'-'+month+'-0'+date
      }
      else{
        this.date = year+'-'+month+'-'+date
      }
    }
  },
  watch: {
    date(){
      console.log("日期改变了")
      this.getNBAListHistory()
    }
  }
}
</script>

<style scoped>
.block {

}
</style>
