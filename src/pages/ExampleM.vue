<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm" style="background-color: whitesmoke;" :style="'border-bottom: 2px solid '+ theme_color">
      <div style="display: flex; justify-content: center;">
        <span :style="'font-size: 35px; color:'+theme_color" class="my-font text-h6">AoGeLai</span>
      </div>
      <q-toolbar>
        <!-- <span :style="'font-size: 35px;color:'+theme_color" class="my-font text-h6 q-mr-md">AoGeLai</span> -->
        <div class="q-gutter-y-md" style="max-width: 100%">
          <q-tabs 
            v-model="selected_tab" 
            inline-label
            outside-arrows
            mobile-arrows
          >
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 0 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_0');" style="min-height:auto !important;color: black" label="首页" />
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 1 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_1');" style="min-height:auto !important;color: black" label="公司概况" />
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 2 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToProduct();" style="min-height:auto !important;color: black" label="产品介绍" />
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 3 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToExample();" style="min-height:auto !important;color: black" label="工程案例" />
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 4 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToNews();" style="min-height:auto !important;color: black" label="新闻资讯" />
            <q-tab :style= "[parseInt(selected_tab.split('_')[1]) % 6 == 5 ? {backgroundColor: theme_color} : {}]" class="q-mr-sm q-py-xs custom_tab" @click="jumpToIndex('t_5');" style="min-height:auto !important;color: black" label="联系我们" />
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
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-carousel
          animated
          v-model="slide"
          v-if="examples != null"
          arrows
          swipeable
          navigation
          infinite
          autoplay
          control-color="black"
          transition-prev="slide-right"
          transition-next="slide-left"
          style="border-radius: 5px; width: 100%; height: 100%;"
        >
          <q-carousel-slide class="q-pa-md" v-if="examples != null" v-for="index in examples.length" :key="index" :name=index
            style="
              display: flex; 
              justify-content: center;
            "  
          >
            <q-card class="my-card" flat bordered  style="height: 100%; width: 100%;">
              <q-card-section>
                <h4 class="text-center">
                  案例：{{examples[index-1].title}}
                </h4>
              </q-card-section>
              <q-card-section>
                <div style="display: flex; justify-content: center;">
                  <q-img v-for="_index in examples[index-1].image_path.length" :key="_index"
                    class="col-5"
                    center
                    :src="examples[index-1].image_path[_index-1]"
                    style="width: 240px; height: 240px; margin: 5px 5px 5px 5px;"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <span style="white-space: pre-wrap; text-align: left;">案例介绍：{{examples[index-1].content}}</span>
              </q-card-section>
              <br>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
      </q-page>
    </q-page-container>
    <!-- <q-page-container>
      <q-page class="example" style="height: 1080px; background-color: aliceblue;">
        <q-splitter
          v-model="splitter"
          style="height: 100%; margin-left: 10%; margin-right: 10%;"
        >
          <template v-slot:before v-if="examples">
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
              style="background-color: white;
              opacity: 0.8;"
            >
              <q-tab v-if="examples[index-1] != undefined" v-for="index in examples.length" :key="index" :name="'example_' + index" icon="mdi-door" :label="examples[index-1].title" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-if=" examples != null" 
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              style="height: 100%;
              opacity: 0.95;"
            >
              <q-tab-panel v-for="index in examples.length" :key="index" :name="'example_' + index">
                <img v-if="examples[index-1].image_path != null" 
                  style="height:280px; width: 280px; margin: 20px;" 
                  v-for="img_index in examples[index-1].image_path.length" 
                  :src="examples[index-1].image_path[img_index-1]"
                >
                <div style="white-space: pre-line; text-align: left;">
                  <p>
                    {{examples[index-1].content}}
                  </p>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-page>
    </q-page-container> -->
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
      selected_tab: 't_3',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: 'rgb(0, 163, 82)',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      examples: null,
      splitter: 10,

      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242',

      tab: 'example_1',
    }
  },
  mounted() {
    this.getExamples()
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
    getExamples() {
      axios.get("/example/find_all")
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          // this.successNotify('获取案例列表成功')
          this.examples = response.data.data
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
        this.tab = 'example_' + this.$route.query.index
      }
    },
    jumpToIndex(e) {
      if (e == 't_0') {
        this.$router.push({
          path: '/mobile',
          query: {
            selected_tab: 't_0'
          }
        })
      }
      if (e == 't_1') {
        this.$router.push({
          path: '/mobile',
          query: {
            selected_tab: 't_1'
          }
        })
      }
      if (e == 't_5') {
        this.$router.push({
          path: '/mobile',
          query: {
            selected_tab: 't_5'
          }
        })
      }
    },
    jumpToProduct() {
      this.$router.push({path: '/products_mobile'})
    },
    jumpToExample() {
      this.$router.push({path: '/examples_mobile'})
    },
    jumpToNews() {
      this.$router.push({path: '/news_mobile'})
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 750px
    max-width: 750px
    margin-top: 10px
  
  .custom_tab
    width: 130px;
</style>

