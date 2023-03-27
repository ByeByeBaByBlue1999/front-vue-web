<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm" style="background-color: whitesmoke;" :style="'border-bottom: 2px solid '+ theme_color">
      <q-toolbar>
        <!-- <span :style="'font-size: 35px;color:'+theme_color" class="my-font text-h6 q-mr-md">AoGeLai</span> -->
        <span :style="'font-size: 35px;color:'+theme_color" class="my-font text-h6 q-mr-md">AoGeLai</span>
        <q-space ></q-space>
        <div class="q-gutter-y-md" style="max-width: 1000px">
          <q-tabs 
            v-model="selected_tab" 
            inline-label
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
          arrows
          swipeable
          navigation
          infinite
          autoplay
          control-color="white"
          transition-prev="slide-right"
          transition-next="slide-left"
          height="640px"
          id="id_idx"
        >
          <q-carousel-slide class="q-pa-none" :name="1" :img-src="index_image_1">
            <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
              <div class="custom-caption">
                <div class="text-h2 main_line animation_2">奥格莱 <span :style="'color:'+theme_color">AoGeLai</span></div><br><br><br>
                <div class="text-h4 animation_1">奥格莱为您提供最优质的产品与服务</div><br><br><br>
                <div class="animation_2">
                  <q-btn size="md" :style="'background:'+ theme_color +'; color: white'" @click="jumpToIndex('t_1');" label="了解我们"/>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide class="q-pa-none" :name="2" :img-src="index_image_2">
            <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
              <div class="custom-caption">
                <div class="text-h2 main_line animation_2">为客户 <span :style="'color:'+theme_color">精心设计</span></div><br><br><br>
                <div class="text-h4 animation_1">最适合您的解决方案！</div><br><br><br>
                <div class="animation_2">
                  <q-btn size="md" :style="'background:'+ theme_color +'; color: white'" @click="jumpToIndex('t_1');" label="了解我们"/>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide class="q-pa-none" :name="3" :img-src="index_image_3">
            <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
              <div class="custom-caption">
                <div class="text-h2 main_line animation_2">多种 <span :style="'color:'+theme_color">高性能门</span></div><br><br><br>
                <div class="text-h4 animation_1">供您挑选！</div><br><br><br>
                <div class="animation_2">
                  <q-btn size="md" :style="'background:'+ theme_color +'; color: white'" @click="jumpToIndex('t_1');" label="了解我们"/>
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
        <br>
        <br>

        
        <div class="quote" id="id_about_us" >
          <div class="q-pt-xl full-width full-height flex flex-center" style="color: black">
            <div class="col">
              <div class="row">
                <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                  <h2 class="text-center">公司概况
                  </h2>
                </div>
              </div>
              <div class="row">
                <h5 class="text-left" style="margin-left:10%; margin-right:10%">
                  广东奥格莱节能环保科技有限公司专注于工业门贸易、生产、安装及售后服务。<br><br>
                  我们是中国改革开放后最早从事提供工业门类设备和物流服务的企业，积累了丰富的经验。<br><br>
                  公司运营近15年，于2005年开始规模化和网络化发展，在全国多个大中城市建立了专业的营销、安装及售后服务中心和网点。<br><br>
                </h5>
              </div>
            </div>
            <div class="col">
              <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                  <h2 class="text-center">视频介绍
                    <br>
                  </h2>
                </div>
              <div class="col q-pa-lg">
                <!-- <q-video
                  loading="lazy"
                  src="/statics/videos/505.mp4"
                  style="width: 700px; height: 360px"
                /> -->
                <video
                  controls
                  src="/statics/videos/505.mp4"
                  style="width: 100%;"
                >
                </video>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>

        <div class="quote" id="id_portfolio">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <h2 class="text-center">产品介绍
                <br>
              </h2>
            </div>
          </div>
          <div class="row text-center" style="padding-bottom: 99px">
            <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
              <div style="line-height:0" v-if="products">
                <span v-for="index in 6" :key="index">
                  <q-flashcard :no-hover="hover" :style="style">
                    <q-flashcard-section transition="nudge-in" :active="active">
                      <img :src="products[index-1].image_path[0]" width=340 height=340>
                    </q-flashcard-section>
                    <q-flashcard-section transition="fade-in" class="fit" :active="active">
                      <div class="fit" :style="background_style"></div>
                      <q-flashcard-section transition="drop-down" class="text-center my-header" :active="active">
                        {{products[index-1].name}}
                      </q-flashcard-section>
                      <q-flashcard-section transition="slide-up-in" class="my-text" :active="active">
                        {{products[index-1].introduction}}
                      </q-flashcard-section>
                      <q-flashcard-section transition="fade-in" class="fit flex justify-center items-end q-pb-lg"
                                           :active="active">
                        <q-btn class="q-mr-md" :style="'color:'+theme_color" style="background-color:white" label='查看详情' @click="jumpToProduct(index)" />
                      </q-flashcard-section>
                    </q-flashcard-section> -->
                  </q-flashcard>
                  <br v-if="index==3"/>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>

        <div class="quote" id="id_services">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <h2 class="text-center text-black">工程案例
                <br>
              </h2>
            </div>
          </div>
          <div class="row text-center flex flex-center" style="padding-bottom: 99px">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12 q-gutter-md flex flex-center" v-if="examples">
              <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12 row">
                <q-card @mouseover="hoverOver(1)" @mouseout="hoverOutTimeout(1)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[0].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_1" :style="'color:' + about_heading_color_1" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[0].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[0].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(1)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(2)" @mouseout="hoverOutTimeout(2)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[1].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_2" :style="'color:' + about_heading_color_2" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[1].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[1].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(2)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(3)" @mouseout="hoverOutTimeout(3)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[2].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_3" :style="'color:' + about_heading_color_3" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[2].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[2].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(3)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12 row">
                <q-card @mouseover="hoverOver(4)" @mouseout="hoverOutTimeout(4)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[3].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_4" :style="'color:' + about_heading_color_4" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[3].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[3].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(4)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(5)" @mouseout="hoverOutTimeout(5)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[4].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_5" :style="'color:' + about_heading_color_5" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[4].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[4].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(5)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(6)" @mouseout="hoverOutTimeout(6)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="examples[5].image_path[0]" width=340 height=340
                  />

                  <q-card-section style="height: 260px;">
                    <div :class="about_heading_6" :style="'color:' + about_heading_color_6" class="text-h6 q-mt-sm q-mb-xs">
                      {{examples[5].title}}
                    </div>
                    <div
                      style="
                        line-height: 20px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;"
                      class="text-caption text-grey-9">
                      {{examples[5].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToExample(6)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>

        <div class="quote" id="id_news">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <h2 class="text-center text-black">新闻资讯
              </h2>
              <br>
            </div>
          </div>
          <div class="row text-center flex flex-center quote">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12 q-gutter-md flex flex-center" v-if="news">
              <div class="col-md-4 col-lg-4 col-sx-12 col-sm-12 row">
                <q-card @mouseover="hoverOver(1)" @mouseout="hoverOutTimeout(1)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="news[0].image_path[0]" width=340 height=340
                  />
                  <q-card-section class="text-left" style="height: 260px;">
                    <div :class="about_heading_1" :style="'color: ' + about_heading_color_1" class="about_heading_1 text-h6 q-mt-sm q-mb-xs">
                      {{news[0].title}}
                    </div>
                    <b>{{news[0].time.split(' ')[0]}}</b>
                    <div 
                        style="
                          line-height: 20px;
                          overflow : hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 5;
                          -webkit-box-orient: vertical;"
                        class="text-caption text-grey-9 q-mt-sm">
                      {{news[0].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToNews(1)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(2)" @mouseout="hoverOutTimeout(2)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="news[1].image_path[0]" width=340 height=340
                  />
                  <q-card-section class="text-left" style="height: 260px;">
                    <div :class="about_heading_2" :style="'color: ' + about_heading_color_2" class="about_heading_1 text-h6 q-mt-sm q-mb-xs">
                      {{news[1].title}}
                    </div>
                    <b>{{news[1].time.split(' ')[0]}}</b>
                    <div 
                        style="
                          line-height: 20px;
                          overflow : hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 5;
                          -webkit-box-orient: vertical;"
                        class="text-caption text-grey-9 q-mt-sm">
                      {{news[1].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToNews(2)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card @mouseover="hoverOver(3)" @mouseout="hoverOutTimeout(3)" style="border: none;" class="my-card text-center box-shadow" flat bordered>
                  <img
                    :src="news[2].image_path[0]" width=340 height=340
                  />
                  <q-card-section class="text-left" style="height: 260px;">
                    <div :class="about_heading_3" :style="'color: ' + about_heading_color_3" class="about_heading_1 text-h6 q-mt-sm q-mb-xs">
                      {{news[2].title}}
                    </div>
                    <b>{{news[2].time.split(' ')[0]}}</b>
                    <div 
                        style="
                          line-height: 20px;
                          overflow : hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 5;
                          -webkit-box-orient: vertical;"
                        class="text-caption text-grey-9 q-mt-sm">
                      {{news[2].content}}
                    </div>
                    <div>
                      <br>
                      <q-btn @click="jumpToNews(3)" size="sm" :style="'background:'+ theme_color +'; color: white'" label="详情"/>
                    </div>
                  </q-card-section>
                </q-card>
                <br/>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>

        <div class="contact_us" id="id_contact_us">
          <div style="background-color: #000000ad !important;">
            <div class="row" id="id_news">
              <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                <h4 class="text-center text-white">联系我们
                  <br>
                </h4>
                <h5 class="text-center text-white">
                  <span>我们会第一时间回复您的留言</span>
                  <br>
                </h5>
              </div>
            </div>
            <div class="row text-center flex flex-center q-pb-lg">
              <div class="col-md-6 col-lg-6 col-sx-12 col-sm-12 q-gutter-lg q-px-xl q-pb-none q-ma-none">
                <q-input bg-color="white" outlined label="您的姓名*" v-model="contact_name">
                  <template v-slot:append>
                    <q-icon name="event" :style="'color:' + theme_color" />
                  </template>
                </q-input>
                <q-input bg-color="white" outlined label="您的邮箱" v-model="contact_email">
                  <template v-slot:append>
                    <q-icon name="event" :style="'color:' + theme_color" />
                  </template>
                </q-input>
                <q-input bg-color="white" outlined label="您的电话*" v-model="contact_phone">
                  <template v-slot:append>
                    <q-icon name="event" :style="'color:' + theme_color" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-lg-6 col-sx-12 col-sm-12 q-gutter-lg q-px-xl q-pb-none q-ma-none">
                <q-input class="" type="textarea" bg-color="white" outlined label="您的留言 *" v-model="contact_message">
                  <template v-slot:append>
                    <q-icon name="event" :style="'color:' + theme_color" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row flex flex-center text-center q-pb-xl q-mt-md">
              <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12">
                <q-btn size="lg" :style="'background:'+ theme_color +'; color: white'" label="发送留言" @click="send_message"/>
              </div>
            </div>
          </div>
        </div>
        <q-toolbar class="flex flex-center text-white" style="background-color: #f7f7f7;" :style="'border-top: 2px solid '+ theme_color">
          <div class="q-pa-sm q-gutter-sm" style="color:black;">
            <br/>
            版权所有：广东奥格莱节能环保科技有限公司 
            <br/>
            地址: 广州市荔湾区东漖北路鸿图东街13号二层 
            <br/>
            邮编: 510145 <a style="text-decoration:none;" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022113150号-1</a>
            <br/>
            电话: 17620840519 <a style="text-decoration:none;" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022113150号-1</a>
      	  </div>
        </q-toolbar>
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
      selected_tab: 't_0',
      team_slide: 1,
      bg_color: 'rgb(0, 163, 82)',
      hover: false,
      active: false,
      theme_color: 'rgb(0, 163, 82)',
      background_style: 'background-color:rgba(0, 163, 82, 0.7);',
      products: null,
      news: null,
      examples: null,
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      contact_message: '',

      index_image_1: '',
      index_image_2: '',
      index_image_3: '',
      index_background_image: '',

      about_heading_1: [],
      about_heading_2: [],
      about_heading_3: [],
      about_heading_4: [],
      about_heading_5: [],
      about_heading_6: [],
      about_heading_color_1: '#424242',
      about_heading_color_2: '#424242',
      about_heading_color_3: '#424242',
      about_heading_color_4: '#424242',
      about_heading_color_5: '#424242',
      about_heading_color_6: '#424242',
    }
  },
  beforeMount() {
    this.getProducts()
    this.getNews()
    this.getExamples()
    this.getIndexImages()
  },
  mounted() {
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
    listItemStyle(i) {
      let style = {}
      style.color = 'about_heading_color_' + i
      style.fontSize = 15
      return style
    },
    getParams() {
      let that = this
      if (this.$route.query.selected_tab) {
        if (this.$route.query.selected_tab == 't_5') {
          setTimeout(() => {
            this.selected_tab = 't_5'
            that.scrollToElement('id_contact_us')
          }, 500)
          // that.scrollToElement('id_contact_us') 
        }
        if (this.$route.query.selected_tab == 't_1') {
          setTimeout(() => {
            this.selected_tab = 't_1'
            that.scrollToElement('id_about_us')
          }, 100)
        }
      }
    },
    getProducts() {
      axios.get("/products/find_all")
      .then( response => {
        this.products = response.data.data
      })
    },
    getNews() {
      axios.get("/news/find_all")
      .then( response => {
        this.news = response.data.data
      })
    },
    getExamples() {
      axios.get("/example/find_all")
      .then( response => {
        this.examples = response.data.data
      })
    },
    getIndexImages() {
      axios.get("/image/find_all")
      .then( response => {
        this.index_image_1 = response.data.data[0]['index_image_1']
        this.index_image_2 = response.data.data[0]['index_image_2']
        this.index_image_3 = response.data.data[0]['index_image_3']
        this.index_background_image = response.data.data[0]['index_background_image']
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
    send_message() {
      let data = {
        "name": this.contact_name,
        "email": this.contact_email,
        "phone": this.contact_phone,
        "message": this.contact_message,
      }
      axios.post("/message/add", data)
      .then( response => {
        console.log(response)
        if (response.data.code == 200) {
          Notify.create({
            position: 'top-right',
            type: 'positive',
            message: '发送留言成功！',
            actions: { label: 'Reply', handler: () => { /* console.log('wooow') */ } }
          })
        }
      })
    },
    jumpToProduct(e) {
      if (e) {
        this.$router.push({
          path: '/products',
          query: {
            index: e
          }
        }).catch(err => {err})
      } else {
        this.$router.push({path: '/products'})
      }
    },
    jumpToExample(e) {
      if (e) {
        this.$router.push({
          path: '/examples',
          query: {
            index: e
          }
        }).catch(err => {err})
      } else {
        this.$router.push({path: '/examples'})
      }
    },
    jumpToNews(e) {
      if (e) {
        this.$router.push({
          path: '/news',
          query: {
            index: e
          }
        }).catch(err => {err})
      } else {
        this.$router.push({path: '/news'})
      }
    },
    jumpToIndex(e) {
      // console.log(this.selected_tab)
      // console.log(e)
      this.selected_tab = e
      if (e == 't_0') {
        this.scrollToElement('id_idx')
      }
      if (e == 't_5') {
        this.scrollToElement('id_contact_us')
      }
      if (e == 't_1') {
        this.scrollToElement('id_about_us')
      }
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
    width: 350px
    max-width: 350px
    margin-top: 10px
    margin: 20px

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
    background: url(/statics/images/pure.jpeg);
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
</style>

