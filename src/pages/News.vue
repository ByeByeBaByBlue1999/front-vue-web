<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm" style="background-color: whitesmoke;" :style="'border-bottom: 2px solid '+ theme_color">
      <q-toolbar>
        <span :style="'font-size: 35px;color:'+theme_color" class="my-font text-h6 q-mr-md">AoGeLai</span>
        <q-space ></q-space>
        <q-tabs v-model="selected_tab" shrink>
          <q-tab :style= "[selected_tab == 't_0' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_0');" style="min-height:auto !important;color: black" label="首页" />
          <q-tab :style= "[selected_tab == 't_1' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_1');" style="min-height:auto !important;color: black" label="公司概况" />
          <q-tab :style= "[selected_tab == 't_2' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToProduct();" style="min-height:auto !important;color: black" label="产品介绍" />
          <q-tab :style= "[selected_tab == 't_3' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToExample();" style="min-height:auto !important;color: black" label="工程案例" />
          <q-tab :style= "[selected_tab == 't_4' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToNews()" style="min-height:auto !important;color: black" label="新闻资讯" />
          <q-tab :style= "[selected_tab == 't_5' ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_5');" style="min-height:auto !important;color: black" label="联系我们" />
          <q-btn class="q-mr-md" size="12px" :style="'min-height:auto !important;background:'+ theme_color +'; color: white; padding:1px'" dense icon="color_lens">
              <q-tooltip 
                transition-show="flip-right"
                transition-hide="flip-left"
                self="center left"
                anchor="center right">
                主题颜色
              </q-tooltip>
              <q-menu anchor="bottom left" self="bottom right" transition-show="flip-right"
                      transition-hide="flip-left">
                <q-color
                  v-model="bg_color"
                  no-header
                  no-footer
                  default-view="palette"
                  class="my-picker"
                  @input="changeBgColor()"
                />
              </q-menu>
          </q-btn>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="news" style="height: 1080px; background-color: aliceblue;">
        <q-carousel
          animated
          v-model="slide"
          v-if="news != null"
          arrows
          swipeable
          navigation
          infinite
          control-color="black"
          transition-prev="slide-right"
          transition-next="slide-left"
          style="border-radius: 5px; width: 100%; height: 100%;"
        >
          <q-carousel-slide class="q-pa-md" v-if="news != null" v-for="index in news.length" :key="index" :name=index
            style="
              display: flex; 
              justify-content: center;
            "  
          >
            <q-card class="my-card" flat bordered>
              <q-card-section>
                <h4 class="text-center">
                  {{news[index-1].title}}
                </h4>
                <div style="text-align: center;">
                    时间: {{news[index-1].time.split(' ')[0].split('/')[0]}}-{{news[index-1].time.split(' ')[0].split('/')[1]}}-{{news[index-1].time.split(' ')[0].split('/')[2]}} {{news[index-1].time.split(' ')[1]}}
                    &nbsp&nbsp&nbsp&nbsp
                    作者: 管理员
                </div>
              </q-card-section>
              <q-card-section>
                <div style="display: flex; justify-content: center;">
                  <q-img v-for="_index in news[index-1].image_path.length" :key="_index"
                    class="col-5"
                    center
                    :src="news[index-1].image_path[_index-1]"
                    style="width: 240px; height: 240px; margin: 5px 5px 5px 5px;"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <span style="white-space: pre-wrap; text-align: left;">案例介绍：{{news[index-1].content}}</span>
              </q-card-section>
              <br>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
        <!-- <q-splitter
          v-model="splitter"
          style="height: 100%; margin-left: 10%; margin-right: 10%;"
        >
          <template v-slot:before v-if="news">
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
              style="background-color: white;
              opacity: 0.8;"
            >
              <q-tab v-if="news[index-1] != undefined" v-for="index in news.length" :key="index" :name="'news_' + index" icon="mdi-door" :label="news[index-1].title" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-if=" news != null" 
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              style="height: 100%; opacity: 0.95;"
            >
              <q-tab-panel v-for="index in news.length" :key="index" :name="'news_' + index">
                <div style="text-align: center;">
                  <h3>
                    {{news[index-1].title}}
                  </h3>
                </div>
                <div style="text-align: center;">
                    时间: {{news[index-1].time.split(' ')[0].split('/')[0]}}-{{news[index-1].time.split(' ')[0].split('/')[1]}}-{{news[index-1].time.split(' ')[0].split('/')[2]}} {{news[index-1].time.split(' ')[1]}}
                    &nbsp&nbsp&nbsp&nbsp
                    作者: 管理员
                </div>
                <div style="text-align: center;">
                  <img
                    style="height:280px; width: 280px; margin: 20px;" 
                    v-if="news[index-1].image_path != null" 
                    v-for="img_index in news[index-1].image_path.length" 
                    :src="news[index-1].image_path[img_index-1]"
                  >
                </div>
                <div style="white-space: pre-wrap; text-align: left;">
                  <p>{{news[index-1].content}}</p>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style src="@quasar/quasar-ui-qflashcard/dist/index.css"></style>

<script>
import { scroll, Notify } from 'quasar'
import axios from 'axios'
const { getScrollTarget, setScrollPosition } = scroll
import {QFlashcard, QFlashcardSection} from '@quasar/quasar-ui-qflashcard'
import App from 'src/App.vue'

export default {
  components: {
    QFlashcard,
    QFlashcardSection,
    App
  },
  data() {
    return {
      slide: 1,
      review_slide: 'style',
      selected_tab: 't_4',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: 'rgb(0, 163, 82)',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      news: null,
      splitter: 20,

      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242',

      tab: 'news_1',
    }
  },
  mounted() {
    this.getNews()
    this.getParams()
  },
  computed: {
    style() {
      return {
        width: '340px',
        height: '340px',
        backgroundImage: `url('/statics/images/bg3.jpeg')`, // eslint-disable-line
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6',
        display: 'inline-block'
      }
    },
    team_style() {
      return {
        width: '260px',
        height: '260px',
        backgroundImage: `url('/statics/images/bg3.jpeg')`, // eslint-disable-line
        textAlign: 'center',
        boxShadow: '1px 1px 2px #e6e6e6',
        display: 'inline-block'
      }
    }
  },
  methods: {
    getNews() {
      axios.get("/news/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          // this.successNotify('获取新闻列表成功')
          this.news = response.data.data
          console.log(this.news)
        } else {
          // this.errorNotify(response.data.msg)
          console.log(response.data.msg)
        }
      })
    },
    scrollToElement (id) {
      let el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 900
      setScrollPosition(target, offset, duration)
    },
    changeBgColor() {
      this.theme_color = this.bg_color;
      this.background_style = 'background-color:' + this.bg_color.split(')')[0] + ',0.7)';
    },
    hoverOver: function(index) {
      this['about_heading_color_' + index] = this.theme_color;
      this['about_heading_' + index] = ['animated', 'bounceIn'];              
    },
    hoverOutTimeout: function(index) {
      this['about_heading_color_' + index] = '#424242';
      setTimeout(() => {
        this['about_heading_' + index] = [];                
      }, 1000);              
    },
    getParams() {
      if (this.$route.query.index) {
        this.tab = 'news_' + this.$route.query.index
      }
    },
    jumpToIndex(e) {
      if (e == 't_0') {
        this.$router.push({
          path: '/desk',
          query: {
            selected_tab: 't_0'
          }
        })
      }
      if (e == 't_1') {
        this.$router.push({
          path: '/desk',
          query: {
            selected_tab: 't_1'
          }
        })
      }
      if (e == 't_5') {
        this.$router.push({
          path: '/desk',
          query: {
            selected_tab: 't_5'
          }
        })
      }
    },
    jumpToProduct() {
      this.$router.push({path: '/products'})
    },
    jumpToExample() {
      this.$router.push({path: '/examples'})
    },
    jumpToNews() {
      this.$router.push({path: '/news'})
    }
  }
}
</script>

<style lang="sass" scoped>
  .main_line
    font-size: 75px;
    letter-spacing: 5px;
    line-height: 60px;
    font-weight: 600;

  .custom-caption
    text-align: center;
    padding: 12px;
    color: white;

  .animation_1
    -webkit-animation: bounceIn 1s ease-in 800ms both;
    animation: bounceIn 1s ease-in 800ms both;

  .animation_2
    -webkit-animation: flipInX 4s ease-in-out 800ms both;
    animation: flipInX 1s ease-in-out 800ms both;

  .animation_3
    -webkit-animation: lightSpeedIn 1s ease-in 800ms both;
    animation: lightSpeedIn 1s ease-in 800ms both;

  .description
    padding: 10px
    background-color: black
    color: white
    box-shadow: 1px 1px 2px #e6e6e6

  .my-header
    width: 200px
    top: 0
    height: 45px
    color: black
    background-color: rgba(255,255,255, 0.8)
    text-transform: uppercase
    text-align: center
    font-size: 17px
    margin: 20px 0 0 68px
    padding: 25px

  .my-text
    width: 100%
    top: 0
    height: 90px
    color: white
    text-align: center
    font-size: 15px
    margin: 79px 0 0 0
    padding: 20px
    line-height: normal

  .my-button-container
    width: 100%

  .my-button
    text-decoration: none
    text-transform: uppercase
    margin: 0 0 20px 0
    text-align: center
    padding: 7px 14px
    background-color: #000
    color: #fff
    text-transform: uppercase
    box-shadow: 0 0 1px #000
    transition-delay: 0.2s

  .my-button:hover
    box-shadow: 0 0 5px #000

  .box-shadow:hover
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;

  .my-card
    width: 750px
    height: 100%
    max-width: 750px
    margin-top: 10px

  .team-header
    width: 100%
    top: 0
    height: 45px
    color: white
    text-transform: uppercase
    text-align: center
    font-size: 17px
    margin: 60px 0 0 0
    padding: 12px

  .team-text
    width: 100%
    top: 0
    height: 90px
    color: white
    text-align: center
    font-size: 15px
    margin: 100px 0 0 0
    padding: 20px
    line-height: normal
    font-family: Georgia, serif
    font-style: italic
  
  .quote
    background: url(/statics/images/bg0.jpeg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  
  .pricing
    background: url(/statics/images/pricing.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  
  .contact_us
    background: url(/statics/images/contact_us.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  
  .custom_tab
    width: 130px;

  .news
    background: url(/statics/images/pure.jpeg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
</style>

