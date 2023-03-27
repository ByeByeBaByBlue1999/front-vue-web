<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm" style="background-color: whitesmoke;" :style="'border-bottom: 2px solid '+ theme_color">
      <q-toolbar>
        <span :style="'font-size: 35px;color:'+theme_color" class="my-font text-h6 q-mr-md">AoGeLai</span>
        <q-space></q-space>
        <div class="q-gutter-y-md" style="max-width: 1000px">
          <q-tabs 
            v-model="selected_tab"
            inline-label
            mobile-arrows
          >
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
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page style="background: url(/statics/images/pure.jpeg);">
        <div class="row" style="width: 100%;">
          <div class="col" style="max-width: 25%;">
            <q-select
              outlined
              style="margin: 10px 10px 10px 10px; font-size: larger; background-color: white;"
              v-model="select_model"
              :options="product_category"
              label="产品类别"
            />
            <q-card
              style="border-radius: 5px; border: 1px solid whitesmoke; margin: 10px 10px 10px 10px; height: 90%;"
              v-if="product_category2item[select_model] != undefined"
            >
              <q-card-section>
                <h6 class="text-center">
                  {{select_model}}介绍：
                </h6>
                {{product_category2item[select_model]['introduction']}}
              </q-card-section>
            </q-card>
          </div>
          <div class="col" style="max-width: 75%; max-height: max-content; margin: 10px 10px 10px 10px;">
            <q-carousel
              animated
              v-model="slide"
              v-if="products != null"
              arrows
              swipeable
              navigation
              infinite
              control-color="black"
              transition-prev="slide-right"
              transition-next="slide-left"
              height="100%"
              style="border-radius: 5px;"
            >
              <q-carousel-slide class="q-pa-md" v-if="display_doors.length > 0" v-for="index in display_doors.length" :key="index" :name=index
                style="
                  display: flex; 
                  justify-content: center;
                  height: 100%;
                "  
              >
                <q-card class="my-card" flat bordered  style="height: 100%;">
                  <q-card-section>
                    <h4 class="text-center">
                      {{select_model}}：{{display_doors[index-1].name}}
                    </h4>
                  </q-card-section>
                  <q-card-section>
                    <q-img v-for="_index in display_doors[index-1].image_path.length" :key="_index"
                      class="col-5"
                      :src="display_doors[index-1].image_path[_index-1]"
                      style="width: 240px; height: 240px; margin: 5px 5px 5px 5px;"
                    />
                  </q-card-section>
                  <q-card-section>
                    <span style="white-space: pre-wrap; text-align: left;">产品介绍：{{display_doors[index-1].introduction}}</span>
                  </q-card-section>
                  <br>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </q-page>
      
      <!-- <q-page class="product" style="height: 1080px; background-color: aliceblue;">
        <q-splitter
          v-model="splitter"
          style="height: 100%; margin-left: 10%; margin-right: 10%;"
        >
          <template v-slot:before v-if="products">
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
              style="background-color: white; opacity: 0.8;"
            >
              <q-tab v-if="products[index-1] != undefined" v-for="index in products.length" :key="index" :name="'product_' + index" icon="mdi-door" :label="products[index-1].name" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-if=" products != null" 
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              style="height: 100%; opacity: 0.95;"
            >
              <q-tab-panel v-for="index in products.length" :key="index" :name="'product_' + index">
                <q-splitter
                  v-model="splitter_inside"
                  style="height: 100%; margin-left: 0%; margin-right: 0%;"
                >
                  <template v-slot:before v-if="sub_products">
                    <q-tabs
                      v-model="sub_tab"
                      vertical
                      class="text-teal"
                      style="background-color: white; opacity: 0.8;"
                    >
                    <q-tab 
                      v-if="sub_products['product_' + index][_index-1] != undefined" 
                      v-for="_index in sub_products['product_' + index].length" 
                      :key="_index" 
                      :name="'sub_product_' + _index"
                      icon="mdi-door" 
                      :label="sub_products['product_' + index][_index-1].name"
                    />
                    </q-tabs>
                  </template>

                  <template v-slot:after>
                    <q-tab-panels
                      v-if="sub_products != null" 
                      v-model="sub_tab"
                      animated
                      swipeable
                      vertical
                      transition-prev="jump-up"
                      transition-next="jump-up"
                      style="height: 100%; opacity: 0.95;"
                    >
                      <q-tab-panel 
                        v-for="_index in sub_products['product_' + index].length" 
                        :key="_index"
                        :name="'sub_product_' + _index"
                      >
                        <img 
                          v-if="sub_products['product_' + index][_index-1].image_path != undefined" 
                          style="height:280px; width: 280px; margin: 20px;" 
                          v-for="img_index in sub_products['product_' + index][_index-1].image_path.length" 
                          :src="sub_products['product_' + index][_index-1].image_path[img_index-1]"
                        >
                        <div style="white-space: pre-line; text-align: left;">
                          <p>
                            {{sub_products['product_' + index][_index-1].introduction}}
                          </p>
                        </div>
                        
                      </q-tab-panel>
                    </q-tab-panels>
                  </template>
                </q-splitter>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-page> -->
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
      selected_tab: 't_2',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: 'rgb(0, 163, 82)',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      products: null,
      sub_products: {
        '洁净门系列': [],
        '装卸货设备': [],
        'PVC门系列': [],
        '硬质门系列': [],
        '软质门系列': [],
        '冷库门系列': [],
      },
      splitter: 10,
      splitter_inside: 15,

      select_model: '请选择产品类别',
      product_category: [],
      product_category2item: {},
      display_doors: [],

      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242',

      tab: 'product_4',
      sub_tab: 'sub_product_1',
    }
  },
  watch: {
    select_model(newValue, oldValue) {
      this.display_doors = this.sub_products[newValue]
      console.log(this.display_doors)
    }
  },
  mounted() {
    this.getProducts()
    this.getSubProducts()
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
    getProducts() {
      axios.get("/products/find_all")
      .then( response => {
        this.products = response.data.data
        let item
        for (item in response.data.data) {
          this.product_category.push(response.data.data[item]['name'])
          this.product_category2item[response.data.data[item]['name']] = response.data.data[item]
        }
      })
    },
    getSubProducts() {
      axios.get("/sub_products/find_all")
      .then( response => {
        let _data = response.data.data
        _data.forEach(element => {
          // console.log(element.type)
          if (element.type == '洁净门系列') {
            this.sub_products['洁净门系列'].push(element)
          }
          if (element.type == '装卸货设备') {
            this.sub_products['装卸货设备'].push(element)
          }
          if (element.type == 'PVC门系列') {
            this.sub_products['PVC门系列'].push(element)
          }
          if (element.type == '硬质门系列') {
            this.sub_products['硬质门系列'].push(element)
          }
          if (element.type == '软质门系列') {
            this.sub_products['软质门系列'].push(element)
          }
          if (element.type == '冷库门系列') {
            this.sub_products['冷库门系列'].push(element)
          }
        });
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
        let e
        e = this.$route.query.index
        console.log(this.sub_products)
        if (e == 1) {
          this.select_model = '洁净门系列'
          // this.display_doors = this.sub_products['洁净门系列']
        }
        if (e == 2) {
          this.select_model = '装卸货设备'
          // this.display_doors = this.sub_products['装卸货设备']
        }
        if (e == 3) {
          this.select_model = 'PVC门系列'
          // this.display_doors = this.sub_products['PVC门系列']
        }
        if (e == 4) {
          this.select_model = '硬质门系列'
          // this.display_doors = this.sub_products['硬质门系列']
        }
        if (e == 5) {
          this.select_model = '软质门系列'
          // this.display_doors = this.sub_products['软质门系列']
        }
        if (e == 6) {
          this.select_model = '冷库门系列'
          // this.display_doors = this.sub_products['冷库门系列']
        }
      } else {
        this.select_model = 'PVC门系列'
      }

    },
    jumpToIndex(e) {
      if (e == 't_0') {
        this.$router.push({
          path: '/desk'
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
    width: 80%
    max-width: 80%
    height: 100%

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

  .product
    background: url(/statics/images/pure.jpeg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
</style>

